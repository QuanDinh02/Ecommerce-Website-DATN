'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.ShippingMethod, { foreignKey: 'shipMethod' });
      Order.belongsTo(models.Customer, { foreignKey: 'customerID' });
      Order.hasMany(models.Transaction, { foreignKey: 'orderID' });
      Order.hasMany(models.Shipment, { foreignKey: 'orderID' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderID' });
      Order.hasMany(models.PromotionOrder, { foreignKey: 'orderID' });
    }
  }
  Order.init({
    status: DataTypes.SMALLINT,
    orderDate: DataTypes.DATE,
    shipFee: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    shipMethod: DataTypes.BIGINT,
    address: DataTypes.STRING,
    customerID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};