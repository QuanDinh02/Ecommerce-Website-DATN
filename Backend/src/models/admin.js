'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
        Admin.belongsTo(models.AdminRole, { foreignKey: 'admin_role' });
        Admin.belongsTo(models.User, { foreignKey: 'userID' });
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    admin_role: DataTypes.TINYINT,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    userID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};