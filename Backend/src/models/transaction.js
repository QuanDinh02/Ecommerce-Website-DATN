'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Order, { foreignKey: 'orderID' });
      Transaction.belongsTo(models.TransactionPaymentMethod, { foreignKey: 'payment' });
    }
  }
  Transaction.init({
    payment: DataTypes.SMALLINT,
    transaction_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    orderID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};