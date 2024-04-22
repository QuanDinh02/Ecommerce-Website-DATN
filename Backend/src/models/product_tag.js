'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTag extends Model {
    static associate(models) {
        ProductTag.belongsTo(models.Product, { foreignKey: 'productID' });
        ProductTag.belongsTo(models.Tag, { foreignKey: 'tagID' });
    }
  }
  ProductTag.init({
    productID: DataTypes.BIGINT,
    tagID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'ProductTag',
  });
  return ProductTag;
};