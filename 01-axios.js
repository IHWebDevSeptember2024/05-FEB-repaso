const axios = require("axios");

async function getData() {
  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    // aquí no tenemos el response.json() porque axios lo hace automáticamente. Lo mete todo en {data}
    console.log(response.data);
  } catch (error) {
    throw new Error("Esto es un error", error);
  }
}

getData();

async function postData() {
    try {
        const response = await axios.post(
            "https://rickandmortyapi.com/api/character",
            {
                name: "New Character",
                status: "Alive",
                species: "Human",
                gender: "Male"
            }
        );
        console.log(response.data);
    } catch (error) {
        throw new Error("Esto es un error", error);
    }
}

postData();