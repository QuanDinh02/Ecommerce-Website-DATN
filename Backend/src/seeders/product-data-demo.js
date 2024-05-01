'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Product', [
            //-------------------------------Quần áo----------------------------------
            //---------------------Áo khoác--------------------------
            {
                //id: 1
                name: "ÁO KHOÁC KAKI JEAN NAM ĐẸP THỜI TRANG MỚI NHẤT 2019",
                summary: "ÁO KHOÁC KAKI JEAN NAM ĐẸP THỜI TRANG MỚI NHẤT 2019",
                shop_id: 1
            },
            {
                //id: 2
                name: "Áo khoác jean nam Vesast form rộng màu đen mẫu mới độc đáo",
                summary: "Áo khoác jean nam Vesast form rộng màu đen mẫu mới độc đáo",
                shop_id: 1
            },
             //---------------------Quần Jeans--------------------------
            {
                //id: 3
                name: "Quần jean nam xanh nhạt",
                summary: "Quần jean nam xanh nhạt",
                shop_id: 1
            },
            {
                //id: 4
                name: "Quần jeans nam đen trơn chất bò cao cấp co dãn 4 chiều cực đẹp",
                summary: "Quần jeans nam đen trơn chất bò cao cấp co dãn 4 chiều cực đẹp",
                shop_id: 1
            },
            //---------------------Kính Mắt Nam--------------------------
            {
                //id: 5
                name: "Kính Râm Chiến Thuật Lái Xe Ban Đêm Cho Nam",
                summary: "Kính Râm Chiến Thuật Lái Xe Ban Đêm Cho Nam",
                shop_id: 1
            },
            {
                //id: 6
                name: "Mắt kính AURORA nam, Mắt kính thời trang phong cách cá tính dành cho nam",
                summary: "Mắt kính AURORA nam, Mắt kính thời trang phong cách cá tính dành cho nam",
                shop_id: 1
            },
            //---------------------Trang Sức Nam--------------------------
            {
                //id: 7
                name: "Nhẫn Nam Họa Tiết Rãnh độc đáo Minco Accessories phong cách màu bạc nhẫn đẹp không gỉ thời trang NT59",
                summary: "Nhẫn Nam Họa Tiết Rãnh độc đáo Minco Accessories phong cách màu bạc nhẫn đẹp không gỉ thời trang NT59",
                shop_id: 1
            },
            {
                //id: 8
                name: "Nhẫn nam bạc thật bản trơn nhám cá tính khắc tên NNA0219 Trang Sức TNJ",
                summary: "Nhẫn nam bạc thật bản trơn nhám cá tính khắc tên NNA0219 Trang Sức TNJ",
                shop_id: 1
            },
            //---------------------Đồ Bộ--------------------------
            {
                //id: 9
                name: "Bộ Quần Áo Thể Thao Nam Mùa Hè CENTINO Vải CVC Cá Sấu Co Dãn Thoáng Mát Mặc Nhà Đi Chơi - C032",
                summary: "Bộ Quần Áo Thể Thao Nam Mùa Hè CENTINO Vải CVC Cá Sấu Co Dãn Thoáng Mát Mặc Nhà Đi Chơi - C032",
                shop_id: 1
            },
            {
                //id: 10
                name: "Bộ Đồ Nam Nữ Unisex Mùa Hè Ngắn Tay Cổ Tròn Họa Tiết Loang Vẩy Sơn Hot Trend Thời Trang Zenkonu QA NAM 104",
                summary: "Bộ Đồ Nam Nữ Unisex Mùa Hè Ngắn Tay Cổ Tròn Họa Tiết Loang Vẩy Sơn Hot Trend Thời Trang Zenkonu QA NAM 104",
                shop_id: 1
            },
            //---------------------Vớ/Tất--------------------------
            {
                //id: 11
                name: "Tất vớ nam nữ chất liệu vải Hàn co giãn 4 chiều màu trơn khử mùi hôi",
                summary: "Tất vớ nam nữ chất liệu vải Hàn co giãn 4 chiều màu trơn khử mùi hôi",
                shop_id: 1
            },
            {
                //id: 12
                name: "Vớ đá banh chống trơn, Tất chống trơn CLB Manchester United, Man city, Real, Barca, Chelsea.",
                summary: "Vớ đá banh chống trơn, Tất chống trơn CLB Manchester United, Man city, Real, Barca, Chelsea.",
                shop_id: 1
            },
            //----------------------------------------------------------
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Product', null, {});
    }
};
