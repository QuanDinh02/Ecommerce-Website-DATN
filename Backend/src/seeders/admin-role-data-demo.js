'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AdminRole', [
      {
        //id: 1
        name: "Quản lý"
      },
      {
        //id: 2
        name: "Nhân viên"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AdminRole', null, {});
  }
};
