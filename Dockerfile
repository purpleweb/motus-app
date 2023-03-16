FROM node:19-alpine AS build-step

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY *.json ./
COPY src/ ./src
COPY public/ ./public
COPY dict/ ./dict

RUN npm install
RUN npm run testNoWatch
