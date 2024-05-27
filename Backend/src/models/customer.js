'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
        Customer.belongsTo(models.User, { foreignKey: 'userID' });
        Customer.hasMany(models.Address, { foreignKey: 'customerID' });
        Customer.hasMany(models.WishList, { foreignKey: 'customerID' });
        Customer.hasMany(models.ProductReview, { foreignKey: 'customerID' });
        Customer.hasMany(models.CartItem, { foreignKey: 'customerID' });
        Customer.hasMany(models.UserActivity, { foreignKey: 'customerID' });
        Customer.hasMany(models.Order, { foreignKey: 'customerID' });
        Customer.hasMany(models.Session, { foreignKey: 'customerID' });
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING(10),
    email: DataTypes.STRING,
    gender: DataTypes.TINYINT(1),
    birth: DataTypes.DATE,
    userID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};