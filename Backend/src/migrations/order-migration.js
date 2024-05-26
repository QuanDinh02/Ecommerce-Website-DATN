'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Order', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            status: {
                type: Sequelize.SMALLINT
            },
            orderDate: {
                type: Sequelize.DATE
            },
            shipFee: {
                type: Sequelize.INTEGER
            },
            totalPrice: {
                type: Sequelize.INTEGER
            },
            shipMethod: {
                type: Sequelize.BIGINT
            },
            address: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT
            },
            customerID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Order');
    }
};