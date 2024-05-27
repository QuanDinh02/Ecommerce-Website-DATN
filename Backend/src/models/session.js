'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      Session.belongsTo(models.Customer, { foreignKey: 'customerID' });
      Session.hasOne(models.SearchSession, { foreignKey: 'sessionID' });
      Session.hasOne(models.SessionActivity, { foreignKey: 'sessionID' });
    }
  }
  Session.init({
    createdAt: DataTypes.DATE,
    expiredAt: DataTypes.DATE,
    customerID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};