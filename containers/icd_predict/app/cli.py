#!/usr/bin/env python3

import click as     cli
from    icd import ICD
from    time import time
import json

@cli.command()
@cli.option('--text',  default = "")
@cli.option('--top_k', default = 1)
def main(text, top_k):

    icd = ICD()

    print(f'\n ICD : Command-line Interface\n')

    start      = time()

    output = icd.predict(text, top_k)

    end        = time()

    print(f'ICD Predict : Getting Answers : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'ICD Predict :  Key       |  ICD_CODE  | Probability | Long Title')

    for key in output :

        print(f"            : {key:10} | {output[key]['ICD_CODE']:10} | {output[key]['PROB']:11} | {output[key]['LONG_TITLE']} ")
    
    print(f'Raw Output : ')
    print(json.dumps(output))

if  __name__ == '__main__':
    
    main()