const { Sequelize } = require("sequelize");
require("dotenv").config();

const DogModel = require("./models/DogModel");
const TemperamentModel = require("./models/TemperamentModel");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/perros`,
  { logging: false }
);
DogModel(sequelize);
TemperamentModel(sequelize);

const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament, { through: "Dog_Temperament" });
Temperament.belongsToMany(Dog, { through: "Dog_Temperament" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
