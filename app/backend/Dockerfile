FROM node:13.10.1-alpine3.10

WORKDIR /usr/app/backend

COPY . .

RUN npm install
RUN npm i -D

EXPOSE 8080
EXPOSE 9229
CMD [ "npm", "start" ]
