const {
  createDogDB,
  getDogByIdRaza,
  getRazasss,
  getRazassByName,
} = require("../controllers/dogsControllers");

const getDogsHandler = (req, res) => {
  res.send("NIY: ESTEA RUTA TRAE LA INFO DE UN USUARIO DETERMINADO POR ID");
};

const getRazaHandler = async (req, res) => {
  const { idRaza } = req.params;
  const source = isNaN(idRaza) ? "DB" : "API";
  try {
    const response = await getDogByIdRaza(idRaza, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //  res.send(`TRAE DE LA DB Y API LAS CARACTS. DE UNA RAZA DADA POR ${idRaza}`);
};

const getRazassHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const razaByName = await getRazassByName(name);
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
  const { name, height, weight, life_span, temperament } = req.body;
  try {
    const response = await createDogDB(
      name,
      height,
      weight,
      life_span,
      temperament
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTemperamentsHandler = (req, res) => {
  res.send("NIY: ESTEA RUTA TRAE LA INFO DE UN USUARIO DETERMINADO POR ID");
};

module.exports = {
  getDogsHandler,
  getRazaHandler,
  getRazassHandler,
  createDogHandler,
  getTemperamentsHandler,
};
