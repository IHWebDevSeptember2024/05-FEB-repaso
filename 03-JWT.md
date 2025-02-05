# Repaso de JWT en Express

JWT (JSON Web Token) es una forma que tenemos de autenticar a los usuarios en nuestra aplicación. Es decir, nos permite saber quién está realizando una petición a nuestro servidor (recuerda el ejemplo de la tarjeta de hotel).

Un JWT puede contener la información que queramos, como el ID del usuario, su nombre, email, etc. Este token se envía en la cabecera de la petición HTTP y se verifica en el servidor para saber si el usuario está autenticado, es decir, si el usuario está logueado.

## 1. Crear un JWT

Para crear un JWT, necesitamos una clave secreta que solo nosotros conozcamos. Esta clave se usa para firmar el token y verificar que no ha sido modificado.

```js
const jwt = require("jsonwebtoken");

const clave = "clave-secreta"; // normalmente la guardamos en .env

const token = jwt.sign({ id: 1, nombre: "Juan" }, clave, { expiresIn: "1h" }); // ¡ya tenemos nuestro token!
```

_Explicación:_

- Usamos la función `jwt.sign()` para crear un token.
- Esto lo realizaremos cuando el usuario inicie sesión en nuestra aplicación (login).
- Ejemplo de hotel: el token sería como la tarjeta que nos dan al hacer check-in.

## 2. Verificar un JWT

Para verificar un JWT, necesitamos la misma clave secreta que usamos para firmar el token. Por eso es importante guardarla en un lugar seguro. Si la clave es incorrecta, el token no será válido.

```js
const jwt = require("jsonwebtoken");

const clave = "clave-secreta"; // normalmente la guardamos en .env

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiSnVhbiIsImlhdCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

jwt.verify(token, clave, (error, decoded) => {
  if (error) {
    console.error("Token inválido.");
  } else {
    console.log("Token verificado:", decoded);
  }
});
```

_Explicación:_
- Usamos la función `jwt.verify()` para verificar un token.
- Si el token es válido, obtenemos la información que contiene. Es decir, el objeto que pasamos al firmar el token con id, nombre y mail, por ejemplo.
- Esto lo realizaremos en todas las rutas que queramos proteger, para saber si el usuario está autenticado.
- El token no será válido si ha sido modificado, si ha caducado o si la clave es incorrecta.