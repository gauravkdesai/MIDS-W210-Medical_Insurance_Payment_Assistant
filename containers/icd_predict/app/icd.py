#!/usr/bin/env python3

import numpy as np
import pandas as pd
import os
import time
from simpletransformers.classification import MultiLabelClassificationModel
import gc

class ICD:

    def __init__(self):

        print(f'ICD Prediction : Initializing')

        start = time.time()

        self.model = MultiLabelClassificationModel('bert', "./model/checkpoint-108117-epoch-3/", num_labels=501, use_cuda= False, args={'train_batch_size':2, 'gradient_accumulation_steps':16, 'learning_rate': 3e-5, 'num_train_epochs': 3, 'max_seq_length': 512, 'reprocess_input_data': True})
        self.text = ''
        self.output = dict()
        self.icd_dictionary = pd.read_csv('./icd_dictionary.csv')

        end = time.time()
        print( f'ICD Prediction : Initializing : Finished in {end-start:7.3f} Seconds\n')

  # Interpretation ------------------------------------------------------------------------------------

    def predict(self, text, top_k=1):

        start = time.time()
        
        print(f'ICD Prediction : Predicting ICD Codes')

        predictions, raw_outputs = self.model.predict([text])

        self.text = text
        keys = raw_outputs[0].argsort()[-top_k:][::-1]

        self.output = {str(key): 
                            {'ICD_CODE':self.icd_dictionary['ICD_CODE'][key], 
                            'PROB':str(raw_outputs[0][key]), 
                            'SHORT_TITLE':self.icd_dictionary['SHORT_TITLE'][key],
                            'LONG_TITLE':self.icd_dictionary['LONG_TITLE'][key] }
                        for key in keys}

        end = time.time()

        print(f'ICD Prediction : Predicting ICD Codes : Finished in {end-start:7.3f} Seconds')

        gc.collect()

        last = time.time()

        return self.output

if  __name__ == '__main__' :

    ICD()