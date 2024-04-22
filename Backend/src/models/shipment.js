'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    static associate(models) {
      Shipment.belongsTo(models.Order, { foreignKey: 'orderID' });
    }
  }
  Shipment.init({
    status: DataTypes.STRING,
    updatedDate: DataTypes.DATE,
    orderID: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Shipment',
  });
  return Shipment;
};