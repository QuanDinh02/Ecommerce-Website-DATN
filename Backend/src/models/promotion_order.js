'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionOrder extends Model {
    static associate(models) {
        PromotionOrder.belongsTo(models.Order, { foreignKey: 'orderID' });
        PromotionOrder.belongsTo(models.Promotion, { foreignKey: 'promotionID' });
    }
  }
  PromotionOrder.init({
    orderID: DataTypes.BIGINT,
    promotionID: DataTypes.BIGINT,
    discount: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PromotionOrder',
  });
  return PromotionOrder;
};