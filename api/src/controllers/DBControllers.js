const { Dog, Temperament } = require("../db");

const deleteDogDB = async (name) => {
  const deleteada = await Dog.destroy({
    where: { name: name },
  });

  return deleteada;
};

const editedDogDB = async (
  name,
  heightMin,
  heightMax,
  weightMin,
  weightMax,
  lifeSpan,
  temperament,
  image
) => {
  const updateDog = await Dog.findOne({
    where: { name: name },
    include: Temperament,
  });

  // if (!updateDog) return null;

  await updateDog.update({
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpan,
    temperament,
    image,
  });

  const temperamentToUpdate = await Temperament.findAll({
    where: { id: temperament },
  });

  await updateDog.setTemperaments(temperamentToUpdate);

  return updateDog;
};

module.exports = { deleteDogDB, editedDogDB };
