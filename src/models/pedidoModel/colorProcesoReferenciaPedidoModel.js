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
  cantAsignadaS: {
    type: DataTypes.INTEGER,    
    defaultValue: 0,
  },  
  cantHechaS: {    
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  cantAsignadaM: {
    type: DataTypes.INTEGER,    
    defaultValue: 0,
  },  
  cantHechaM: {    
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  cantAsignadaL: {
    type: DataTypes.INTEGER,    
    defaultValue: 0,
  },  
  cantHechaL: {    
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  cantAsignadaXL: {
    type: DataTypes.INTEGER,    
    defaultValue: 0,
  },  
  cantHechaXL: {    
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = ColorProcesoReferenciaPedidoModel;
