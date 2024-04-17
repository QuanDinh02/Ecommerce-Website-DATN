'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
        Invoice.belongsTo(models.Registration, { foreignKey: 'RegistraionID' });
    }
  }
  Invoice.init({
    RegistraionID: DataTypes.INTEGER,
    Date: DataTypes.DATE,
    Staff: DataTypes.STRING,
    Total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};