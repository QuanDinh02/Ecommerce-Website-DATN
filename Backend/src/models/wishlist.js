'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      WishList.belongsTo(models.Product, { foreignKey: 'productID' });
      WishList.belongsTo(models.Customer, { foreignKey: 'customerID' });
    }
  }
  WishList.init({
    productID: DataTypes.BIGINT,
    customerID: DataTypes.BIGINT,
    addedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'WishList',
  });
  return WishList;
};