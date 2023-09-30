const { Temperament } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Router } = require("express");

const router = Router();
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds/`;

const tempsRouter = Router();

tempsRouter.get("/", async (req, res) => {
  const allData = await axios.get(URL + `?api_key=${API_KEY}`);

  const { name } = req.query;

  if (name) {
    try {
      const filteredData = allData.data.filter((dog) => {
        if (dog.temperament) {
          const temperaments = dog.temperament.split(", ");
          return temperaments.includes(name);
        }
        return false;
      });

      res.status(200).json(filteredData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      let temps = allData.data
        .map((dog) => (dog.temperament ? dog.temperament : null))
        .map((dog) => dog?.split(", "));
      let eachTem = [...new Set(temps.flat())];

      eachTem.forEach(async (dogo) => {
        if (dogo) {
          await Temperament.findOrCreate({
            where: { name: dogo },
          });
        }
      });

      eachTem = await Temperament.findAll();

      res.status(200).json(eachTem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
});
module.exports = { tempsRouter };
