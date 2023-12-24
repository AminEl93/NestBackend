# Backend con NestJS
Esta es una aplicación de backend creada con la versión 10.2.1 de [NestJS](https://nestjs.com/), un framework de [NodeJS](https://nodejs.org/en) progresivo para crear aplicaciones de servidor eficientes y escalables. Para ello, se han utilizado las herramientas siguientes: [MongoDB](https://www.mongodb.com/es), [MongoDB Compass](https://www.mongodb.com/products/tools/compass), [Docker](https://www.docker.com), [Docker Desktop](https://www.docker.com/products/docker-desktop) y 
[Postman](https://www.postman.com).

Se ha creado un proceso de autenticación para crear y validar los usuarios. A su vez, también poder hacer login y registro de los mismos. La base de datos está hecha con la versión 5.0.23 de MongoDB y para montar la imagen en ella se ha utilizado la versión 24.0.7 de Docker.

## Configurar Docker con MongoDB
Para conectarse a la base de datos, lo primero es ejecutar el comando `npm run start:dev` para estar en "*modo watch*" y ver cualquier cambio que se haga tanto en los archivos de la aplicación como en la base de datos (conexiones de los módulos del proyecto con la BD, logs, creación de documentos, etc.). 

Después, mediante el archivo de Docker del proyecto, hay que ejecutar el comando `docker compose up -d` para levantarla y en el Docker Desktop se verá la imagen de la base de datos corriendo (**siempre ha de estarlo**).

## Conexión de NestJS con la base de datos
En la documentación oficial, hay una [guía](https://docs.nestjs.com/techniques/mongodb) para conectarse a la base de datos de MongoDB a través de NestJS. Como la cadena de conexión con MongoDB está creada en una variable de entorno dentro un archivo llamado `.env`, hay que copiar el archivo `.env.template` y renombrarlo a `.env`.

Para la conexión, hay que abrir MongoDB Compass, escribir la conexión `mongodb://localhost:27017` y pulsar el botón `Connect`. Una vez dentro la base de datos `mean-db` ya estará creada con la colección `users`, pero sin ningún documento. Para añadir un documento/registro, se puede hacer directamente desde aquí o desde Postman con la URL `localhost:3000/auth` y poniendo los datos concretos en la parte del Body. 

## Iniciar la aplicación

```bash
# Desarrollo
$ npm run start

# Modo watch
$ npm run start:dev

# Modo producción
$ npm run start:prod
```

## Tests

```bash
# Tests unitarios
$ npm run test

# Tests e2e
$ npm run test:e2e

# Tests coverage
$ npm run test:cov
```


