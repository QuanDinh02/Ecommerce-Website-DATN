'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Address', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            fullname: {
                type: Sequelize.STRING
            },
            mobile: {
                type: Sequelize.STRING(10)
            },
            street: {
                type: Sequelize.STRING
            },
            ward: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            province: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.TINYINT(1)
            },
            customerID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Address');
    }
};