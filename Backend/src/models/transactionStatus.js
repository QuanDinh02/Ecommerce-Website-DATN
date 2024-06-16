'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionStatus extends Model {
    static associate(models) {
        TransactionStatus.hasMany(models.Transaction, { foreignKey: 'status' });
        TransactionStatus.belongsTo(models.TransactionPaymentMethod, { foreignKey: 'payment' });
    }
  }
  TransactionStatus.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TransactionStatus',
  });
  return TransactionStatus;
};