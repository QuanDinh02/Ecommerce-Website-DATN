'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionProduct extends Model {
    static associate(models) {
        PromotionProduct.belongsTo(models.Product, { foreignKey: 'productID' });
        PromotionProduct.belongsTo(models.Promotion, { foreignKey: 'promotionID' });
    }
  }
  PromotionProduct.init({
    productID: DataTypes.BIGINT,
    promotionID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'PromotionProduct',
  });
  return PromotionProduct;
};