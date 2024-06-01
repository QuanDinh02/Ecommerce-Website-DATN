'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Administrative_Units extends Model {
        static associate(models) {
            Administrative_Units.hasMany(models.Provinces, { foreignKey: 'administrative_unit_id' });
            Administrative_Units.hasMany(models.Districts, { foreignKey: 'administrative_unit_id' });
            Administrative_Units.hasMany(models.Wards, { foreignKey: 'administrative_unit_id' });
        }
    }
    Administrative_Units.init({
        full_name: DataTypes.STRING,
        full_name_en: DataTypes.STRING,
        short_name: DataTypes.STRING,
        short_name_en: DataTypes.STRING,
        code_name: DataTypes.STRING,
        code_name_en: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Administrative_Units',
    });
    return Administrative_Units;
};