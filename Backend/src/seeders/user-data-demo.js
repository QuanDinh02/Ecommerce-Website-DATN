'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('User', [
            {
                //id: 1
                username: "admin",
                password: "admin",
                role: 1,
                registeredAt: new Date(),
                lastLogin: null,
            },
            {
                //id: 2
                username: "staff",
                password: "staff",
                role: 1,
                registeredAt: new Date(),
                lastLogin: null,
            },
            {
                //id: 3
                username: "seller",
                password: "seller",
                role: 2,
                registeredAt: new Date(),
                lastLogin: null,
            },
            {
                //id: 4
                username: "customer1",
                password: "customer1",
                role: 3,
                registeredAt: new Date(),
                lastLogin: null,
            },
            {
                //id: 5
                username: "customer2",
                password: "customer2",
                role: 3,
                registeredAt: new Date(),
                lastLogin: null,
            },
            {
                //id: 6
                username: "customer3",
                password: "customer3",
                role: 3,
                registeredAt: new Date(),
                lastLogin: null,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('User', null, {});
    }
};
