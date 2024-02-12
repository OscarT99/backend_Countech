const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const AvanceProcesoEmpleado = require('./avanceProcesoEmpleado');
const AsignarProcesoEmpleado = sequelize.define("asignarProcesoEmpleado", {


  cantidadAsignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty:{
        args: true,
        msg: 'La cantidad asignada no puede estar vacía.',
      },
      notNull: {
        args: true,
        msg: 'La cantidad asignada no puede ser nula.',
      },
      isNumeric: {
        args: true,
        msg: 'La cantidad asignada debe ser numérica.',
      },
      min: {
        args: [1],
        msg: 'La cantidad asignada debe ser mínimo 1.',
      },
      max: {
        args: [9999],
        msg: 'La cantidad max permitida es de 9999.',
      },
      len: {
        args: [1, 4],
        msg: 'Cantidad de caracteres no válida. [>= 1 && <= 5]',
      }
    },
  },

  cantRestante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  estadoProcAsig: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    // validate: {
    //   notNull: {
    //     args: true,
    //     msg: 'El estado no puede ser nulo.',
    //   },  
    // },
  },

  estadoAnular: {
    type: DataTypes.BOOLEAN,
    allownull: false,
    defaultValue: false
  }

},

{
  hooks: {
    beforeCreate: (AsignarProcesoEmpleado) => {
      AsignarProcesoEmpleado.cantRestante = AsignarProcesoEmpleado.cantidadAsignada;
    }
  }
}

);

AsignarProcesoEmpleado.hasMany(AvanceProcesoEmpleado, { foreignKey: 'asignarProcesoEmpleadoId' });
module.exports = AsignarProcesoEmpleado;
