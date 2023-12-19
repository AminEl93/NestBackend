# Backend con NestJS
Esta es una aplicación de backend creada con la versión 10.2.1 de [NestJS](https://nestjs.com/), un framework de [NodeJS](https://nodejs.org/en) progresivo para crear aplicaciones de servidor eficientes y escalables.

Se ha creado un proceso de autenticación para crear y validar los usuarios. A su vez, también poder hacer login y registro de los mismos. La base de datos está hecha con [MongoDB](https://www.mongodb.com/es) y para montar la imagen en ella se ha utilizado [Docker](https://www.docker.com).


## Conexión con la base de datos
Para conectarse, hay que ejecutar el comando `docker compose up -d` y en el [Docker Desktop](https://www.docker.com/products/docker-desktop) se verá la imagen de la base de datos corriendo (**siempre ha de estarlo**). A continuación, en el [MongoDB Compass](https://www.mongodb.com/products/tools/compass) hay que escribir la conexión `mongodb://localhost:27017`.

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


