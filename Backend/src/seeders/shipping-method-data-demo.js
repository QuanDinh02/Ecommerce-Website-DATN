'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ShippingMethod', [
            {
                //id: 1
                nameMethod: "Nhanh",
                price: 30000,
                description: "Giao Hàng Nhanh của Đơn vị Giao Hàng Nhanh",
                unitID: 1
            },
            {
                //id: 2
                nameMethod: "Tiết Kiệm",
                price: 15000,
                description: "Giao Hàng Tiết Kiệm của Đơn vị Giao Hàng Tiết Kiệm",
                unitID: 2
            },
            {
                //id: 3
                nameMethod: "Hỏa Tốc",
                price: 50000,
                description: "Giao Hàng Nhanh của Đơn vị Giao Hàng Vietnam Post",
                unitID: 3
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ShippingMethod', null, {});
    }
};