'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionPaymentMethod extends Model {
    static associate(models) {
      TransactionPaymentMethod.hasMany(models.Transaction, { foreignKey: 'payment' });
    }
  }
  TransactionPaymentMethod.init({
    method_name: DataTypes.STRING,
    status: DataTypes.TINYINT(1)
  }, {
    sequelize,
    modelName: 'TransactionPaymentMethod',
  });
  return TransactionPaymentMethod;
};