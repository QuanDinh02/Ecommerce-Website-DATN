'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
        Department.hasMany(models.Employee, { foreignKey: 'departmentID' });
    }
  }
  Department.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT("medium"),
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};