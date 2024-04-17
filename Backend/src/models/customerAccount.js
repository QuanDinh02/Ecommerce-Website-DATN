'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerAccount extends Model {
    static associate(models) {
      CustomerAccount.belongsTo(models.Customer, { foreignKey: 'customerID' });
    }
  }
  CustomerAccount.init({
    customerID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerAccount',
  });
  return CustomerAccount;
};