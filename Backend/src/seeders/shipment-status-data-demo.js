'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ShipmentStatus', [
            {
                //id: 1
                name: "Chờ xác nhận"
            },
            {
                //id: 2
                name: "Đang đóng gói"
            },
            {
                //id: 3
                name: "Lấy hàng"
            },
            {
                //id: 4
                name: "Lấy hàng thất bại"
            },
            {
                //id: 5
                name: "Đang giao hàng"
            },
            {
                //id: 6
                name: "Giao hàng thành công"
            },
            {
                //id: 7
                name: "Giao hàng thất bại"
            },
            {
                //id: 8
                name: "Đang trả hàng về cho nhà bán"
            },
            {
                //id: 9
                name: "Đã hủy(Chưa giao hàng)"
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ShipmentStatus', null, {});
    }
};