'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
        ProductCategory.belongsTo(models.Product, { foreignKey: 'productID' });
        ProductCategory.belongsTo(models.Category, { foreignKey: 'categoryID' });
    }
  }
  ProductCategory.init({
    productID: DataTypes.BIGINT,
    categoryID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};