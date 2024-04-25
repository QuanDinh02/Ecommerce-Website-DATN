'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Category', [
            {
                //id: 1
                title: "Giảm giá HOT",
            },
            {
                //id: 2
                title: "Đồ điện",
            },
            {
                //id: 3
                title: "Quần áo",
            },
            {
                //id: 4
                title: "Nội thất, Vườn & Bếp",
            },
            {
                //id: 5
                title: "Sức khỏe & Sắc đẹp",
            },
            {
                //id: 6
                title: "Trang sức",
            },
            {
                //id: 7
                title: "Máy tính & Công nghệ",
            },
            {
                //id: 8
                title: "Bé & Mẹ",
            },
            {
                //id: 9
                title: "Thể thao",
            },
            {
                //id: 10
                title: "Điện thoại/ Thiết bị",
            },
            {
                //id: 11
                title: "Sách",
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Category', null, {});
    }
};
