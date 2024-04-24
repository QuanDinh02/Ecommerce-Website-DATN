'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Category', [
            {
                //id: 1
                title: "Thời Trang Nam",
            },
            {
                //id: 2
                title: "Điện Thoại & Phụ Kiện",
            },
            {
                //id: 3
                title: "Thiết Bị Điện Tử",
            },
            {
                //id: 4
                title: "Máy Tính & Laptop",
            },
            {
                //id: 5
                title: "Nhà Sách",
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Category', null, {});
    }
};
