'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.TINYINT
            },
            registeredAt: {
                type: Sequelize.DATE
            },
            refreshToken: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.TINYINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('User');
    }
};