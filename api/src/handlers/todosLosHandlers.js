const { getAllDogs, getDBDogs } = require("../controllers/getAllDogs");
const { deleteDogDB, editedDogDB } = require("../controllers/DBControllers");

const {
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
    const responseAPI = await getAllDogs();
    const responseDB = await getDBDogs();

    const todes = responseAPI.concat(responseDB);
    console.log("gato");
    res.status(200).json(todes);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailsHandler = async (req, res) => {
  const { name } = req.params;
  const source = isNaN(name) ? "DB" : "API";
  try {
    const responseAPI = await getDetailsByNameEnAPI(name);
    if (responseAPI) res.status(200).json(responseAPI);
    else {
      const responseDB = await getDetailsByNameEnDB(name);
      res.status(200).json(responseDB);
    }
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
