const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../database/config');
const Compra = require('../compraModel/compraModel');

const AbonoCompra = sequelize.define('AbonoCompra', {
    compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaAbono: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valorAbono: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  });
  
  // foreign key
  AbonoCompra.belongsTo(Compra, { foreignKey: 'compra', as: 'Compra' });
  

module.exports = AbonoCompra;  