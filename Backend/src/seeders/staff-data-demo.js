'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Staffs', [
      {
        //StaffID: 1,
        FullName: 'Trần Trịnh Trọng',
        BirthDate: '15-05-1990',
        Role: 1,
        Gender: 'Nam',
        Address: '123 Đường ABC, Quận 1, TP.HCM',
        Email: 'trong@email.com',
        PhoneNumber: '123456789',
      },
      {
        //StaffID: 2,
        FullName: 'Hồ Ngọc Hà',
        BirthDate: '12-12-1978',
        Role: 2,
        Gender: 'Nữ',
        Address: '1/42 Đường XYZ, Quận 3, TP.HCM',
        Email: 'ha@email.com',
        PhoneNumber: '123123139',
      },
      {
        //StaffID: 3,
        FullName: 'Nguyễn Văn Toàn',
        BirthDate: '06-02-2000',
        Role: 2,
        Gender: 'Nam',
        Address: '123 Hoàng Diệu, quận Tân Bình, TP.HCM',
        Email: 'toannv@email.com',
        PhoneNumber: '031822456',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Staffs', null, {});
  }
};
