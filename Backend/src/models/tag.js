'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
        Tag.hasMany(models.ProductTag, { foreignKey: 'tagID' });
    }
  }
  Tag.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};