'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubCategory extends Model {
    static associate(models) {

    }
  }
  ProductSubCategory.init({
    productID: DataTypes.BIGINT,
    subCategoryID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'ProductSubCategory',
  });
  return ProductSubCategory;
};