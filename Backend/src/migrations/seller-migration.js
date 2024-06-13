'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Seller', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING
            },
            shopName: {
                type: Sequelize.STRING
            },
            mobile: {
                type: Sequelize.STRING(10)
            },
            email: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            intro: {
                type: Sequelize.TEXT("medium")
            },
            gender: {
                type: Sequelize.TINYINT
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
        await queryInterface.dropTable('Seller');
    }
};