'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StaffRoles', [
      {
        // id: 1,
        name: 'Quản lý',
        description: 'Toàn quyền quyết định tất cả',
      },
      {
        // id: 2,
        name: 'Nhân viên',
        description: 'Thực hiện các nhiệm vụ được giao',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaffRoles', null, {});
  }
};
