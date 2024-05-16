'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductReview', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            comment: {
                type: Sequelize.TEXT("medium")
            },
            rating: {
                type: Sequelize.TINYINT
            },
            productID: {
                type: Sequelize.BIGINT
            },
            parentID: {
                type: Sequelize.BIGINT
            },
            customerID: {
                type: Sequelize.BIGINT
            },
            shopID: {
                type: Sequelize.BIGINT
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductReview');
    }
};