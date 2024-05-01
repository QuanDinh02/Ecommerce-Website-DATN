'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('SubCategory', [
            //---------------------Đồ điện--------------------------
            {
                //id: 1
                title: "Thiết bị đeo thông minh",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 2
                title: "Loa",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 3
                title: "Headphones",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 4
                title: "Tivi",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 5
                title: "Phụ kiện tivi",
                shopID: 0,
                categoryID: 2,
            },
            {
                //id: 6
                title: "Linh phụ kiện",
                shopID: 0,
                categoryID: 2,
            },
            //---------------------Quần áo--------------------------
            {
                //id: 7
                title: "Áo Khoác",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 8
                title: "Quần Jeans",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 9
                title: "Kính Mắt Nam",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 10
                title: "Trang Sức Nam",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 11
                title: "Đồ Bộ",
                shopID: 0,
                categoryID: 3,
            },
            {
                //id: 12
                title: "Vớ/Tất",
                shopID: 0,
                categoryID: 3,
            },
            //---------------------Nhà cửa & Đời sống--------------------------
            {
                //id: 13
                title: "Đồ nội thất",
                shopID: 0,
                categoryID: 4,
            },
            {
                //id: 14
                title: "Đồ dùng phòng tắm",
                shopID: 0,
                categoryID: 4,
            },
            {
                //id: 15
                title: "Trang trí nhà cửa",
                shopID: 0,
                categoryID: 4,
            },
            {
                //id: 16
                title: "Đèn",
                shopID: 0,
                categoryID: 4,
            },
            {
                //id: 17
                title: "Ngoài trờ & Sân vườn",
                shopID: 0,
                categoryID: 4,
            },
            {
                //id: 18
                title: "Vật phẩm thờ cúng",
                shopID: 0,
                categoryID: 4,
            },
            //---------------------Sức khỏe & Sắc đẹp--------------------------
            {
                //id: 19
                title: "Vật tư y tế",
                shopID: 0,
                categoryID: 5,
            },
            {
                //id: 20
                title: "Thực phẩm chức năng",
                shopID: 0,
                categoryID: 5,
            },
            {
                //id: 21
                title: "Dụng cụ massage và trị liệu",
                shopID: 0,
                categoryID: 5,
            },
            {
                //id: 22
                title: "Chăm sóc da mặt",
                shopID: 0,
                categoryID: 5,
            },
            {
                //id: 23
                title: "Trang điểm",
                shopID: 0,
                categoryID: 5,
            },
            {
                //id: 24
                title: "Chăm sóc tóc",
                shopID: 0,
                categoryID: 5,
            },
            //---------------------Phụ kiên & Trang sức--------------------------
            {
                //id: 25
                title: "Nhẫn",
                shopID: 0,
                categoryID: 6,
            },
            {
                //id: 26
                title: "Bông tai",
                shopID: 0,
                categoryID: 6,
            },
            {
                //id: 27
                title: "Dây chuyền",
                shopID: 0,
                categoryID: 6,
            },
            {
                //id: 28
                title: "Vòng tay & Lắc tay",
                shopID: 0,
                categoryID: 6,
            },
            {
                //id: 29
                title: "Lắc chân",
                shopID: 0,
                categoryID: 6,
            },
            {
                //id: 30
                title: "Bộ phụ kiện",
                shopID: 0,
                categoryID: 6,
            },
            //---------------------Máy tính & Laptop--------------------------
            {
                //id: 31
                title: "Máy Tính Bàn",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 32
                title: "Màn Hình",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 33
                title: "Linh Kiện Máy Tính",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 34
                title: "Thiết Bị Lưu Trữ",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 35
                title: "Laptop",
                shopID: 0,
                categoryID: 7,
            },
            {
                //id: 36
                title: "Gaming",
                shopID: 0,
                categoryID: 7,
            },
            //---------------------Bé & Mẹ--------------------------
            {
                //id: 37
                title: "Đồ dùng ăn dặm cho bé",
                shopID: 0,
                categoryID: 8,
            },
            {
                //id: 38
                title: "Đồ dùng phòng ngủ cho bé",
                shopID: 0,
                categoryID: 8,
            },
            {
                //id: 39
                title: "Đồ chơi",
                shopID: 0,
                categoryID: 8,
            },
            {
                //id: 40
                title: "Tã em bé",
                shopID: 0,
                categoryID: 8,
            },
            {
                //id: 41
                title: "Phụ kiện cho mẹ",
                shopID: 0,
                categoryID: 8,
            },
            {
                //id: 42
                title: "Chăm sóc sức khỏe mẹ",
                shopID: 0,
                categoryID: 8,
            },
            //---------------------Thể thao & Du lịch--------------------------
            {
                //id: 43
                title: "Vali",
                shopID: 0,
                categoryID: 9,
            },
            {
                //id: 44
                title: "Túi du lịch",
                shopID: 0,
                categoryID: 9,
            },
            {
                //id: 45
                title: "Phụ kiện du lịch",
                shopID: 0,
                categoryID: 9,
            },
            {
                //id: 46
                title: "Giày thể thao",
                shopID: 0,
                categoryID: 9,
            },
            {
                //id: 47
                title: "Dụng cụ thể thao",
                shopID: 0,
                categoryID: 9,
            },
            {
                //id: 48
                title: "Phụ kiện dã ngoại",
                shopID: 0,
                categoryID: 9,
            },
            //---------------------Điện thoại & Phụ kiện--------------------------
            {
                //id: 49
                title: "Điện thoại",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 50
                title: "Máy tính bảng",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 51
                title: "Pin Dự Phòng",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 52
                title: "Ốp lưng, bao da, Miếng dán điện thoại",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 53
                title: "Đế giữ điện thoại",
                shopID: 0,
                categoryID: 10,
            },
            {
                //id: 54
                title: "Phụ kiện khác",
                shopID: 0,
                categoryID: 10,
            },
            //---------------------Sách--------------------------
            {
                //id: 55
                title: "Sách Tiếng Việt",
                shopID: 0,
                categoryID: 11,
            },
            {
                //id: 56
                title: "Sách Ngoại Văn",
                shopID: 0,
                categoryID: 11,
            },
            {
                ////id: 57
                title: "Dụng cụ học sinh & văn phòng",
                shopID: 0,
                categoryID: 11,
            },
            {
                //id: 58
                title: "Sổ và Giấy các loại",
                shopID: 0,
                categoryID: 11,
            },
            {
                //id: 59
                title: "Màu, Họa Cụ và Đồ Thủ Công",
                shopID: 0,
                categoryID: 11,
            },
            {
                //id: 60
                title: "Gói Quà",
                shopID: 0,
                categoryID: 11,
            },
             //---------------------Danh mục riêng của Shop--------------------------
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
