FROM node:19-alpine3.16

WORKDIR /usr/src/myapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]