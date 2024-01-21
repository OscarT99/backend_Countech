const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");

const AsignarProcedimiento = require("./asignarProcedimiento");

const ReporteProduccion = sequelize.define("reporteProduccion", {
    
  idReporteProcedimiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  cantTerminada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

  fkAsignarProcedimiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ReporteProduccion.belongsTo(AsignarProcedimiento, {
  foreignKey: "fkAsignarProcedimiento",
});

module.exports = ReporteProduccion;
