'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    static associate(models) {
        Seller.belongsTo(models.User, { foreignKey: 'userID' });
        Seller.hasMany(models.ProductReview, { foreignKey: 'shopID' });
        Seller.hasMany(models.SubCategory, { foreignKey: 'shopID' });
        Seller.hasMany(models.Product, { foreignKey: 'shop_id' });
        Seller.hasMany(models.Order, { foreignKey: 'sellerID' });
    }
  }
  Seller.init({
    name: DataTypes.STRING,
    shopName: DataTypes.STRING,
    mobile: DataTypes.STRING(10),
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    intro: DataTypes.TEXT("medium"),
    gender: DataTypes.TINYINT,
    birth: DataTypes.DATE,
    userID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};