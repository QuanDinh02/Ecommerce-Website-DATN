'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryRecommendProduct extends Model {
    static associate(models) {
      HistoryRecommendProduct.belongsTo(models.Customer, { foreignKey: 'customerID' });
      HistoryRecommendProduct.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  HistoryRecommendProduct.init({
    product_id: DataTypes.BIGINT,
    customerID: DataTypes.BIGINT,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'HistoryRecommendProduct',
  });
  return HistoryRecommendProduct;
};