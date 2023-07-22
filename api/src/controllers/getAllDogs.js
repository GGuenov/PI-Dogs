const axios = require("axios");
//const DB_APIKEY = process.env;

const URL = `https://api.thedogapi.com/v1/breeds`;

const getAllDogs = async (req, res) => {
  try {
    const { data } = await axios.get(URL);

    const response = await data.map((dog) => {
      let [weightMin, weightMax] = dog.weight.imperial.split(" - ");
      let [heightMin, heightMax] = dog.height.imperial.split(" - ");
      let temperament = dog.hasOwnProperty("temperament")
        ? dog.temperament.split(", ")
        : [];

      const image = dog.hasOwnProperty("image")
        ? dog.image.url
        : "Default image URL";
      const lifeSpan = dog.hasOwnProperty("life_span")
        ? dog.life_span
        : "Unknown lifespan";

      return {
        id: dog.id,
        name: dog.name,
        weightMin: Number(weightMin),
        weightMax: Number(weightMax),
        heightMin: Number(heightMin),
        heightMax: Number(heightMax),
        temperament: temperament,
        lifeSpan: dog.life_span,
        image: dog.image.url,
        source: "API",
      };
    });

    return response;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllDogs;
