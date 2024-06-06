'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TrainingWebData extends Model {
        static associate(models) {
            TrainingWebData.belongsTo(models.Customer, { foreignKey: 'customerID' });
        }
    }
    TrainingWebData.init({
        customerID: DataTypes.BIGINT,
        activePredict: DataTypes.TINYINT,
        activePredict3Session: DataTypes.TINYINT,
        lastTrainingTime: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'TrainingWebData',
    });
    return TrainingWebData;
};