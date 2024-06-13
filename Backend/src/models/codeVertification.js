'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CodeVertification extends Model {
    static associate(models) {
        
    }
  }
  CodeVertification.init({
    email: DataTypes.STRING,
    code: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CodeVertification',
  });
  return CodeVertification;
};