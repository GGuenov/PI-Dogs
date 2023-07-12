const { Temperament } = require("../db");
const axios = require("axios");
const { Sequelize } = require("sequelize");

const cargarTemperamentosDesdeAPI = async (req, res) => {
  try {
    const API = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    //console.log(API);

    const allTemperaments = new Set();
    API.data.forEach((dog) => {
      if (dog.temperament) {
        const temps = dog.temperament.split(", ");
        temps.forEach((temp) => allTemperaments.add(temp));
      }
    });
    //console.log(allTemperaments);
    const AllFields = Array.from(allTemperaments).map((tempName) => {
      return {
        name: tempName,
      };
    });
    //console.log(AllFields);

    for (const temper of AllFields) await Temperament.create(temper);
    //console.log(registers);

    console.log("cargados");
    res.status(200).json("CARGADOS");
  } catch (error) {
    console.log("faltan o sobran?");
    //res.status(500).json({ error: error.mesage });
  }
};

module.exports = cargarTemperamentosDesdeAPI;

//   try {
//     const response = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
//     //console.log(response);

//     const data = response.data;

//     const temperamentosUnicos = new Set();
//     //console.log(temperamentosUnicos);
//     for (const object of data) {
//       if (object.hasOwnProperty("temperament")) {
//         const listaTemperamentos = object.temperament.split(",");
//         //console.log(listaTemperamentos);

//         for (const temperamento of listaTemperamentos) {
//           //     temperamentosUnicos.add(temperamento.trim());
//           //     console.log(temperamentosUnicos);
//           //   }
//           //   //const temperamentArray = [...temperamentosUnicos];
//           //   //console.log(temperamentArray);
//           // }
//           // for (const temperamento of temperamentosUnicos) {
//           await Temperament.findAndCreate({
//             where: { name: temperamento.trim() },
//           });
//         }
//       }
//     }

//     res.status(200).json("temperaments cargados.");
//   } catch (error) {
//     console.error("Error al cargar los temperamentos");
//   }
// };
