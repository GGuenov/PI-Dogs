const axios = require("axios");
const { Dog, Temperament } = require("../db");
//const DB_APIKEY = process.env;

const URL = `https://api.thedogapi.com/v1/breeds`;

const getAllDogs = async () => {
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
    throw new Error({ error: error.message });
  }
};
const getDBDogs = async (req, res) => {
  try {
    const response = await Dog.findAll({
      include: {
        model: Temperament,
        atributes: ["name"],
        through: {
          atributes: [],
        },
      },
    });
    let nextId = 270;
    const elDefi = response.map((e) => {
      const dale = {
        id: nextId,
        name: e.name,
        temperament: e.Temperaments.map((e) => e.name),
        heightMax: e.heightMax,
        heightMin: e.heightMin,
        weightMax: e.weightMax,
        weightMin: e.weightMin,
        lifeSpan: e.lifeSpan,
        image: e.image,
      };
      nextId++;
      return dale;
    });

    return elDefi;
    // return response;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllDogs, getDBDogs };
