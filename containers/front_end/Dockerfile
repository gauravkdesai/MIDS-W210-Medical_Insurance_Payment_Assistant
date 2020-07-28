# Docker file for ICD Prediction Model API

#FROM ubuntu:18.04
FROM node:10

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
                   ca-certificates && \
    rm -rf /var/lib/apt/lists

RUN mkdir -p /final

WORKDIR /final
ADD app /final/app
WORKDIR /final/app/

RUN npm install

# Entry Point
EXPOSE 8080
EXPOSE 3000

# ENTRYPOINT ["node"]
# CMD [ "server.js" ]