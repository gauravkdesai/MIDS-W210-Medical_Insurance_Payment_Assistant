from re_sub import preprocess_re_sub
from custom_sentence_tokenizer import custom_sentence_tokenizer
import torch
from transformers import AutoTokenizer, AutoModel
import re
import string
import numpy as np
import logging

# Import BERT Tokenizer
tokenizer = AutoTokenizer.from_pretrained("emilyalsentzer/Bio_Discharge_Summary_BERT")
model = AutoModel.from_pretrained("emilyalsentzer/Bio_Discharge_Summary_BERT")

# Set parameters for BERT Embedding
max_word = 128
max_sent = 32

def add_cls_sep(x):
    concat_x = '[CLS] '
    for i in x:
        concat_x = concat_x + i.lower() + ' [SEP] '
    return concat_x
	
def create_matrix(x, max_word, max_sent):
    
    x = x[:(max_word-2)*max_sent]
    sent_LIST = [101]
    matrix_LIST = []
    counter = 1
    for i in x:
        if len(sent_LIST)==max_word-1:
            sent_LIST.append(102)
            matrix_LIST.append(sent_LIST)
            sent_LIST = [101]
            sent_LIST.append(i)
        else:
            sent_LIST.append(i)
        counter = counter + 1
    l = len(sent_LIST)
    if l>1:
        sent_LIST.append(102)
        sent_LIST.extend(np.zeros(max_word-l-1).astype(int))
        matrix_LIST.append(sent_LIST)
    return matrix_LIST
	
def attention_mask(x):
    max_word = 128
    sent_len = len(x)
    attention_mask = []
    for i in range(0,sent_len-1):
        attention_mask.append(np.ones(max_word).astype(int).tolist())
    last_sent = []
    for i in x[-1]:
        if i == 0:
            last_sent.append(0)
        else:
            last_sent.append(1)
    attention_mask.append(last_sent)
    return attention_mask

def ClinicalBERTEmbeddings(x):
	# Convert Rx abbr terms to normal english
	y = preprocess_re_sub(x)

	# Build sentence boundaries
	y = custom_sentence_tokenizer(y)
	
	# Adding boundary identifiers (Using special BERT tokens - CLS SEP- for the time being - will be replacing in one of the upcoming steps
	y = add_cls_sep(y)
	
	# Some more reg ex substitutions (We were waiting for sentence boundaries to be created before getting to these substitutions
	y = re.sub('\n|\r',' ',
		re.sub('admission date:|discharge date:|date of birth:|addendum:|--|__|==','', y))

	# BERT Tokenizer
	y = tokenizer.tokenize(y)

	# BERT Token to ID
	y = tokenizer.convert_tokens_to_ids(y)

	# Replacing special BERT tokens with 119 which is '.' in BERT 	
	def replace_token(x):
		x_list = []
		for i in x:
			if i == 102 and prev!=119:
				x_list.append(119)
			else:
				x_list.append(i)
			prev = i
		return x_list
			
	y = replace_token(y[1:])

	#Set special BERT tokens and also restrict a sentence to 512 tokens (or Max word length) whichever is minimum; Also zero pad
	tokens = create_matrix(y, max_word, max_sent)

	# Set attention mask which is an option input for BERT embeddings but improves the "768" representation
	atten_mask = attention_mask(tokens)
	
	# Convert tokens and attention mask array to tensor
	tokens = torch.tensor(tokens)
	atten_mask = torch.tensor(atten_mask)
	
	# Let's translate BERT token index matrix to "768" vector representation
	return np.array(model(tokens,attention_mask=atten_mask)[0].data)