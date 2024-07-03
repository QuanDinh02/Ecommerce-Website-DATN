'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductRating', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            productID: {
                type: Sequelize.BIGINT
            },
            rating: {
                type: Sequelize.FLOAT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductRating');
    }
};