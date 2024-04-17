'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RegistrationDetails', [
      {
        //id: 1
        PolicyID: 1,
        RegistrationID: 1,
      },
      {
        //id: 2
        PolicyID: 2,
        RegistrationID: 1,
      },
      {
        //id: 3
        PolicyID: 5,
        RegistrationID: 1,
      },
      {
        //id: 4
        PolicyID: 10,
        RegistrationID: 2,
      },
      {
        //id: 5
        PolicyID: 3,
        RegistrationID: 2,
      },
      {
        //id: 6
        PolicyID: 2,
        RegistrationID: 2,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RegistrationDetails', null, {});
  }
};
