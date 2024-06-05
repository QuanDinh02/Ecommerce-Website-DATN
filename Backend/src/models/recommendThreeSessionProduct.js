'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecommendThreeSessionProduct extends Model {
    static associate(models) {
      RecommendThreeSessionProduct.belongsTo(models.Customer, { foreignKey: 'customerID' });
      RecommendThreeSessionProduct.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  RecommendThreeSessionProduct.init({
    product_id: DataTypes.BIGINT,
    predict_rating: DataTypes.FLOAT(11,10),
    customerID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'RecommendThreeSessionProduct',
  });
  return RecommendThreeSessionProduct;
};