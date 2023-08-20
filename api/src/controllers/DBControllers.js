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
  const editada = await Dog.update(
    {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      lifeSpan,
      temperament,
      image,
    },
    { where: { name: name } }
  );
  return editada;
};

module.exports = { deleteDogDB, editedDogDB };
