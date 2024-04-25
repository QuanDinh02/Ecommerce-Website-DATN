'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('SubCategory', [
            //-------------------------------------
            {
                //id: 1
                title: "Áo Khoác",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 2
                title: "Quần Jeans",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 3
                title: "Kính Mắt Nam",
                shopID: 0,
                categoryID: 3,
            },
            //-------------------------------------
            {
                //id: 4
                title: "Điện thoại",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 5
                title: "Máy tính bảng",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 6
                title: "Pin Dự Phòng",
                shopID: 0,
                categoryID: 10,
            },
            //-------------------------------------
            {
                //id: 7
                title: "Thiết bị đeo thông minh",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 8
                title: "Loa",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 9
                title: "Headphones",
                shopID: 0,
                categoryID: 2,
            },
            //-------------------------------------
            {
                //id: 10
                title: "Màn Hình",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 11
                title: "Thiết Bị Lưu Trữ",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 12
                title: "Laptop",
                shopID: 0,
                categoryID: 7,
            },
            //-------------------------------------
            {
                //id: 13
                title: "Sách Tiếng Việt",
                shopID: 0,
                categoryID: 11,
            },
            {
                //id: 14
                title: "Sách Ngoại Văn",
                shopID: 0,
                categoryID: 11,
            },
            {
                //id: 15
                title: "Dụng cụ học sinh & văn phòng",
                shopID: 0,
                categoryID: 11,
            },
            //-------------------------------------
            {
                //id: 16
                title: "Tất Cả Sản Phẩm",
                shopID: 1,
                categoryID: null,
            },
            {
                //id: 17
                title: "Bán chạy",
                shopID: 1,
                categoryID: null,
            },
            {
                //id: 18
                title: "Giảm giá",
                shopID: 1,
                categoryID: null,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('SubCategory', null, {});
    }
};
