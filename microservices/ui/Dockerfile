FROM node:18.4-alpine3.15

COPY ./ui/package-lock.json /poke-ui/
COPY ./ui/package.json /poke-ui/

WORKDIR /poke-ui

RUN npm install

ADD ./ui /poke-ui

EXPOSE 3000

CMD ["npm", "run", "start", "--host"]