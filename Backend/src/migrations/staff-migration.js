'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FullName: {
        type: Sequelize.STRING
      },
      BirthDate: {
        type: Sequelize.STRING
      },
      Role: {
        type: Sequelize.INTEGER
      },
      Gender: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.TEXT
      },
      Email: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Staffs');
  }
};