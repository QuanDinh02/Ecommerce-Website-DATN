'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Promotion', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            reducedCost: {
                type: Sequelize.INTEGER
            },
            reducedTypeCost: {
                type: Sequelize.SMALLINT
            },
            minCost: {
                type: Sequelize.INTEGER
            },
            maxCost: {
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            usedQuantity: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            startDate: {
                type: Sequelize.DATE
            },
            endDate: {
                type: Sequelize.DATE
            },
            typeDiscount: {
                type: Sequelize.SMALLINT
            },
            createdByWeb: {
                type: Sequelize.BOOLEAN
            },
            shopID: {
                type: Sequelize.BIGINT
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Promotion');
    }
};