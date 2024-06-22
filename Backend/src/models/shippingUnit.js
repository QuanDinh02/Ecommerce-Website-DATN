'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingUnit extends Model {
    static associate(models) {
      ShippingUnit.hasMany(models.Order, { foreignKey: 'shippingUnit' });
      ShippingUnit.belongsTo(models.User, { foreignKey: 'userID' });
    }
  }
  ShippingUnit.init({
    nameUnit: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING(10),
    description: DataTypes.TEXT("medium"),
    userID: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'ShippingUnit',
  });
  return ShippingUnit;
};