'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeRole extends Model {
    static associate(models) {
      EmployeeRole.hasMany(models.Employee, { foreignKey: 'role' });
    }
  }
  EmployeeRole.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'EmployeeRole',
  });
  return EmployeeRole;
};