FROM node:latest

WORKDIR /share
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .

EXPOSE 4000
EXPOSE 8000

CMD ["npm","run","dev"]