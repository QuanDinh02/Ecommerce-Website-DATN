'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Image', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            productID: {
                type: Sequelize.BIGINT
            },
            productTypeID: {
                type: Sequelize.BIGINT
            },
            productReviewID: {
                type: Sequelize.BIGINT
            },
            image: {
                type: Sequelize.TEXT("medium")
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Image');
    }
};