'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StaffRole extends Model {
        static associate(models) {
            StaffRole.hasMany(models.Staff, { foreignKey: 'Role' });
        }
    }
    StaffRole.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'StaffRole',
    });
    return StaffRole;
};