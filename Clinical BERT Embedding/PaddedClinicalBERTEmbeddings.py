from ClinicalBERTEmbeddings import ClinicalBERTEmbeddings
import numpy as np

# of sentence to be kept
max_sent = 16
#this variable has a max length of 512
max_token_per_sentence = 128
# of tokens to be kept 
max_tokens_in_text = max_sent*max_token_per_sentence

def zero_pad(x):
	embeddings_padded = []
	pad_len = max_tokens_in_text - len(x)
	if pad_len:
		embeddings_padded.append(np.append(x, np.zeros(pad_len*768).reshape(pad_len, 768), axis=0))
	else:
		embeddings_padded.append(x)
	return np.array(embeddings_padded)

def PaddedClinicalBERTEmbeddings(x):
	# Get 3-D NumPy Embeddings
	y = ClinicalBERTEmbeddings(x)

	#Truncate sentences and convert to 2-D from 3D
	y = np.concatenate(y[:max_sent])

	# Zero pad short texts
	y = zero_pad(y)
	
	return y