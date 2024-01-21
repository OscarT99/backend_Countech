const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');

const ProveedorModel = sequelize.define('Proveedor', {
  tipoProveedor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Persona', 'Empresa']],
    },
  },
  tipoIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [
        [
          'Registro civil',
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
        if (this.tipoIdentificacion === 'NIT') {
          if (!/^\d{9}-\d$/.test(value)) {
            throw new Error('Número de identificación no válido para NIT. Debe tener el formato "123456789-0".');
          }
        } else if (!/^\d{6,12}$/.test(value)) {
          throw new Error('Número de identificación no válido. Debe tener entre 6 y 12 caracteres numéricos.');
        }
      },
    },
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+/,
    },
  },
  nombreComercial: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+/,
    },
  },
  ciudad: {
    type: DataTypes.STRING,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+/,
    },
  },
  direccion: {
    type: DataTypes.STRING,
  },
  contacto: {
    type: DataTypes.STRING,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+/,
    },
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
