# Repaso de Middlewares en Express

Los middlewares son funciones que se ejecutan en el ciclo de vida de una petición HTTP. Pueden realizar tareas como validar datos, modificar la petición o respuesta, o finalizar la petición.

## 1. Ciclo de vida de una petición HTTP

El ciclo de vida de una petición HTTP en Express puede tener varias partes:

1. **Petición:** Se recibe la petición HTTP (request). Una vez nuestro backend recibe la petición, se ejecutan los middlewares de la configuración.

**Ejemplo**:

```js
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
```

2. **Rutas:** Se ejecutan las rutas que coincidan con la petición. Si la petición es un `GET` a `/usuarios`, se ejecutará la función que maneje esa ruta. Una ruta también es considerada un middleware, es decir, cada una de las funciones que se ejecutan en el ciclo de vida de una petición HTTP.

**Ejemplo**:

```js
app.get("/usuarios", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});
```

3. **Respuesta:** Se envía la respuesta HTTP (response) al cliente.

---

## 2. Creación de middlewares

También tenemos la posible de crear nuestros propios middlewares. Para ello, usamos la función `app.use()` de Express. Ya la hemos usado antes para configurar middlewares de terceros, pero también podemos crear los nuestros.

**Ejemplo**:

```js
app.use((req, res, next) => {
  console.log("Petición recibida.");
  next();
});
```

_Explicación:_

- Se define un middleware que imprime un mensaje en consola.
- La función `next()` es un callback que le dice a Express que pase al siguiente middleware.

### Orden de ejecución

```js
app.use(morgan("dev")); // Middleware 1
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
}); // Middleware 2
app.use(cors()); // Middleware 3

app.get("/", (req, res) => {
  // Middleware 4 (ruta)
  res.send("Hola, mundo.");
});
```

_Explicación:_

- Los middlewares se ejecutan en el orden en que se definen. Las rutas también se ejecutan en ese orden, pero solo si coinciden con la petición. Por ejemplo si la ruta es `GET /`, se ejecutarán los middlewares 1, 2, 3 y 4. Pero si la ruta es `GET /usuarios`, se ejecutarán los middlewares 1, 2 y 3, pero no el 4.

### Middleware de error

Como hemos dicho, las rutas también son middlewares. Si una ruta recibe un error, podemos pasar ese error a un middleware especial que se ejecuta solo cuando hay errores.

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor.");
});
```

Ok ok, esto es un poco más avanzado, estos middlewares de error se usan para manejar errores que se producen en la aplicación. Este middleware irá al final de todos los middlewares y rutas, y se ejecutará solo si hay un error. ¿Por qué? porque el ciclo de vida de una petición HTTP se termina cuando mandamos una respuesta.

Veamos un ejemplo:

```js
app.get("/usuarios", (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(() => next("Error al buscar usuarios.")); // Si hay un error, se pasa al siguiente middleware
  // dentro del next() se puede pasar un string, un objeto, un error, etc.
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err }); // el parámetro err es lo que se pasa en next() anterior
  // el cliente recibirá un JSON con el error { error: "Error al buscar usuarios." }
});
```

_Explicación:_

- Se define una ruta que busca usuarios en la base de datos. Si hay un error, se pasa al siguiente middleware.
- El middleware de error recibe el error y lo envía en la respuesta. Como en next() se pasó un string, el error será lo que pongamos en ese string. Así podemos manejar errores de manera centralizada.

#### Errores centralizados

```js
app.get("/usuarios", (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(() => next("Error al buscar usuarios."));
});

app.get("/productos", (req, res, next) => {
  Product.find()
    .then((products) => res.json(products))
    .catch(() => next("Error al buscar productos."));
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err });
  // el cliente recibirá un JSON con el error { error: "Error al buscar usuarios." } si hay un error en la ruta /usuarios
  // o { error: "Error al buscar productos." } si hay un error en la ruta /productos
});
```

_Explicación:_

- Se definen dos rutas que buscan usuarios y productos en la base de datos. Si hay un error, se pasa al siguiente middleware, cada uno de los errores tiene un mensaje personalizado.
