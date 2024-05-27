'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SessionActivity extends Model {
    static associate(models) {
        SessionActivity.belongsTo(models.Session, { foreignKey: 'sessionID' });
    }
  }
  SessionActivity.init({
    sessionID: DataTypes.BIGINT,
    productID: DataTypes.BIGINT,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SessionActivity',
  });
  return SessionActivity;
};