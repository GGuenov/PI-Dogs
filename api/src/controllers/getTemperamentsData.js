const getTemperamentsData = async (req, res) => {
  try {
    const temperamentsList = await TemperamentModel.findAll();
    if (temperamentsList.lenght === 0) {
      const URL = `https://api.thedogapi.com/v1/breeds`;
      const API = await axios(URL);
    }
    const allTemperements = new Set();

    API.data.forEach((dog) => {
      if (dog.temperament) {
        const temperamentS = dog.temperament.split(", ");
        temperamentS.forEach((temp) => allTemperements.add(temp));
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
