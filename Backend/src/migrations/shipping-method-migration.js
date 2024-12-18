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
            status: {
                type: Sequelize.TINYINT(1)
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ShippingMethod');
    }
};