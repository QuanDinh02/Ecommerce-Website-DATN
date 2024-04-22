'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserActivity extends Model {
    static associate(models) {
        UserActivity.belongsTo(models.Customer, { foreignKey: 'customerID' });
        UserActivity.belongsTo(models.Product, { foreignKey: 'productID' });
    }
  }
  UserActivity.init({
    act: DataTypes.TINYINT,
    content_search: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    dwell_time: DataTypes.DATE,
    customerID: DataTypes.BIGINT,
    productID: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'UserActivity',
  });
  return UserActivity;
};