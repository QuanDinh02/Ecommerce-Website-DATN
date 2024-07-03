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
      Product.hasMany(models.CartItem, { foreignKey: 'productID' });
      Product.hasMany(models.OrderItem, { foreignKey: 'productID' });
      Product.hasMany(models.RecommendProduct, { foreignKey: 'product_id' });
      //Product.hasMany(models.ProductPreview, { foreignKey: 'productID' });
      Product.belongsTo(models.Seller, { foreignKey: 'shop_id' });

      Product.hasMany(models.SimItem, { foreignKey: 'item_id' });
      Product.hasMany(models.SimItem, { foreignKey: 'item_rec' });
      Product.hasOne(models.ProductTracking, { foreignKey: 'productID' });
      Product.hasOne(models.ProductRating, { foreignKey: 'productID' });
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