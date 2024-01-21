const { DataTypes }  = require("sequelize");
const { sequelize } = require("../../database/config");

const AsignarProceso = require("../produccionModel/asignarProcedimiento");

const EmpleadoModel = sequelize.define("Empleado", {
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  tipoIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numeroIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  fechaIngreso: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  estadoProduccion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
  
});

EmpleadoModel.hasMany(AsignarProceso, { foreignKey: 'empleado' });

module.exports = EmpleadoModel;