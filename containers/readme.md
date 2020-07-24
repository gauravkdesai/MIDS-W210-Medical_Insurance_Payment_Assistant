# Docker commands:

docker run --gpus all nvidia/cuda:10.0-base nvidia-smi

docker run --gpus all -p 5000:5000/tcp test_w210