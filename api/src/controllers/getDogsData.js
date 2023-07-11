const axios = require("axios");
//const DB_APIKEY = process.env;

const URL = `https://api.thedogapi.com/v1/breeds`;
//?api_key={${DB_APIKEY}}
const getDogsData = async (req, res) => {
  try {
    const { data } = await axios.get(URL);

    console.log(data);

    return await data.map((dog) => {
      let [weightMin, weightMax] = dog.weight.imperial.split(" - ");
      let [heightMin, heightMax] = dog.height.imperial.split(" - ");
      let temperament = dog.hasOwnProperty("temperament")
        ? dog.temperament.split(/\s*(?:,|$)\s*/)
        : "";
      result = {
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
      return result;
    });
  } catch (error) {
    console.error("getDogData: ", error.message);
    throw new Error(error.message);
  }
};

module.exports = getDogsData;
