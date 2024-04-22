'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transaction', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            payment: {
                type: Sequelize.SMALLINT
            },
            transaction_id: {
                type: Sequelize.STRING
            },
            amount: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            orderID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Transaction');
    }
};