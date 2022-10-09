# Inicializando el contenedor desde una base ya hecha en la nube,
# esta base es un contenedor de node 18 en el OS alpine3.15
FROM node:18.4-alpine3.15 

# Copiando los archivos necesarios hacia nuestro nuevo contenedor
COPY ./package-lock.json /poke-api/
COPY ./package.json /poke-api/
COPY ./tsconfig.json /poke-api/

# seteando el directorio principal del contenedor
WORKDIR /poke-api

RUN npm install

# Aqui anadimos todo el codigo al contenedor
ADD ./src /poke-api/src

#Exponiendo puertos e iniciando el proyecto
EXPOSE 4000
CMD ["npm", "run", "start:dev"]