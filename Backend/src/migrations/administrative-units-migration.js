'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Administrative_Units', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            full_name: {
                type: Sequelize.STRING
            },
            full_name_en: {
                type: Sequelize.STRING
            },
            short_name: {
                type: Sequelize.STRING
            },
            short_name_en: {
                type: Sequelize.STRING
            },
            code_name: {
                type: Sequelize.STRING
            },
            code_name_en: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Administrative_Units');
    }
};