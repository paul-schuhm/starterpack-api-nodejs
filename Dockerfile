FROM node:19-alpine3.16

WORKDIR /usr/src/app

COPY api/ .

RUN npm install -g nodemon

RUN npm install

RUN npm run swagger-autogen

EXPOSE 3000