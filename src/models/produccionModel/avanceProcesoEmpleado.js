const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");

const AvanceProcesoEmpleado = sequelize.define("avanceProcesoEmpleado", {
  
  cantidadHecha: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

});

module.exports = AvanceProcesoEmpleado;
