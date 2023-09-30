const axios = require("axios");
const API_KEY = process.env;
const { Dog, Temperament } = require("../db");
const { tidyrer } = require("../helpers/tidyrer");

const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const getAllDogs = async () => {
  try {
    const data = await axios.get(URL);
    console.log(data.data.length);
    const response = await tidyrer(data.data);

    return response;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getDBDogs = async (nextId, res) => {
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
    // let nextId = 173;
    const elDefi = response.map((e) => {
      // console.log(nextId);
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
