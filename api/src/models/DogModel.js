const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      heightMax: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weightMin: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weightMax: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lifeSpan: {
        field: "life_span",
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
