'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTracking extends Model {
    static associate(models) {
      ProductTracking.belongsTo(models.Product, { foreignKey: 'productID' });
    }
  }
  ProductTracking.init({
    productID: DataTypes.BIGINT,
    view: DataTypes.BIGINT,
    recommend: DataTypes.BIGINT,
    recommend_view: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'ProductTracking',
  });
  return ProductTracking;
};