const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { where } = require("sequelize");

const createDogDB = async (
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpan,
  image
) => {
  return await Dog.create({
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpan,
    image,
  });
};

const getDetailsByNameEnAPI = async (name) => {
  const dog = await axios(
    `https://api.thedlkjogapi.com/v1/breeds/search?q=${name}`
  );

  return dog;
};

const getDetailsByNameEnDB = async (name) => {
  const dog = await Dog.findByPk(name);

  return dog;
};
//Para limpiar y/o filtrar la data que viene de la API
const infoCleaner = (arr) => {
  return arr.map((dog) => {
    return {
      id: dog.id,
      raza: dog.raza,
      temperament: dog.temperament,
      created: false, //es una 'marca de agua' que muestre que no estaba en la base de datos ;-)
    };
  });
};

const getRazasss = async () => {
  const dogDB = await Dog.findAll();

  const infoAPI = await axios.get(`https://api.thedogapi.com/v1/breeds/`).data;

  const dogAPI = infoCleaner(infoAPI);

  return [...dogDB, ...dogAPI];
};

const getRazassByName = async (name) => {
  const infoAPI = await axios.get(`https://api.thedogapi.com/v1/breeds/`).data;
  const dogAPI = infoCleaner(infoAPI);
  const dogsFiltered = dogAPI.filter((dog) => dog.raza === raza);

  const dogDB = await Dog.findAll({ where: { raza: name } });

  return [...dogsFiltered, ...dogDB];
};

// const getAllTemperaments = async (req, res) => {
//   try {
//     findAll({ where: { temperament: temperament.lenght > 0 } });
//   } catch (error) {}
// };

module.exports = {
  createDogDB,
  getDetailsByNameEnAPI,
  getDetailsByNameEnDB,
  getRazasss,
  getRazassByName,
};
