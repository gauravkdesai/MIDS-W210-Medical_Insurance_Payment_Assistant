#!/usr/bin/env python3

import click as     cli
from  icd import ICD
from    time import time

from io  import BytesIO

from flask import Flask, Response, jsonify, request

PAD='\x1B[K'
SKY='\x1B[48;5;39m'
GRN='\x1B[48;5;42m'
PUR='\x1B[48;5;161m'
RED='\x1B[48;5;196m'

TXT='\x1B[38;5;190m'
RST='\x1B[0m'
EOL='\n'

def icd_predict(app):

    if not icd_predict.icd:
        icd_predict.icd = ICD()

    return icd_predict.icd

icd_predict.icd = None

app = Flask(__name__)

@app.route('/api/icd', methods = ['POST'])
def api_icd_predict():

    print(f'{EOL}{SKY}{TXT}  HANDLER > api_icd_predict [{time()}] {PAD}{RST}')
    request.get_data()

    text     = request.args.get('text')
    top_k    = request.args.get('top_k')

    try:
        
        response = {}

        print(f'{PUR}{TXT} Text > {text} {PAD}')
        print(f'{PUR}{TXT} Top_K > {top_k} {PAD}')

        response = icd_predict(app).predict(text, top_k)

        return response

    except:
        print(f'{RED}{TXT}   STATUS > Invalid Request {PAD}{RST}{EOL}')

        return { 'error' : 'Invalid Request' }

@app.route('/')
def index():

    print(f'{EOL}{SKY}{TXT} index {PAD}{RST}{EOL}')

    return f'ICD Flask Server Up and Running! : {time()}'

@app.route('/test')
def sample_text():

    start          = time()
    pred = icd_predict(app).predict(text='Test.', top_k=10)
    end            = time()

    print(f'ICD Predict : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'ICD Predict : Prediction')

    print(f'            : {pred}')

    return f'{pred}'

@cli.command()
def main():

    print(f'\ICD Predict : RESTful Application Programming Interface\n')

    icd_predict(app)

    app.run(host = '0.0.0.0', debug = False)

if  __name__ == '__main__':

    main()