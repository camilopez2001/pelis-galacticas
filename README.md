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

### Datos de administrador

1. Dentro del endpoint Login se encuentra el inicio de sesión de la aplicación, ingresar sus datos:
```bash
{
    "name": "Administrador",
    "password": "Administrador123!"
}
```

### Flujo usuarios Register

1. Dentro del endpoint Register se encuentra el registro de la aplicación, ingresar sus datos:
```bash
{
    "name": "username",
    "password": "User1234!",
    "email": "username@gmail.com"
}
```
2. Va a llegar un email con el codigo de veirificaión. Ingresar ese codigo en el endpoint confirmUser junto al username para confirmar el usuario. Una vez confirmado el usuario se va a agregar a la base de datos.

### Flujo usuarios: Login

1. Dentro del endpoint Login se encuentra el inicio de sesión de la aplicación, ingresar sus datos:
```bash
{
    "name": "username",
    "password": "User1234!"
}
```
2. Al ingresar sesión por primera vez se van a guardar los datos restantes en la base de datos.
3. Luego de haber inicio sesión se van a poder usar los endpoints de MOVIES

### Flujo movies

1. Hay un endpoint para obtener la lista de películas. Este endpoint puede ser visualizado por cualquier usuario. 
2. El endpoint para obtener los detalles de una película específica solo los puede visualizar un usuario regular, por lo que hay
que iniciar sesion con un usuario recien creado, es decir un usuario regular.
3. A los endpoints de ABM de peliculas solo puede acceder un adminitrador, por lo que mas arriba estan las credenciales del 
Administrador.

### Flujo user

1. Para obtener los usuarios hay que ejecutar el endpoints con la query
```bash
query{
    users{
        id
        access_token
        email
        password
        username
    }
}
```

2. Mismo si quiero obtener un solo usuario, el endpoint sigue siendo el mismo, distinta query
```bash
query{
    user(id:4){
        id
        email
        password
        username
    }
}
```