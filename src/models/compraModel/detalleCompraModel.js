const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const Insumo = require('../insumoModel/insumoModel')

const DetalleCompraModel = sequelize.define('DetalleEnCompra',{
    compra:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
    insumo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    valorUnitario:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    impuestoIva:{
        type: DataTypes.INTEGER,        
    },
    valorTotal:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    }
})

DetalleCompraModel.belongsTo(Insumo,{foreignKey:'insumo'})

module.exports = DetalleCompraModel;
