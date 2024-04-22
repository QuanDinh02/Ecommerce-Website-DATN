'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserActivity', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            act: {
                type: Sequelize.TINYINT
            },
            content_search: {
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE
            },
            dwell_time: {
                type: Sequelize.DATE
            },
            customerID: {
                type: Sequelize.BIGINT
            },
            productID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserActivity');
    }
};