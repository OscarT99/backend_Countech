const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const Proveedor = require('../proveedorModel/proveedorModel')
const detalleCompra = require('./detalleCompraModel')

const CompraModel = sequelize.define('Compra',{
    proveedor:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    fechaCompra:{
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
    numeroFactura: {
        type: DataTypes.STRING,
        allowNull: false,        
    },    
    totalBruto:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    iva:{
        type: DataTypes.DECIMAL(10, 2),        
    },
    totalNeto:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
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
    estadoPago: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['Pago', 'Pendiente']],
        },
    },
    observaciones: {
        type: DataTypes.STRING,
    },
    estadoCompra: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    motivoDeAnulacion:{
        type: DataTypes.STRING,
    }
})

CompraModel.belongsTo(Proveedor,{foreignKey:'proveedor'})
CompraModel.hasMany(detalleCompra,{foreignKey: 'compra'})

module.exports = CompraModel;