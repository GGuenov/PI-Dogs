const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "nameIndex",
      },
      heightMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      heightMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weightMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weightMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lifeSpan: {
        field: "life_span",
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
