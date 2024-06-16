'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('TransactionStatus', [
            {
                //id: 1
                name: "Đang chờ"
            },
            {
                //id: 2
                name: "Thành công"
            },
            {
                //id: 3
                name: "Thất bại"
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('TransactionStatus', null, {});
    }
};