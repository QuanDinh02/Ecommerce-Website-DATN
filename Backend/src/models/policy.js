'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Policy extends Model {
        static associate(models) {
            Policy.belongsTo(models.PolicyType, { foreignKey: 'PolicyTypeID' });
            Policy.hasMany(models.RegistrationDetail, { foreignKey: 'PolicyID' });
        }
    }
    Policy.init({
        Age: DataTypes.STRING,
        Internal_Treament_Price: DataTypes.INTEGER,
        External_Treament_Price: DataTypes.INTEGER,
        Dentist_Treament_Price: DataTypes.INTEGER,
        Annual_Treament_Price: DataTypes.INTEGER,
        PolicyTypeID: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Policy',
    });
    return Policy;
};