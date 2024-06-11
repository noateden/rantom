FROM node:20

WORKDIR /rantomapp

COPY . .

RUN yarn && yarn build
