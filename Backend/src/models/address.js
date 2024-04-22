'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
        Address.belongsTo(models.Customer, { foreignKey: 'customerID' });
    }
  }
  Address.init({
    fullname: DataTypes.STRING,
    mobile: DataTypes.STRING(10),
    street: DataTypes.STRING,
    ward: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    type: DataTypes.TINYINT,
    customerID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};