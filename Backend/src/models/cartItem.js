'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
        CartItem.belongsTo(models.Customer, { foreignKey: 'customerID' });
        CartItem.belongsTo(models.ProductType, { foreignKey: 'productTypeID' });
    }
  }
  CartItem.init({
    quantity: DataTypes.INTEGER,
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    customerID: DataTypes.BIGINT,
    productTypeID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};