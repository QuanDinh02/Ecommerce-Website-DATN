'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Customers', [
      {
        name: 'Nguyen Van A',
        age: 44,
        gender: 'Nam',
        address: '123 Hoàng Văn Thụ',
        email: 'nguyenvana@gmail.com',
        phone: '0901231234'
      },
      {
        name: 'Nguyen Van B',
        age: 54,
        gender: 'Nam',
        address: '234 Hoàng Văn Thụ',
        email: 'nguyenvanb@gmail.com',
        phone: '0902342344'
      },{
        name: 'Nguyen Thi C',
        age: 32,
        gender: 'Nữ',
        address: '1/12 Hoàng Văn Thụ',
        email: 'nguyenthic@gmail.com',
        phone: '0831654456'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
  }
};
