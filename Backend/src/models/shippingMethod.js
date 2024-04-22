'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    static associate(models) {
        ShippingMethod.belongsTo(models.ShippingUnit, { foreignKey: 'unitID' });
        ShippingMethod.hasMany(models.Order, { foreignKey: 'shipMethod' });
    }
  }
  ShippingMethod.init({
    nameMethod: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT("medium"),
    unitID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'ShippingMethod',
  });
  return ShippingMethod;
};