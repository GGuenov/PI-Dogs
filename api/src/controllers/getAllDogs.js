const axios = require("axios");
//const DB_APIKEY = process.env;

const URL = `https://api.thedogapi.com/v1/breeds`;
//?api_key={${DB_APIKEY}}
const getAllDogs = async (req, res) => {
  try {
    const { data } = await axios.get(URL);

    //console.log(data[2]);

    const response = await data.map((dog) => {
      let [weightMin, weightMax] = dog.weight.imperial.split(" - ");
      let [heightMin, heightMax] = dog.height.imperial.split(" - ");
      let temperament = dog.hasOwnProperty("temperament")
        ? dog.temperament.split(", ")
        : [];

      // console.log(dog.name);
      // console.log(temperament);
      // console.log(Number(weightMin));
      // console.log(dog.life_span);
      // console.log(dog.image.url);
      // console.log(Number(weightMin));
      // console.log(Number(weightMin));
      // console.log(Number(weightMin));
      return {
        id: dog.id,
        name: dog.name,
        weightMin: Number(weightMin),
        weightMax: Number(weightMax),
        heightMin: Number(heightMin),
        heightMax: Number(heightMax),
        temperament: temperament,
        lifeSpan: dog.life_span,
        image: dog.image.url,
        source: "API",
      };
    });
    console.log(response.length);
    return response;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllDogs;
