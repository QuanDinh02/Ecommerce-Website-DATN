'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StaffAccount extends Model {
    static associate(models) {
      StaffAccount.belongsTo(models.Staff, { foreignKey: 'staffID' });
    }
  }
  StaffAccount.init({
    staffID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StaffAccount',
  });
  return StaffAccount;
};