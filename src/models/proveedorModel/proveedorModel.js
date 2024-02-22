const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');

const ProveedorModel = sequelize.define('Proveedor', {
  tipoProveedor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Persona jurídica', 'Persona natural']],
    },
  },
  tipoIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [
        [
          'Tarjeta de identidad',
          'Cédula de ciudadanía',
          'Tarjeta de extranjería',
          'Cédula de extranjería',
          'NIT',
          'Pasaporte',
        ],
      ],
    },
  },
  numeroIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      customValidation(value) {
        if (!/^\d{6,12}$/.test(value)) {
          throw new Error('Número de identificación no válido. Debe tener entre 6 y 12 caracteres numéricos.');
        }
      },
    },
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreComercial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ ]+/,
    },
  },
  direccion: {
    type: DataTypes.STRING,
  },
  contacto: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ProveedorModel;
