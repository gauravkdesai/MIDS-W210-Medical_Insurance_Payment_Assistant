#!/usr/bin/env python3

import click as     cli
from    icd import ICD
from    time import time
import json

@cli.command()
@cli.option('--text',  default = "")
def main(text):

    icd = ICD()

    print(f'\n ICD : Command-line Interface\n')

    start      = time()

    output = icd.predict(text)

    end        = time()

    print(f'ICD Predict : Getting Answers : End-2-End - Finished in {end-start:7.3f} Seconds')
    print(f'Raw Output : ')

    print(json.dumps(str(output)))

if  __name__ == '__main__':
    
    main()