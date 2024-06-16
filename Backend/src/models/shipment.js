'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    static associate(models) {
      Shipment.belongsTo(models.Order, { foreignKey: 'orderID' });
      Shipment.belongsTo(models.ShipmentStatus, { foreignKey: 'status' });
    }
  }
  Shipment.init({
    status: DataTypes.TINYINT,
    updatedDate: DataTypes.DATE,
    orderID: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Shipment',
  });
  return Shipment;
};