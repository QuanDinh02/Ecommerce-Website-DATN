'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TrainingData extends Model {
        static associate(models) {
            TrainingData.belongsTo(models.Customer, { foreignKey: 'customerID' });
        }
    }
    TrainingData.init({
        customerID: DataTypes.BIGINT,
        activePredict: DataTypes.TINYINT,
        activePredict3Session: DataTypes.TINYINT,
        lastTrainingTime: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'TrainingData',
    });
    return TrainingData;
};