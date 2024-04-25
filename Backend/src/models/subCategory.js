'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    static associate(models) {
      SubCategory.belongsTo(models.Seller, { foreignKey: 'shopID' });
      SubCategory.belongsTo(models.Category, { foreignKey: 'categoryID' });
      SubCategory.belongsToMany(models.Product, { through: 'ProductSubCategory', foreignKey: 'subCategoryID' });
    }
  }
  SubCategory.init({
    title: DataTypes.STRING,
    shopID: DataTypes.BIGINT,
    categoryID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};