'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Employee', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            fullName: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.TINYINT
            },
            email: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.DATE
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            startsAt: {
                type: Sequelize.DATE
            },
            endsAt: {
                type: Sequelize.DATE
            },
            active: {
                type: Sequelize.TINYINT
            },
            departmentID: {
                type: Sequelize.INTEGER
            },
            userID: {
                type: Sequelize.BIGINT
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Employee');
    }
};