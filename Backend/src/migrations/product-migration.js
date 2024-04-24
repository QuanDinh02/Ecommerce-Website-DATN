'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING
            },
            summary: {
                type: Sequelize.TEXT("medium")
            },
            shop_id: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Product');
    }
};