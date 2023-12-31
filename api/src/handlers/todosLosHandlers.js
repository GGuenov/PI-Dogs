const { getAllDogs, getDBDogs } = require("../controllers/getAllDogs");
const { getAllCats, getDBCats } = require("../controllers/getAllCats.js");
const { deleteDogDB, editedDogDB } = require("../controllers/DBControllers");
const { getCatByName } = require("../controllers/catControllers");
const {
  getDogByName,
  createDogDB,
  getDetailsByNameEnAPI,
  getDetailsByNameEnDB,
  getRazasss,
  getDogBreedsByName,
} = require("../controllers/dogsControllers");
// const cargarTemperamentosDesdeAPI = require("../controllers/getTemperamentsData");

const getOnlyDBDogsHandler = async (req, res) => {
  try {
    const response = await getDBDogs();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDogsHandler = async (req, res) => {
  try {
    let nextId = 1;
    const responseDB = await getDBDogs(nextId);

    nextId = responseDB.length + 1;

    const responseDBCats = await getDBCats(nextId);
    const response = responseDB.concat(responseDBCats);
    console.log("gato");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailsHandler = async (req, res) => {
  const { name } = req.params;
  console.log(name);

  try {
    const isItADog = await getDogByName(name);
    const isItACat = await getCatByName(name);
    console.log(isItACat);
    console.log(isItADog);
    const all = isItADog.concat(isItACat);
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRazassHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const razaByName = await getDogBreedsByName(name);
      res.status(200).json(razaByName);
    } else {
      const response = await getRazasss();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDogHandler = async (req, res) => {
  // console.log(90909090);
  // console.log(body);
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpan,
    temperament,
    image,
  } = req.body;
  try {
    const createdDog = await createDogDB(
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      temperament,
      image
    );
    res.status(201).json({ createdDog });
    console.log(createdDog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const editDogHandler = async (req, res) => {
  const {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpan,
    temperament,
    image,
  } = req.body;
  try {
    const editedDog = await editedDogDB(
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      temperament,
      image
    );
    res.status(200).json(editedDog + "El perro fue editado");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteDogHandler = async (req, res) => {
  const { name } = req.params;
  try {
    console.log(name);
    const deletedDog = await deleteDogDB(name);
    res.status(200).json({ deletedDog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDetailsHandler,
  getRazassHandler,
  createDogHandler,
  deleteDogHandler,
  editDogHandler,
  getOnlyDBDogsHandler,
};

// getAllTemperamentsHandler,
