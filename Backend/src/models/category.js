'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
        Category.belongsTo(models.Seller, { foreignKey: 'shopID' });
        Category.hasMany(models.ProductCategory, { foreignKey: 'categoryID' });
    }
  }
  Category.init({
    parentID: DataTypes.BIGINT,
    title: DataTypes.STRING,
    shopID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};