'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingUnit extends Model {
    static associate(models) {
        ShippingUnit.hasMany(models.ShippingMethod, { foreignKey: 'unitID' });
    }
  }
  ShippingUnit.init({
    nameUnit: DataTypes.STRING,
    address: DataTypes.STRING,
    mobile: DataTypes.STRING(10),
    description: DataTypes.TEXT("medium"),
  }, {
    sequelize,
    modelName: 'ShippingUnit',
  });
  return ShippingUnit;
};