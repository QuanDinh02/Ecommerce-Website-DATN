'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CustomerAccounts', [
      {
        //id: 1,
        customerID: 1,
        username: '0901231234',
        password: '0901231234'
      },
      {
        //id: 2,
        customerID: 2,
        username: '0902342344',
        password: '0902342344'
      },
      {
        //id: 3,
        customerID: 3,
        username: '0831654456',
        password: '0831654456'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CustomerAccounts', null, {});
  }
};