console.log("Inicio de la petición.");
fetch("https://rickandmortyapi.com/api/character")
  .then((response) => response.json())
  .then((data) => {
    console.log("Datos recibidos:", data);
  })
  .catch((error) => console.error("Fetch error:", error));

// console.log(data); // undefined

async function getData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    throw new Error("Esto es un error", error);
  }
}

getData();

async function postData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "New Character",
        status: "Alive",
        species: "Human",
        gender: "Male"
      })
    });

    const data = await response.json();
    console.log("Post response data:", data);
  } catch (error) {
    console.error("Post error:", error);
  }
}

postData();

