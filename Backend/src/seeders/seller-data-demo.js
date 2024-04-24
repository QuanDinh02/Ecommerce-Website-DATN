'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Seller', [
            {
                //id: 1
                name: "Nguyễn Minh Thanh",
                shopName: "OvalShop",
                mobile: "0728884440",
                email: "nguyenminhthanh@gmail.com",
                address: "123 Le Van Sy Quan 3, TPHCM",
                intro: "OvalShop bán các loại mặt hàng và có hơn 300 chi nhánh trên toàn quốc",
                userID: 3
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Seller', null, {});
    }
};
