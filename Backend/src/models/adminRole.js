'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminRole extends Model {
    static associate(models) {
        AdminRole.hasMany(models.Admin, { foreignKey: 'admin_role' });
    }
  }
  AdminRole.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminRole',
  });
  return AdminRole;
};