'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.EmployeeRole, { foreignKey: 'role' });
      Employee.belongsTo(models.Department, { foreignKey: 'departmentID' });
      Employee.belongsTo(models.User, { foreignKey: 'userID' });
    }
  }
  Employee.init({
    fullName: DataTypes.STRING,
    role: DataTypes.TINYINT,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    dob: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    startsAt: DataTypes.DATE,
    endsAt: DataTypes.DATE,
    active: DataTypes.TINYINT,
    departmentID: DataTypes.INTEGER,
    userID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};