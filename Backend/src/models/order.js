'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.ShippingMethod, { foreignKey: 'shipMethod' });
      Order.belongsTo(models.Customer, { foreignKey: 'customerID' });
      Order.belongsTo(models.Seller, { foreignKey: 'sellerID' });
      Order.belongsTo(models.ShippingUnit, { foreignKey: 'shippingUnit' });
      Order.hasMany(models.Transaction, { foreignKey: 'orderID' });
      Order.hasMany(models.Shipment, { foreignKey: 'orderID' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderID' });
      Order.hasMany(models.PromotionOrder, { foreignKey: 'orderID' });
    }
  }
  Order.init({
    orderDate: DataTypes.DATE,
    shipFee: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    shipMethod: DataTypes.BIGINT,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.TEXT,
    customerID: DataTypes.BIGINT,
    sellerID: DataTypes.BIGINT,
    shippingUnit: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};