'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PromotionOrder', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            orderID: {
                type: Sequelize.BIGINT
            },
            promotionID: {
                type: Sequelize.BIGINT
            },
            discount: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PromotionOrder');
    }
};