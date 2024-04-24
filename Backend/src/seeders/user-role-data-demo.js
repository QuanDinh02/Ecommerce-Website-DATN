'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserRole', [
      {
        //id: 1
        name: "admin"
      },
      {
        //id: 2
        name: "seller"
      },
      {
        //id: 3
        name: "customer"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRole', null, {});
  }
};
