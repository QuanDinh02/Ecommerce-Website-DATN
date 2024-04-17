'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Invoices', [
      {
        //id: 1
        RegistraionID: 1,
        Date: new Date(),
        Staff: "Trần Trịnh Trọng",
        Total: 2500000 + 10400000 + 6553000
      },
      {
        //id: 2
        RegistraionID: 2,
        Date: new Date(),
        Staff: "Hồ Ngọc Hà",
        Total: 10400000 + 21500000 + 1225800
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Invoices', null, {});
  }
};
