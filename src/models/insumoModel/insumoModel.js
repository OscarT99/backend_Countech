const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');

const InsumoModel = sequelize.define('Insumo',{    
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+/,
        },
    },
    cantidad:{
        type: DataTypes.INTEGER,
        default:0
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

module.exports = InsumoModel