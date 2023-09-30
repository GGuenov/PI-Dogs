const { default: axios } = require("axios");
const { Dog, Temperament } = require("../db");
const { tidyrer } = require("../helpers/tidyrer");

const API_KEY = process.env;

const URL = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;

const dogIngester = async () => {
  try {
    const loadThemAll = await axios.get(URL);
    const response = await tidyrer(loadThemAll);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { dogIngester };
