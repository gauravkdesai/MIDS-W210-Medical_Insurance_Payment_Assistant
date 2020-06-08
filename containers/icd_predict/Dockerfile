# Docker file for ICD Prediction Model API

#FROM ubuntu:18.04
FROM huggingface/transformers-pytorch-cpu

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

RUN pip install simpletransformers

RUN pip install flask

RUN mkdir -p /final

WORKDIR /final/app/model

# Download the ICD Code Model
RUN wget http://brent-w210-models.s3.amazonaws.com/model/model.zip
RUN unzip model.zip

WORKDIR /final
ADD app /final/app
WORKDIR /final/app/

# Sanity check
RUN python3 cli.py --text "THIS IS a test Note.  Let's see if this is able to produce an output." --top_k 10

# Entry Point
EXPOSE 5001
ENTRYPOINT ["python3"]
CMD ["api.py"]