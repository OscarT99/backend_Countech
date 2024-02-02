const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');

const ColorProcesoReferenciaPedidoModel = sequelize.define('ColorEnProcesoEnReferenciaEnPedido', {
  proceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        is: /^[a-zA-ZáéíóúÁÉÍÓÚÑñ ]+$/,
    },
  },
  tallaS:{
    type:DataTypes.INTEGER
  },
  tallaM:{
    type:DataTypes.INTEGER
  },
  tallaL:{
    type:DataTypes.INTEGER
  },
  tallaXL:{
    type:DataTypes.INTEGER
  },
  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

module.exports = ColorProcesoReferenciaPedidoModel;
