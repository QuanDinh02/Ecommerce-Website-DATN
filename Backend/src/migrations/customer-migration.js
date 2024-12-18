'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Customer', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING
            },
            mobile: {
                type: Sequelize.STRING(10)
            },
            email: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.TINYINT(1)
            },
            birth: {
                type: Sequelize.DATE
            },
            userID: {
                type: Sequelize.BIGINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Customer');
    }
};