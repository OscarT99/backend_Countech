const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const ColorProcesoReferenciaPedido = require('./colorProcesoReferenciaPedidoModel')
const AsignarProceso =  require('../produccionModel/asignarProcedimiento') 

const ProcesoReferenciaPedidoModel = sequelize.define('ProcesoEnReferenciaEnPedido', {
  pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  proceso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoDeMaquina: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Fileteadora', 'Plana', 'Presilladora', 'Recubridora','Manual']],
    },
  },
  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  cantidadAsignada: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  cantidadHecha: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  cantidadPendiente: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },

  // PENDIENTE Registrar la cantidad asignada, terminada, pendiente y estado

});

// ProcesoReferenciaPedidoModel.belongsTo(ReferenciaEnPedido, { foreignKey: 'referencia' });
ProcesoReferenciaPedidoModel.hasMany(ColorProcesoReferenciaPedido, { foreignKey: 'proceso' });
ProcesoReferenciaPedidoModel.hasMany(AsignarProceso, { foreignKey: 'proceso' });


module.exports = ProcesoReferenciaPedidoModel;
