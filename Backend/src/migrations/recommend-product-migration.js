'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RecommendProduct', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            product_id: {
                type: Sequelize.BIGINT
            },
            predict_rating: {
                type: Sequelize.FLOAT(11,10)
            },
            customerID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('RecommendProduct');
    }
};