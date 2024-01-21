const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');


const CategoriaInsumoModel = sequelize.define('CategoriaInsumo',{
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
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

module.exports = CategoriaInsumoModel