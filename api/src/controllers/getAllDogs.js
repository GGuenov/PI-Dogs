const axios = require("axios");
const API_KEY = process.env;
const { Dog, Temperament } = require("../db");

const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const getAllDogs = async () => {
  try {
    const { data } = await axios.get(URL);
    const response = await Promise.all(
      data.map(async (dog) => {
        let [weightMin, weightMax] = dog.weight.imperial.split(" - ");
        let [heightMin, heightMax] = dog.height.imperial.split(" - ");
        let temperament = dog.hasOwnProperty("temperament")
          ? dog.temperament.split(", ")
          : [];

        const image = dog.hasOwnProperty("reference_image_id")
          ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}`
          : "Default image URL";
        console.log(image);
        // console.log(bringImage.data);
        // console.log(bringImage);

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
          lifeSpan: lifeSpan,
          image: image,
          source: "API",
        };
      })
    );

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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllDogs, getDBDogs };
