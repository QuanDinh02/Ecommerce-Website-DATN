'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Product, { foreignKey: 'productID' });
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderID' });
      OrderItem.belongsTo(models.Promotion, { foreignKey: 'promotionID' });
    }
  }
  OrderItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    productID: DataTypes.BIGINT,
    orderID: DataTypes.BIGINT,
    promotionID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};