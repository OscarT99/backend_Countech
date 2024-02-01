const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');

const ColorProcesoReferenciaPedido = require('./colorProcesoReferenciaPedidoModel')
const AsignarProcesoEmpleado = require('../produccionModel/asignarProcesoEmpleado');

const ProcesoReferenciaPedidoModel = sequelize.define('ProcesoEnReferenciaEnPedido', {
  
  pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

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

  tipoDeMaquina: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Fileteadora', 'Plana', 'Presilladora', 'Recubridora','Manual']],
    },
  },

  cantTotal: {
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

  cantAsignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      notNull: {
        args: true,
        msg: 'La cantidad asignada no puede ser nula.',
      },
    },
  },

  cantHecha: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      notNull: {
        args: true,
        msg: 'La cantidad hecha no puede ser nula.',
      }
    },
  },
  cantPendiente: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      notNull: {
        args: true,
        msg: 'La cantidad pendiente no puede ser nula.',
      },
    },
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: 'El estado no puede ser nulo.',
      },
    },
  },
},

{
  hooks: {
    beforeCreate: (ProcesoReferenciaPedidoModel) => {
      ProcesoReferenciaPedidoModel.cantPendiente = ProcesoReferenciaPedidoModel.cantTotal;
    }
  }
}

);

// ProcesoReferenciaPedidoModel.belongsTo(ReferenciaEnPedido, { foreignKey: 'referencia' });
ProcesoReferenciaPedidoModel.hasMany(ColorProcesoReferenciaPedido, { foreignKey: 'proceso' });
ProcesoReferenciaPedidoModel.hasMany(AsignarProcesoEmpleado, { foreignKey: 'pedidoprocesoId' });


module.exports = ProcesoReferenciaPedidoModel;
