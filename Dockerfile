FROM node:20-slim
# debian

RUN apt update -y && \
  apt install procps -y && \
  npm install -g @nestjs/cli@10.0.0

WORKDIR /home/node/app

USER node

# ler o dispositivo nulo do linux, e não deixa o container morrer
CMD [ "tail", "-f", "/dev/null" ]