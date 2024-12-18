'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('TransactionPaymentMethod', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.SMALLINT
            },
            method_name: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.TINYINT(1)
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('TransactionPaymentMethod');
    }
};