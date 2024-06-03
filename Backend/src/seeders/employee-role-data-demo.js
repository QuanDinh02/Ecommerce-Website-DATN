'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EmployeeRole', [
      {
        //id: 1
        name: "Admin"
      },
      {
        //id: 2
        name: "Quản lý Phòng ban"
      },
      {
        //id: 3
        name: "Nhân viên"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmployeeRole', null, {});
  }
};
