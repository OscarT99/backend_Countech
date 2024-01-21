const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const CategoriaInsumo = require('./categoriaInsumoModel');

const InsumoModel = sequelize.define('Insumo',{
    categoria:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
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

InsumoModel.belongsTo(CategoriaInsumo,{foreignKey:'categoria'})

module.exports = InsumoModel