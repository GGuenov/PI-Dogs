const { default: axios } = require("axios");
const { Dog, Temperament, Cat } = require("../db");
const { tidyrer, catTidyrer } = require("../helpers/tidyrer");
// const { createDogDB } = require("../controllers/dogsControllers");

const API_KEY = process.env;

const URL1 = `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`;
const URL2 = `https://api.thecatapi.com/v1/breeds/?api_key=${API_KEY}`;

const dogIngester = async () => {
  try {
    const loadThemAll = await axios.get(URL1);

    const response = await tidyrer(loadThemAll.data);
    Promise.all(
      response.map(async (dog) => {
        const {
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          lifeSpan,
          temperament,
          image,
        } = dog;

        const createdDog = await Dog.create({
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          lifeSpan,
          temperament,
          image,
        });
        console.log(temperament);
        for (const findId of temperament) {
          const findTemp = await Temperament.findOne({
            where: { name: findId },
          });

          if (findTemp) {
            await createdDog.addTemperament(findTemp);
          }
        }
      })
    );
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

//---------------------------------------------------------------------------------------------------

const catIngester = async () => {
  try {
    const loadThemAll = await axios.get(URL2);
    const response = await catTidyrer(loadThemAll.data);
    Promise.all(
      response.map(async (cat) => {
        const {
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          lifeSpan,
          temperament,
          image,
        } = cat;

        const createdCat = await Cat.create({
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          lifeSpan,
          temperament,
          image,
        });
        for (const findId of temperament) {
          const findTemp = await Temperament.findOne({
            where: { name: findId },
          });

          if (findTemp) {
            await createdCat.addTemperament(findTemp);
          }
        }
      })
    );
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { dogIngester, catIngester };
