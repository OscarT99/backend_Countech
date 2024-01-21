const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const Cliente = require('../clienteModel/clienteModel');
const ProcesoEnReferenciaEnPedido = require('./procesoReferenciaPedidoModel')

const PedidoModel = sequelize.define('Pedido', {
  cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { 
      notNull: true,
    },
  },  
  ordenTrabajo: {
    type: DataTypes.STRING,
    allowNull: false,    
    validate: {
      is: /^\d{1,10}$/,
    },
  },
  fechaOrdenTrabajo: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: true,
      isDate: true,
    },
  },
  fechaRegistro: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: true,
    },
  },
  fechaEntregaOrden: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notNull: true,
      isDate: true,
    },
  },
  formaPago: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      isIn: [['Contado', 'Crédito']],
    },
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    
  },
  observaciones: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Registrado',
    validate: {
      isIn: [['Registrado', 'En proceso', 'Terminado']],
    },
  },
  estadoPago: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendiente',
    validate: {
      isIn: [['Pago', 'Pendiente']],
    },
  },
  fechaVenta: {
    type: DataTypes.DATEONLY,
  allowNull: true,
  },
  estadoPedido: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  motivoDeAnulacion:{
    type: DataTypes.STRING,
  },


  referencia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]+/,
    },
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  valorUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  
});


PedidoModel.addHook('beforeUpdate', 'updateFechaVenta', (pedidoModel, options) => {
  if (pedidoModel.changed('estado') && pedidoModel.getDataValue('estado') === 'Terminado') {
    pedidoModel.setDataValue('fechaVenta', new Date());
  }
});

PedidoModel.belongsTo(Cliente, { foreignKey: 'cliente' });
PedidoModel.hasMany(ProcesoEnReferenciaEnPedido, { foreignKey: 'pedido' });

module.exports = PedidoModel;
