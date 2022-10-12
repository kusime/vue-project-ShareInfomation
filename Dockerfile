FROM node:latest

WORKDIR /share
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .

EXPOSE 8000

CMD ["npm","run","dev"]