'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ShippingMethod', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            nameMethod: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT("medium")
            },
            unitID: {
                type: Sequelize.BIGINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ShippingMethod');
    }
};