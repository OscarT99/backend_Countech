const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const InsumoModel = require('../insumoModel/insumoModel')

const SalidaInsumoModel = sequelize.define('SalidaInsumo',{
    insumo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipoDeMaquina: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Fileteadora', 'Plana', 'Presilladora', 'Recubridora','Manual']],
        },
    },
}) 

SalidaInsumoModel.belongsTo(InsumoModel,{foreignKey:'insumo'})

module.exports = SalidaInsumoModel;