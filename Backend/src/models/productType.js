'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    static associate(models) {
        ProductType.belongsTo(models.Product, { foreignKey: 'productID' });
        ProductType.hasMany(models.Image, { foreignKey: 'productTypeID' });
        ProductType.hasMany(models.ProductReview, { foreignKey: 'productTypeID' });
        ProductType.hasMany(models.CartItem, { foreignKey: 'productTypeID' });
        ProductType.hasMany(models.OrderItem, { foreignKey: 'productTypeID' });
    }
  }
  ProductType.init({
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    color: DataTypes.STRING,
    prize: DataTypes.INTEGER,
    productID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};