FROM node:18.4-alpine3.15

COPY ./package-lock.json /poke-api/
COPY ./package.json /poke-api/
COPY ./tsconfig.json /poke-api/

WORKDIR /poke-api

RUN npm install

ADD ./src /poke-api/src

EXPOSE 4000

CMD ["npm", "run", "start:dev"]