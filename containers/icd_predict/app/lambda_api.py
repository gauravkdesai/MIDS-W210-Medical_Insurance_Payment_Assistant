import json
import pandas as pd
from simpletransformers.classification import MultiLabelClassificationModel
from time import time

def lambda_handler(event, context):
    # parse input parameters

    text     = event['queryStringParameters']['text']
    top_k    = event['queryStringParameters']['top_k']

    print('top_k='+top_k)
    print('text='+text)

    # Load required model and csvs
    model = MultiLabelClassificationModel('bert', "s3://brent-w210-models/model/unzipped/checkpoint-108117-epoch-3/", num_labels=501, use_cuda= False, args={'train_batch_size':2, 'gradient_accumulation_steps':16, 'learning_rate': 3e-5, 'num_train_epochs': 3, 'max_seq_length': 512, 'reprocess_input_data': True})
    output = dict()
    icd_dictionary = pd.read_csv('./icd_dictionary.csv')

    # Validate inputs
    if top_k is None:
        top_k = 1
    else:
        top_k = int(top_k)

    # call predict on model
    start = time()
        
    print(f'ICD Prediction : Predicting ICD Codes')

    predictions, raw_outputs = model.predict([text])
    keys = raw_outputs[0].argsort()[-top_k:][::-1]

    output = {str(key): 
                        {'ICD_CODE':icd_dictionary['ICD_CODE'][key], 
                        'PROB':str(raw_outputs[0][key]), 
                        'SHORT_TITLE':icd_dictionary['SHORT_TITLE'][key],
                        'LONG_TITLE':icd_dictionary['LONG_TITLE'][key] }
                    for key in keys}

    end = time()

    print(f'ICD Prediction : Predicting ICD Codes : Finished in {end-start:7.3f} Seconds')


    last = time()
    print("Time taken for request="+ last-start)

    # return output
    return json.dumps(output)
