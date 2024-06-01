'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Provinces extends Model {
        static associate(models) {
            Provinces.belongsTo(models.Administrative_Regions, { foreignKey: 'administrative_region_id' });
            Provinces.belongsTo(models.Administrative_Units, { foreignKey: 'administrative_unit_id' });
            Provinces.hasMany(models.Districts, { foreignKey: 'province_code' });
        }
    }
    Provinces.init({
        code: DataTypes.STRING(20),
        name: DataTypes.STRING,
        name_en: DataTypes.STRING,
        full_name: DataTypes.STRING,
        full_name_en: DataTypes.STRING,
        code_name: DataTypes.STRING,
        administrative_unit_id: DataTypes.INTEGER,
        administrative_region_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Provinces',
    });
    return Provinces;
};