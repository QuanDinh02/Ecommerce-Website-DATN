'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProductReview extends Model {
    static associate(models) {
        OrderProductReview.belongsTo(models.Order, { foreignKey: 'orderID' });
        OrderProductReview.belongsTo(models.ProductReview, { foreignKey: 'productReviewID' });
    }
  }
  OrderProductReview.init({
    orderID: DataTypes.BIGINT,
    productReviewID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'OrderProductReview',
  });
  return OrderProductReview;
};