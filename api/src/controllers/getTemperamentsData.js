const { Temperament } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize");

const cargarTemperamentosDesdeAPI = async (req, res) => {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    //console.log(response);

    const data = response.data;
    for (const object of data) {
      const listaTemperamentos = object.temperament.split(", ");
      console.log(listaTemperamentos);
      // if (listaTemperamentos.leght === 0) {
      //   throw new Error("can't get them");
      // }

      for (const temperamento of listaTemperamentos) {
        console.log(temperamento);

        await Temperament.create({ name: temperamento });
      }
    }

    res.status(200).json("temperaments cargados.");
  } catch (error) {
    console.error("Error al cargar los temperamentos:", error);
  }
};

module.exports = cargarTemperamentosDesdeAPI;
