# Repaso de Asincronía en JavaScript

Asincronía significa que las operaciones no se realizan en secuencia, sino que pueden ejecutarse en paralelo o en momentos diferentes. En JavaScript, la asincronía es fundamental para tareas como llamadas a APIs, manipulación de archivos, eventos del usuario, etc.

## 1. Callbacks

Una **callback** es una función que se pasa como argumento a otra función y que se ejecuta cuando se completa una operación asíncrona.

```js
const tareas = [
    "Tarea 1 ejecutada.",
    "Tarea 2 ejecutada.",
    "Tarea 3 ejecutada."
];

tareas.forEach(tarea => console.log(tarea)); // lo que hay dentro de forEach es una callback
// *recordatorio: podemos evitar los paréntesis de la función si solo tiene un argumento
```

*Explicación:*  
Se define un arreglo de funciones (tareas) y se itera sobre él usando `forEach`. La función de flecha `tarea => console.log(tarea)` es una callback que imprime cada tarea.

---

## 2. Promesas

Las **promesas** son objetos que representan el resultado de una operación asíncrona, pudiendo ser resueltas o rechazadas. Por ejemplo, una petición a una API puede devolver una promesa que se resuelve con los datos obtenidos. Estas llamadas a la API tardan un tiempo en completarse, por tanto debemos hacer que el resto de nuestro código espere a que se resuelva la promesa antes de usar los datos.


**Ejemplo:**

```js
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red.');
        }
        return response.json();
    })
    .then(data => console.log('Datos recibidos:', data))
    .catch(error => console.error('Fetch error:', error));
```

*Explicación:*  
Se realiza una petición a una API mediante fetch. Se verifica que la respuesta sea correcta; en caso contrario se lanza un error. Luego, se convierte la respuesta a JSON y se imprime en consola. Los errores se capturan en el bloque catch.

*Fetch:*
- Es una función global que permite hacer peticiones HTTP.
- Devuelve una promesa que se resuelve con la respuesta del servidor.

Imagina que hay más código después de la petición fetch, si no usamos promesas, el código se ejecutaría antes de que la petición se complete.

**Ejemplo:**

```js
console.log('Inicio de la petición.');
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log('Datos recibidos:', data));
    .catch(error => console.error('Fetch error:', error));

console.log('Log fuera de la promise'); // se ejecuta antes de que la petición se complete porque está fuera de la promesa. 
```
---

## 3. Async/Await

La sintaxis **async/await** permite escribir código asíncrono de forma más parecida al código síncrono, facilitando su lectura y mantenimiento.

**Ejemplo:**

```js
async function ejecutar() {
  try {
    const resultado = await obtenerResultado(); 
    console.log("Async/Await:", resultado); // esta línea SIEMPRE esperará a que se resuelva la promesa de obtenerResultado
  } catch (error) {
    console.error("Async/Await Error:", error);
  }
}

ejecutar();
```

*Explicación:*  
La función `ejecutar` es declarada como `async`, lo que permite usar `await` para esperar el resultado de la promesa. Se utiliza un bloque `try/catch` para manejar posibles errores.

---

## 4. Otro tipo de asincronía

Existen otros tipos de asincronía en JavaScript, como los **eventos** y **temporizadores**.

**Eventos:**

```js
document.addEventListener('click', () => {
    console.log('Click detectado.');
});
```

```jsx
<button onClick={() => console.log('Click detectado.')}>Click me</button>
```

**Temporizadores:**

```js
setTimeout(() => {
    console.log('Han pasado 2 segundos.');
}, 2000);
```

*Explicación:*
- `addEventListener` permite ejecutar una función cuando ocurre un evento.
- En React, los eventos se manejan de forma similar a HTML puro, pero con JSX. usamos `onClick` en lugar de `addEventListener`.	
- `setTimeout` ejecuta una función después de un tiempo determinado. Todo lo de fuera del setTimeout se ejecuta antes de que se cumpla el tiempo.

La interacción con el usuario son eventos que no sabemos cuándo ocurrirán, por tanto, debemos estar preparados para manejarlos de forma asíncrona.