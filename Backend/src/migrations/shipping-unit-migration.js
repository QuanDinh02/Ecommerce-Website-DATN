'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ShippingUnit', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            nameUnit: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            mobile: {
                type: Sequelize.STRING(10)
            },
            description: {
                type: Sequelize.TEXT("medium")
            },
            userID: {
                type: Sequelize.BIGINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ShippingUnit');
    }
};