'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasOne(models.ProductType, { foreignKey: 'productID' });
      Product.hasMany(models.WishList, { foreignKey: 'productID' });
      Product.hasMany(models.Image, { foreignKey: 'productID' });
      
      Product.hasMany(models.ProductSubCategory, { foreignKey: 'productID' });
      
      Product.hasMany(models.Tag, { foreignKey: 'productID' });
      Product.hasMany(models.UserActivity, { foreignKey: 'productID' });
      Product.hasMany(models.PromotionProduct, { foreignKey: 'productID' });
      //Product.hasMany(models.ProductPreview, { foreignKey: 'productID' });
      Product.belongsTo(models.Seller, { foreignKey: 'shop_id' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    summary: DataTypes.TEXT("medium"),
    shop_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};