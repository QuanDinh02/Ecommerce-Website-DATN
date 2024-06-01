'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Administrative_Regions extends Model {
        static associate(models) {
            Administrative_Regions.hasMany(models.Provinces, { foreignKey: 'administrative_region_id' });
        }
    }
    Administrative_Regions.init({
        name: DataTypes.STRING,
        name_en: DataTypes.STRING,
        code_name: DataTypes.STRING,
        code_name_en: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Administrative_Regions',
    });
    return Administrative_Regions;
};