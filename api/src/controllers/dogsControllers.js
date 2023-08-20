const axios = require("axios");
const { Dog, Temperament } = require("../db");

const createDogDB = async (
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpan,
  temperament,
  image
) => {
  const createdDog = await Dog.create({
    name,
    heightMin: parseInt(heightMin),
    heightMax: parseInt(heightMax),
    weightMin: parseInt(weightMin),
    weightMax: parseInt(weightMax),
    lifeSpan,
    image,
  });

  for (const findId of temperament) {
    const findTemp = await Temperament.findOne({
      where: { id: findId },
    });

    if (findTemp) {
      await createdDog.addTemperament(findTemp);
    }
  }

  return createdDog;
};

const getDetailsByNameEnAPI = async (name) => {
  try {
    const URL = `https://api.thedogapi.com/v1/breeds/search?q=${name}`;
    const response = await axios.get(URL);

    if (response.data.length > 0) {
      const perro = response.data[0];
      return perro;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getDetailsByNameEnDB = async (name) => {
  const dog = await Dog.findByPk(name);

  return dog;
};

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

// Controlador para la ruta GET /dogs/name
async function getDogBreedsByName(req, res) {
  const { name } = req.query;

  try {
    // Consultar las razas en la API
    const apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds/");
    const apiDogBreeds = apiResponse.data;

    // Filtrar las razas que coincidan con el nombre recibido (ignorando mayúsculas y minúsculas)
    const matchedBreeds = apiDogBreeds.filter((breed) =>
      breed.name.toLowerCase().includes(name.toLowerCase())
    );

    if (matchedBreeds.length === 0) {
      // Si no se encontraron razas, mostrar mensaje adecuado
      return res
        .status(404)
        .json({ message: "No se encontraron razas de perros con ese nombre." });
    }

    // Aquí puedes realizar la búsqueda en tu base de datos local y combinar los resultados con las razas de la API si es necesario

    // Devolver las razas encontradas
    res.json(matchedBreeds);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al buscar las razas de perros." });
  }
}

module.exports = {
  createDogDB,
  getDetailsByNameEnAPI,
  getDetailsByNameEnDB,
  getRazasss,
  getDogBreedsByName,
};
