'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
        Category.hasMany(models.SubCategory, { foreignKey: 'categoryID' });
    }
  }
  Category.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};