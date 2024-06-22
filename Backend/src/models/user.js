'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(models.Seller, { foreignKey: 'userID' });
        User.hasMany(models.Employee, { foreignKey: 'userID' });
        User.hasMany(models.Customer, { foreignKey: 'userID' });
        User.hasMany(models.ShippingUnit, { foreignKey: 'userID' });
        User.hasMany(models.PromotionUser, { foreignKey: 'userID' });
        User.belongsTo(models.UserRole, { foreignKey: 'role' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.TINYINT,
    registeredAt: DataTypes.DATE,
    lastLogin: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};