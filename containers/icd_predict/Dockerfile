# Docker file for ICD Prediction Model API

#FROM ubuntu:18.04
# FROM pytorch/pytorch:1.1.0-cuda10.0-cudnn7.5-devel

#FROM nvidia/cuda:10.2-cudnn7-devel

#FROM nvidia/cuda:11.0-cudnn8-runtime-ubuntu18.04

FROM nvidia/cuda:10.1-cudnn7-devel-ubuntu18.04

# Install Utilities
  ENV LANG=C.UTF-8 \
      PATH=${PATH}:.
  ARG DEBIAN_FRONTEND=noninteractive
  RUN apt update \
   && apt install -yq apt-utils wget curl git

RUN apt update && \
    apt install -y bash \
                   build-essential \
                   git \
                   unzip \
                   curl \
                   ca-certificates \
                   python3 \
                   python3-pip && \
    rm -rf /var/lib/apt/lists

RUN python3 -m pip install --no-cache-dir --upgrade pip

RUN pip install torch

RUN pip install keras

RUN pip install tensorflow

RUN pip install transformers

RUN pip install pandas

RUN pip install flask

RUN pip install flask-cors

RUN pip install tensorflow

RUN pip install nltk


RUN mkdir -p /final

WORKDIR /final/app/models

# Download the ICD Code Model
RUN wget https://brent-w210-models.s3-us-west-2.amazonaws.com/models.zip
RUN unzip models.zip

WORKDIR /final
ADD app /final/app
WORKDIR /final/app/

# Sanity check
RUN python3 cli.py --text "THIS IS a test Note.  Let's see if this is able to produce an output."

# Entry Point
EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["api.py"]