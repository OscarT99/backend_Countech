const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");

const AsignarProcesoModel = sequelize.define("AsignarProceso", {

  idAsignarProceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  empleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  

  // Foreign Key del proceso
  proceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fechaRegistro: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },

  cantAsignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

});


module.exports = AsignarProcesoModel;
