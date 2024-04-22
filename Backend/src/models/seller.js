'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    static associate(models) {
        Seller.belongsTo(models.User, { foreignKey: 'userID' });
        Seller.hasMany(models.ProductReview, { foreignKey: 'shopID' });
        Seller.hasMany(models.Category, { foreignKey: 'shopID' });
    }
  }
  Seller.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING(10),
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    intro: DataTypes.TEXT("medium"),
    userID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};