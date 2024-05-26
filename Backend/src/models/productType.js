'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate(models) {
        ProductType.belongsTo(models.Product, { foreignKey: 'productID' });
        ProductType.hasMany(models.Image, { foreignKey: 'productTypeID' });
    }
  }
  ProductType.init({
    type: DataTypes.STRING,
    typeName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    currentPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    productID: DataTypes.BIGINT,
    sold: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};