'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
        Registration.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
        Registration.hasMany(models.RegistrationDetail, { foreignKey: 'RegistrationID' });
        Registration.hasOne(models.Invoice, { foreignKey: 'RegistraionID' });
    }
  }
  Registration.init({
    CustomerID: DataTypes.INTEGER,
    RegisterDate: DataTypes.DATE,
    Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};