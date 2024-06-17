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
                name: "Đã xác nhận"
            },
            {
                //id: 3
                name: "Đang đóng gói"
            },
            {
                //id: 4
                name: "Lấy hàng"
            },
            {
                //id: 5
                name: "Lấy hàng thất bại"
            },
            {
                //id: 6
                name: "Đang giao hàng"
            },
            {
                //id: 7
                name: "Giao hàng thành công"
            },
            {
                //id: 8
                name: "Giao hàng thất bại"
            },
            {
                //id: 9
                name: "Đang trả hàng về cho nhà bán"
            },
            {
                //id: 10
                name: "Đã hủy(Chưa giao hàng)"
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ShipmentStatus', null, {});
    }
};