'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductType, { foreignKey: 'productID' });
      Product.hasMany(models.WishList, { foreignKey: 'productID' });
      Product.hasMany(models.Image, { foreignKey: 'productID' });
      Product.hasMany(models.ProductCategory, { foreignKey: 'productID' });
      Product.hasMany(models.Tag, { foreignKey: 'productID' });
      Product.hasMany(models.UserActivity, { foreignKey: 'productID' });
      Product.hasMany(models.PromotionProduct, { foreignKey: 'productID' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    typeName: DataTypes.STRING,
    summary: DataTypes.TEXT("medium"),
    shop_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};