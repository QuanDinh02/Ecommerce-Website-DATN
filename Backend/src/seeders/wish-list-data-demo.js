'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('WishList', [
            {
                //id: 1
                productID: 11,
                customerID: 1,
                addedAt: new Date(),
            },
            {
                //id: 2
                productID: 12,
                customerID: 1,
                addedAt: new Date(),
            },

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('WishList', null, {});
    }
};
