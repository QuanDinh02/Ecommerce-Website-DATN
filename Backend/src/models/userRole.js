'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
        UserRole.hasMany(models.User, { foreignKey: 'role' });
    }
  }
  UserRole.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};