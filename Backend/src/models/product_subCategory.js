'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubCategory extends Model {
    static associate(models) {
        ProductSubCategory.belongsTo(models.Product, { foreignKey: 'productID' });
        ProductSubCategory.belongsTo(models.SubCategory, { foreignKey: 'subCategoryID' });
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