'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('CartItem', [
            {
                //id: 1
                quantity: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                customerID: 1,
                productTypeID: 1,
            },
            {
                //id: 2
                quantity: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                customerID: 1,
                productTypeID: 10,
            },

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('CartItem', null, {});
    }
};
