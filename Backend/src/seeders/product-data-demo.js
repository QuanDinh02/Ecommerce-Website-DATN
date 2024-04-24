'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Product', [
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
            //----------------------------------------------------------
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
            //----------------------------------------------------------
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
            //----------------------------------------------------------
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Product', null, {});
    }
};
