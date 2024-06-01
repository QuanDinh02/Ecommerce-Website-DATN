'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Wards extends Model {
        static associate(models) {
            Wards.belongsTo(models.Districts, { foreignKey: 'district_code' });
            Wards.belongsTo(models.Administrative_Units, { foreignKey: 'administrative_unit_id' });
        }
    }
    Wards.init({
        code: DataTypes.STRING(20),
        name: DataTypes.STRING,
        name_en: DataTypes.STRING,
        full_name: DataTypes.STRING,
        full_name_en: DataTypes.STRING,
        code_name: DataTypes.STRING,
        district_code: DataTypes.STRING(20),
        administrative_unit_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Wards',
    });
    return Wards;
};