const { Sequelize } = require("sequelize");
require("dotenv").config();

const DogModel = require("./models/DogModel");
const TemperamentModel = require("./models/TemperamentModel");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/perros`,
  { logging: false } // set to console.log to see the raw SQL queries
  //   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
);
DogModel(sequelize);
TemperamentModel(sequelize);

const { Dog, Temperament } = sequelize.models;

Dog.belongsToMany(Temperament);
Temperament.belongsToMany(Dog);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
