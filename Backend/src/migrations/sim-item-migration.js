'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SimItem', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            item_id: {
                type: Sequelize.BIGINT
            },
            item_rec: {
                type: Sequelize.BIGINT
            },
            score: {
                type: Sequelize.FLOAT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SimItem');
    }
};