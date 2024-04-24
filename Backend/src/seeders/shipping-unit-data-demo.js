'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ShippingUnit', [
            {
                //id: 1
                nameUnit: "Giao Hàng Nhanh",
                address: "123",
                mobile: "090123456",
                description: "Đơn vị Giao Hàng Nhanh",
            },
            {
                //id: 2
                nameUnit: "Giao Hàng Tiết Kiệm",
                address: "322",
                mobile: "070123856",
                description: "Đơn vị Giao Hàng Tiết Kiệm",
            },
            {
                //id: 3
                nameUnit: "Giao Hàng Vietnam Post",
                address: "322",
                mobile: "070123856",
                description: "Đơn vị Giao Hàng Vietnam Post",
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ShippingUnit', null, {});
    }
};