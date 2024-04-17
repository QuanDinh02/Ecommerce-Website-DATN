'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PolicyTypes', [
      {
        //id: 1,
        Name: 'Gói cơ bản',
      },
      {
        //id: 2,
        Name: 'Gói toàn diện',
      },
      {
        //id: 3,
        Name: 'Gói cao cấp',
      },
      {
        //id: 4,
        Name: 'Gói tùy chỉnh',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PolicyTypes', null, {});
  }
};