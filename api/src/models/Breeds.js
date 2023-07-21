const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breeds', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://wallpaperaccess.com/full/3023222.jpg',
    },
    height: {  // Ver la API, puede ser DataTypes.ARRAY(DataTypes.STRING)
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weight: { // Ver la API, puede ser DataTypes.ARRAY(DataTypes.STRING)
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    life_span: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};
