'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    static associate(models) {
        //ProductReview.belongsTo(models.Product, { foreignKey: 'productID' });
        ProductReview.belongsTo(models.Customer, { foreignKey: 'customerID' });
        ProductReview.belongsTo(models.Seller, { foreignKey: 'shopID' });
        ProductReview.hasMany(models.Image, { foreignKey: 'productReviewID' });
        ProductReview.hasOne(models.OrderProductReview, { foreignKey: 'productReviewID' });
    }
  }
  ProductReview.init({
    comment: DataTypes.TEXT("medium"),
    rating: DataTypes.TINYINT,
    productID: DataTypes.BIGINT,
    parentID: DataTypes.BIGINT,
    customerID: DataTypes.BIGINT,
    shopID: DataTypes.BIGINT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ProductReview',
  });
  return ProductReview;
};