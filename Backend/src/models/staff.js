'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Staff extends Model {
        static associate(models) {
            Staff.hasOne(models.StaffAccount, { foreignKey: 'staffID' });
            Staff.belongsTo(models.StaffRole, { foreignKey: 'Role' });
        }
    }
    Staff.init({
        FullName: DataTypes.STRING,
        BirthDate: DataTypes.STRING,
        Role: DataTypes.INTEGER,
        Gender: DataTypes.STRING,
        Address: DataTypes.TEXT,
        Email: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Staff',
    });
    return Staff;
};