const getAllDogs = require("../controllers/getAllDogs");
const {
  createDogDB,
  getDetailsByNameEnAPI,
  getDetailsByNameEnDB,
  getRazasss,
  getDogBreedsByName,
  // getRazassByName,
} = require("../controllers/dogsControllers");
const cargarTemperamentosDesdeAPI = require("../controllers/getTemperamentsData");

// console.log(getAllDogs);

const getDogsHandler = async (req, res) => {
  try {
    const response = await getAllDogs();
    console.log("gato");
    res.status(200).json(response);
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
//  res.send(`TRAE DE LA DB Y API LAS CARACTS. DE UNA RAZA DADA POR ${idRaza}`);

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
    // console.log(req.body);
    // console.log(req.body);

    // if (
    //   name &&
    //   heightMin &&
    //   heightMax &&
    //   weightMin &&
    //   weightMax &&
    //   temperament &&
    //   image
    // )
    // {
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
    // } else {
    //   res.status(400).json({ error: "Faltan campos requeridos" });
    // }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// const getAllTemperamentsHandler = async (req, res) => {
//   try {
//     const response = await cargarTemperamentosDesdeAPI();
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  getDogsHandler,
  getDetailsHandler,
  getRazassHandler,
  createDogHandler,

  // getAllTemperamentsHandler,
};
