'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductType', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            type: {
                type: Sequelize.STRING
            },
            typeName: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            size: {
                type: Sequelize.STRING
            },
            color: {
                type: Sequelize.STRING
            },
            currentPrice: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.INTEGER
            },
            productID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductType');
    }
};