// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../../database/config');

// const AsignarProcesoEmpleado = require('../produccionModel/asignarProcesoEmpleado');

const PedidoProceso = sequelize.define('pedidoproceso', {
  
  proceso: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'El proceso no puede ser nulo.',
      }
    }
  },

//   tipoDeMaquina: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [['Fileteadora', 'Plana', 'Presilladora', 'Recubridora','Manual']],
//     },
//   },

  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notNull: {
        args: true,
        msg: 'La cantidad total no puede ser nula.',
      },
    },
  },

  cantidadAsignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    // validate: {
    //   notNull: {
    //     args: true,
    //     msg: 'La cantidad asignada no puede ser nula.',
    //   },
    // },
  },

  cantidadHecha: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    // validate: {
    //   notNull: {
    //     args: true,
    //     msg: 'La cantidad hecha no puede ser nula.',
    //   }
    // },
  },

  cantidadPendiente: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    // validate: {
    //   min: 0,
    //   notNull: {
    //     args: true,
    //     msg: 'La cantidad pendiente no puede ser nula.',
    //   },
    // },
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }

},
  {
    hooks: {
      beforeCreate: (pedidoProceso) => {
        pedidoProceso.cantidadPendiente = pedidoProceso.cantidadTotal;
      }
    }
  }

);


// ProcesoPedido.hasMany(AsignarProcesoEmpleado);


module.exports = PedidoProceso;
