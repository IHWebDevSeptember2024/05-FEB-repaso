
# Guía Rápida de Archivos ironlauncher

## Índice

- [server.js](#serverjs)
- [routes](#routes)
    - [auth.routes.js](#authroutesjs)
- [models](#models)
    - [User.model.js](#usermodeljs)
- [middleware](#middleware)
    - [jwt.middleware.js](#jwtmiddlewarejs)
- [error-handling](#error-handling)
    - [index.js](#indexjs)
- [db](#db)
    - [index.js](#indexjs-1)
- [config](#config)
    - [index.js](#indexjs-2)
- [app.js](#appjs)


## Esquema de Carpetas

```
/mi-proyecto
├── config
│   └── index.js
├── db
│   └── index.js
├── error-handling
│   └── index.js
├── middleware
│   └── jwt.middleware.js
├── models
│   └── User.model.js
├── routes
│   └── auth.routes.js
├── app.js
└── server.js
```


## server.js
- Inicia el servidor en el puerto definido (por defecto 5005).
- Importa la configuración y la aplicación principal (`app.js`) para luego escuchar peticiones entrantes con `app.listen()`.

## routes
Contiene las rutas que organizan la lógica del servidor.

### auth.routes.js
- Maneja el registro y login de usuarios (signup y login).
- Utiliza `bcryptjs` para encriptar contraseñas.
- Genera tokens JWT con `jsonwebtoken`.
- Define la ruta `/verify` para comprobar tokens usando un middleware importado de la carpeta `middleware`.

Se utiliza express.Router() para definir las rutas y se exporta el router para ser utilizado en `app.js`. De esta forma estamos metiendo todas las rutas de golpe en un solo archivo. `app.js` solo necesita importar este archivo y usar `app.use()` para montar las rutas en la aplicación.

## models
Define los esquemas de datos utilizando Mongoose.

### User.model.js
- Define el esquema para los usuarios: email, contraseña y nombre.
- Usa el método `model` de Mongoose para crear el modelo `User`.

## middleware
Contiene los middlewares personalizados que se ejecutan antes de las rutas.

### jwt.middleware.js
- Valida los tokens usando `jsonwebtoken`.
- Añade el payload del token en `req.payload` para acceder a la información de usuario en rutas protegidas.

## error-handling
Maneja errores globales del servidor.

### index.js
- Responde con un mensaje de error cuando no se encuentra la ruta.
- Centraliza la captura de errores y envía un estado 500 si algo falla.

## db
Configura la conexión con MongoDB.

### index.js
- Usa Mongoose para conectarse a la base de datos definida en la variable de entorno `MONGODB_URI`.
- Informa en consola si la conexión fue exitosa, o muestra error.

## config
Aloja configuración adicional del servidor.

### index.js
- Configura `morgan` para registro de peticiones.
- Habilita `cors` en el puerto local.
- Permite procesar JSON y cookies en las solicitudes.

Todos estos middlewares se exportan para ser utilizados en `app.js`. De esta forma, `app.js` solo necesita importar este archivo y usar `app.use()` para montar los middlewares en la aplicación.

## app.js
- Importa y carga todas las configuraciones y middlewares (base de datos, JWT).
- Agrega las rutas principales (`/api`, `/auth`).
- Incluye el manejo de errores global.