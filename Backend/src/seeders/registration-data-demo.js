'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Registrations', [
      {
        //id: 1
        CustomerID: 1,
        RegisterDate: new Date(),
        Status: "Đã duyệt"
      },
      {
        //id: 2
        CustomerID: 2,
        RegisterDate: new Date(),
        Status: "Đã duyệt"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Registrations', null, {});
  }
};
