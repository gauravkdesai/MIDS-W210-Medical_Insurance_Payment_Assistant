from re_sub import preprocess_re_sub
from custom_sentence_tokenizer import custom_sentence_tokenizer
import torch
from transformers import AutoTokenizer, AutoModel
import re
import string
import numpy as np
import logging
from keras.preprocessing.sequence import pad_sequences

# Import BERT Tokenizer
tokenizer = AutoTokenizer.from_pretrained("emilyalsentzer/Bio_Discharge_Summary_BERT")
model = AutoModel.from_pretrained("emilyalsentzer/Bio_Discharge_Summary_BERT")

# Set parameters for BERT Embedding
max_token = 256
max_sent = 20
combined_sent_max_len = 150

def combine_sent(x):
    combined_sent = ''
    combined_sent_list = []
    for i in range(len(x)):
        sent = x[i]
        if sent!='.':
            sent = re.sub('^\s+|\n|\r',' ',
            re.sub('\s\s|\t|\.|\,||admission date:|discharge date:|date of birth:|addendum:|--|__|==','',
                   sent.lower())).strip()
            sent_len = len(sent.split(' '))
            combined_sent_len = len(combined_sent.split(' '))
            
            if i == 0:
                combined_sent = sent
                if len(x) == 1:
                    combined_sent_list.append(combined_sent)
                
            else:
                # when len of sentence + combined sent < 92, combine the existin combined list with current sentence
                if sent_len + combined_sent_len <= combined_sent_max_len:
                    combined_sent = combined_sent + ' . ' + sent
                    if i == len(x) - 1:
                        combined_sent_list.append(combined_sent) 
                else:
                # when len is longer then append current combined sent into final list and reinitialize combined sent with current sent 
                    combined_sent_list.append(combined_sent)
                    combined_sent = sent
                
    return combined_sent_list

def truncate_sent(x):
    maxlen = max_token-2
    max_sent = max_sent
    sent_list = []
    for embeddings in x[-max_sent:]:
        tmp = np.zeros(maxlen).astype(int)
        sent_list.append(np.append(np.append(101, np.append(tmp,embeddings)[-maxlen:]), 102))
    return sent_list

	
def attention_mask(x):
    max_word = max_token
    sent_len = len(x)
    attention_mask = []
    for x_ITEM in x:
        ones_list = np.ones(max_word).astype(int)
        for j, token in enumerate(x_ITEM):
            if token==0:
                ones_list[j] = 0 
        attention_mask.append(ones_list)

    return attention_mask
	
def create_token(x):
    tokens = []
    for i in x:
        tokens.append(tokenizer.convert_tokens_to_ids(tokenizer.tokenize(i)))
    return tokens

#here
def ClinicalBERTEmbeddings(x):
	# Convert Rx abbr terms to normal english
	y = preprocess_re_sub(x)

	# Build sentence boundaries
	y = custom_sentence_tokenizer(y)

	# Adding boundary identifiers (Using special BERT tokens - CLS SEP- for the time being - will be replacing in one of the upcoming steps
	y = combine_sent(y)

	# BERT Tokenizer
	y = create_token(y)

	# Truncate each sentence group to 126 tokens
	y = truncate_sent(y)


	# Set attention mask which is an option input for BERT embeddings but improves the "768" representation
	atten_mask = attention_mask(y)

	# Convert tokens and attention mask array to tensor
	tokens = torch.tensor(y).to(torch.int64)
	#tokens = np.array(y).type(torch.LongTensor)
	atten_mask = torch.tensor(atten_mask).to(torch.int64)
	#atten_mask = np.array(atten_mask).type(torch.LongTensor)
	
	# Let's translate BERT token index matrix to "768" vector representation
	model.eval()
	return np.array(model(tokens,attention_mask=atten_mask)[0].data)