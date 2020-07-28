#!/usr/bin/env python3

import numpy as np
import pandas as pd
import os
import time
import gc
import nltk
from keras.models import model_from_json
import glob
import json
from ClinicalBERTEmbeddings import ClinicalBERTEmbeddings
import keras
from heapq import nlargest
from collections import defaultdict

class ICD:

    def __init__(self):
        keras.backend.set_learning_phase(0)
        nltk.download('punkt')

        print(f'ICD Prediction : Initializing')

        start = time.time()
        
        PATH = './'

        # Adverse Model
        json_file = open(PATH + 'models/models/adverse/adverse_num.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.adverse_model = model_from_json(loaded_model_json)
        self.adverse_model.load_weights(PATH + "models/models/adverse/adverse_model.h5")
        self.adverse_labels = pd.read_csv(PATH + 'models/models/adverse/adverse_effect_labels.csv').columns[1:]

        # Chapter Model
        json_file = open(PATH + 'models/models/chapter/chapter_num.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        self.chapter_model = model_from_json(loaded_model_json)
        self.chapter_model.load_weights(PATH + "models/models/chapter/chapter_model.h5")
        self.chapter_labels = pd.read_csv(PATH + 'models/models/chapter/chapter_label.csv').columns[1:]
        
        # Disease Models
        self.model_dict = {}
        self.label_dict = {}

        for file in glob.glob(PATH + "models/models/disease/*.json"):  
            baseName = os.path.basename(file)[6:-5]   
            json_file = open(file, 'r')
            loaded_model_json = json_file.read()
            json_file.close()
            self.model_dict[baseName] = model_from_json(loaded_model_json)
            self.model_dict[baseName].load_weights(file[:-5]+".h5")
            labels = pd.read_csv(PATH + 'models/models/disease/chapter_labels/'+baseName).columns[1:]
            self.label_dict[baseName] = labels

        self.text = ''
        self.output = dict()

        end = time.time()
        print( f'ICD Prediction : Initializing : Finished in {end-start:7.3f} Seconds\n')

  # Interpretation ------------------------------------------------------------------------------------

    def predict(self, text):

        start = time.time()
        
        print(f'ICD Prediction : Predicting ICD Codes')

        # Get Embeddings
        data = ClinicalBERTEmbeddings(text)

        print(f'Data Embeddings time : {time.time()-start}')

        # Prepare Embeddings for Model
        embeddings_padded = []
        for j in data:
            pad_len = 5120 - len(j)
            if pad_len:
                embeddings_padded.append(np.append(j, np.zeros(pad_len*768, dtype=np.float16).reshape(pad_len, 768), axis=0))
            else:
                embeddings_padded.append(j)
        
        embeddings_padded = np.float16(embeddings_padded)
        embeddings_padded = np.array(embeddings_padded, dtype=np.float16)

        print(f'Data Embeddings padding : {time.time()-start}')

        # Chapter Predictions
        self.chapter_pred = self.chapter_model.predict(embeddings_padded)[0]
        self.chapter_dict = {key: value for (key, value) in zip(self.chapter_labels, self.chapter_pred)}
        print(f'Chapter Pred: {time.time()-start}')

        # Adverse Predictions
        self.adverse_pred = self.adverse_model.predict(embeddings_padded)[0]
        self.adverse_dict = {key: value for (key, value) in zip(self.adverse_labels, self.adverse_pred)}
        print(f'Adverse Pred: {time.time()-start}')

        # Disease Predictions
        self.disease_dict = defaultdict(dict)

        # Only predict top 10 Chapters:
        selected_models = nlargest(16, self.chapter_dict, key = self.chapter_dict.get)
        print("selected models:", selected_models)
        self.disease_dict['680_709'] = {}

        for model in selected_models:
            if model != "680_709":
                model_pred = self.model_dict[model+".csv"].predict(embeddings_padded)[0]
                self.disease_dict[model] = {key: value for (key,value) in zip(self.label_dict[model+".csv"], model_pred)}

        self.text = text
        print(f'All Other Models Pred: {time.time()-start}')
        
        self.output = {"name": "Root", "value": 1, "children": 
                        [{"name": "Adverse", "value": 1, "children": 
                            [{"name": adv_key, "value": adv_value} for (adv_key, adv_value) in self.adverse_dict.items()]},
                        {"name": "Chapter", "value": 1, "children": 
                            [{"name": ch_key, "value": ch_value, "children": 
                                [{"name": dis_key, "value": dis_value} for (dis_key, dis_value) in self.disease_dict[ch_key].items()]} for (ch_key, ch_value) in self.chapter_dict.items()]}]
                      }

        end = time.time()

        print(f'ICD Prediction : Predicting ICD Codes : Finished in {end-start:7.3f} Seconds')

        gc.collect()

        last = time.time()

        return self.output

if  __name__ == '__main__' :

    ICD()