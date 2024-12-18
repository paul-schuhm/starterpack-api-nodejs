FROM node:23-bullseye-slim

WORKDIR /usr/src/app

COPY api/ .

RUN npm install && npm run swagger-autogen

EXPOSE 3000
