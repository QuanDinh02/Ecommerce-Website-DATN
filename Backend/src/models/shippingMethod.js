'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    static associate(models) {
        ShippingMethod.hasMany(models.Order, { foreignKey: 'shipMethod' });
    }
  }
  ShippingMethod.init({
    nameMethod: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT("medium"),
    status: DataTypes.TINYINT(1)
  }, {
    sequelize,
    modelName: 'ShippingMethod',
  });
  return ShippingMethod;
};