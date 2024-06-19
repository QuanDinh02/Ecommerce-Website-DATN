'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewCustomer extends Model {
    static associate(models) {
        NewCustomer.belongsTo(models.Customer, { foreignKey: 'customerID' });
    }
  }
  NewCustomer.init({
    customerID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewCustomer',
  });
  return NewCustomer;
};