'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Districts', {
            code: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.STRING(20)
            },
            name: {
                type: Sequelize.STRING
            },
            name_en: {
                type: Sequelize.STRING
            },
            full_name: {
                type: Sequelize.STRING
            },
            full_name_en: {
                type: Sequelize.STRING
            },
            code_name: {
                type: Sequelize.STRING
            },
            province_code: {
                type: Sequelize.STRING(20)
            },
            administrative_unit_id: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Districts');
    }
};