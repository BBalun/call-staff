FROM node:alpine

WORKDIR /usr/app/frontend

COPY ./ ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]