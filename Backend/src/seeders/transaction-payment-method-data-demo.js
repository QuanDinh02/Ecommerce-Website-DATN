'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('TransactionPaymentMethod', [
            {
                //id: 1
                method_name: "Thanh toán tiền mặt khi nhận hàng",
                status: 1
            },
            {
                //id: 2
                method_name: "Thanh toán bằng thẻ quốc tế Visa, Master, JCB",
                status: 0
            },
            {
                //id: 3
                method_name: "Thẻ ATM nội địa/ Internet Banking",
                status: 0
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('TransactionPaymentMethod', null, {});
    }
};