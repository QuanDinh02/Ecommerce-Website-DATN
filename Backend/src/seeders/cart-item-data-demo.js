'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('CartItem', [
 
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('CartItem', null, {});
    }
};
