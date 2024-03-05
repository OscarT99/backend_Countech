const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../database/config');


const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ ]+/,
      len: {
        args: [6, 50],
        msg: 'El nombre debe tener al menos 6 caracteres',
      },
    },
  },
  
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: {
        msg: 'La cédula debe contener solo números',
      },
      len: {
        args: [8, 10],
        msg: 'La cédula debe tener entre 8 y 10 caracteres',
      },
    },
  },
  
  email: {
    type: DataTypes.STRING(180),
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/,
    },
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
    },
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Usuario;
