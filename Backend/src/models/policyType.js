'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PolicyType extends Model {
        static associate(models) {
            PolicyType.hasMany(models.Policy, { foreignKey: 'PolicyTypeID' });
        }
    }
    PolicyType.init({
        Name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PolicyType',
    });
    return PolicyType;
};