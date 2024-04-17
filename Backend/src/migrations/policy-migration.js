'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Policys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Age: {
        type: Sequelize.STRING
      },
      Internal_Treatment_Price: {
        type: Sequelize.INTEGER
      },
      External_Treatment_Price: {
        type: Sequelize.INTEGER
      },
      Dentist_Treatment_Price: {
        type: Sequelize.INTEGER
      },
      Annual_Treatment_Price: {
        type: Sequelize.INTEGER
      },
      PolicyTypeID: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Policys');
  }
};