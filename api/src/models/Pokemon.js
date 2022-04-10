const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING,
      defaultValue: "https://i.servimg.com/u/f60/14/90/93/75/tm/pokemo10.png",
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fuerza: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    origin: {
      type: DataTypes.STRING,
      defaultValue: "db"
    }
  }, {timestamps: false});
};


