'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SubCategory', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            title: {
                type: Sequelize.STRING
            },
            shopID: {
                type: Sequelize.BIGINT
            },
            categoryID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SubCategory');
    }
};