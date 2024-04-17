'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Invoices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            RegistraionID: {
                type: Sequelize.INTEGER
            },
            Date: {
                type: Sequelize.DATE
            },
            Staff: {
                type: Sequelize.STRING
            },
            Total: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Invoices');
    }
};