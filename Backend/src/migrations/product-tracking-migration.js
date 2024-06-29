'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductTracking', {
            productID: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.BIGINT,
            },
            view: {
                type: Sequelize.BIGINT
            },
            recommend: {
                type: Sequelize.BIGINT
            },
            recommend_view: {
                type: Sequelize.BIGINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductTracking');
    }
};