'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductRating extends Model {
    static associate(models) {
      ProductRating.belongsTo(models.Product, { foreignKey: 'productID' });
    }
  }
  ProductRating.init({
    productID: DataTypes.BIGINT,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ProductRating',
  });
  return ProductRating;
};