'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecommendProduct extends Model {
    static associate(models) {
      RecommendProduct.belongsTo(models.Customer, { foreignKey: 'customerID' });
      RecommendProduct.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  RecommendProduct.init({
    product_id: DataTypes.BIGINT,
    predict_rating: DataTypes.FLOAT(11,10),
    customerID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'RecommendProduct',
  });
  return RecommendProduct;
};