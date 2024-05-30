'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerVertification extends Model {
    static associate(models) {
        
    }
  }
  CustomerVertification.init({
    email: DataTypes.STRING,
    code: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CustomerVertification',
  });
  return CustomerVertification;
};