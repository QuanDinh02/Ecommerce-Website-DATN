'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ShippingMethod', [
            {
                //id: 1
                nameMethod: "Giao hàng Tiêu Chuẩn",
                price: 0,
                description: "Giao hàng tiêu chuẩn",
                status: 1
            },
            {
                //id: 2
                nameMethod: "Giao hàng Tiết Kiệm",
                price: 15000,
                description: "Giao Hàng Tiết Kiệm",
                status: 1
            },
            {
                //id: 3
                nameMethod: "Giao hàng Hỏa Tốc",
                price: 50000,
                description: "Giao hàng Hỏa Tốc",
                status: 1
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ShippingMethod', null, {});
    }
};