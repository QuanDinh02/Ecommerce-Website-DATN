'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ShipmentStatus extends Model {
        static associate(models) {
            ShipmentStatus.belongsTo(models.Order, { foreignKey: 'orderID' });
            ShipmentStatus.hasMany(models.Shipment, { foreignKey: 'status' });
        }
    }
    ShipmentStatus.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ShipmentStatus',
    });
    return ShipmentStatus;
};