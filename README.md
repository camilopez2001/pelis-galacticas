<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  
# Peliculas Galacticas

Peliculas Galacticas es un backend que toma información de la API pública de Star Wars y es utilizada en pos de crear una nueva aplicación de gestión de películas. El backend esta desarrollado en Node.js con Nest.js. Ademas cuenta con la integracion del servicio de AWS llamado Cognito para la autenticación y autorización. Por otro lado, esta integrado GraphQL para el acceso a el listado de usuarios y para obtener los detalles de un usuario. Una manera de distinta de acceder a los datos.

## Inicio Rápido

Sigue estos pasos para comenzar con el proyecto:

### Clonar el Repositorio

```bash
git clone https://github.com/camilopez2001/pelis-galacticas
```

### Importar la Colección de Postman

Importa la colección de Postman desde el archivo proporcionado en la carpeta `postman/`.

### Configurar Archivo .env

Crea un archivo `.env` en la raíz del proyecto con los datos proporcionados por email.

### Instalar Dependencias

```bash
npm i
```

### Configurar Node.js

Asegúrate de estar usando la versión correcta de Node.js. En caso de no tenerla:

```bash
nvm install 16.13.2
nvm use 16.13.2
```

### Importar la Base de Datos

1. Crea una base de datos en PostgreSQL con el nombre `pelisgalacticas`.
2. Copia el contenido del archivo `dump.sql`.
3. Ejecuta una consulta con el contenido de `dump.sql` para importar la base de datos.

### Iniciar la Aplicación

```bash
# development
npm run start
```

