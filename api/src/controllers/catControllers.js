const { Cat, Temperament } = require("../db");
const { Op, Sequelize } = require("sequelize");
const getCatByName = async (name) => {
  try {
    const response = await Cat.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: { model: Temperament },
    });
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getCatByName };
