'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Districts extends Model {
        static associate(models) {
            Districts.belongsTo(models.Provinces, { foreignKey: 'province_code' });
            Districts.belongsTo(models.Administrative_Units, { foreignKey: 'administrative_unit_id' });
            Districts.hasMany(models.Wards, { foreignKey: 'district_code' });
        }
    }
    Districts.init({
        code: DataTypes.STRING(20),
        name: DataTypes.STRING,
        name_en: DataTypes.STRING,
        full_name: DataTypes.STRING,
        full_name_en: DataTypes.STRING,
        code_name: DataTypes.STRING,
        province_code: DataTypes.STRING(20),
        administrative_unit_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Districts',
    });
    return Districts;
};