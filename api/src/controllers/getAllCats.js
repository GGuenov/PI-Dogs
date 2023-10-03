const axios = require("axios");
const API_KEY = process.env;
const { Cat, Temperament } = require("../db");
const { catTidyrer } = require("../helpers/tidyrer");

const URL = `https://api.thecatapi.com/v1/breeds/?api_key=${API_KEY}`;

const getAllCats = async () => {
  try {
    const data = await axios.get(URL);
    const response = await catTidyrer(data.data);

    return response;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getDBCats = async (nextId, res) => {
  try {
    const response = await Cat.findAll({
      include: {
        model: Temperament,
        atributes: ["name"],
        through: {
          atributes: [],
        },
      },
    });
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
    console.log(elDefi);
    return elDefi;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDBCatsById = async (id) => {
  try {
    const response = await Cat.findOne(id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllCats, getDBCats, getDBCatsById };
