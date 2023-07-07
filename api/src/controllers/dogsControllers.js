const axios = require("axios");
const { Dog, Temperament } = require("../db");

const createDogDB = async (id, raza, temperament) => {
  return await Dog.create({ id, raza, temperament });
};

const getDogByIdRaza = async (idRaza, source) => {
  const dog =
    source === "API"
      ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`)).data
      : await Dog.findByPK(idRaza);
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

module.exports = { createDogDB, getDogByIdRaza, getRazasss, getRazassByName };
