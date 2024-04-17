'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StaffAccounts', [
      {
        //id: 1,
        staffID: 1,
        username: 'admin',
        password: 'admin'
      },
      {
        //id: 2,
        staffID: 2,
        username: 'staff1',
        password: 'staff1'
      },
      {
        //id: 3,
        staffID: 3,
        username: 'staff3',
        password: 'staff3'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaffAccounts', null, {});
  }
};