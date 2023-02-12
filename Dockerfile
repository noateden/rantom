FROM node:16

WORKDIR /rantomapp

COPY . .

RUN yarn && yarn build
