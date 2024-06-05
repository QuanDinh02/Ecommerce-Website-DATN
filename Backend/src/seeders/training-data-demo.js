'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('TrainingData', [
            {
                //id: 1
                customerID: 1,
                activePredict: 0,
                activePredict3Session: 0,
                lastTrainingTime: null,
            },
            {
                //id: 2
                customerID: 2,
                activePredict: 0,
                activePredict3Session: 0,
                lastTrainingTime: null,
            },
            {
                //id: 3
                customerID: 3,
                activePredict: 0,
                activePredict3Session: 0,
                lastTrainingTime: null,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('TrainingData', null, {});
    }
};
