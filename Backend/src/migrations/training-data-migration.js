'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TrainingData', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            customerID: {
                type: Sequelize.BIGINT
            },
            activePredict: {
                type: Sequelize.TINYINT
            },
            activePredict3Session: {
                type: Sequelize.TINYINT
            },
            lastTrainingTime: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('TrainingData');
    }
};