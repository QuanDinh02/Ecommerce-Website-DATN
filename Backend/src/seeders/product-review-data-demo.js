'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ProductReview', [
            {
                //id: 1
                comment: "Sản phẩm chất lượng, giao hàng nhanh",
                rating: 5,
                productTypeID: 1,
                parentID: null,
                customerID: 1,
                shopID: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                //id: 2
                comment: "Giao hàng nhanh chóng đóng gói kĩ càng",
                rating: 5,
                productTypeID: 2,
                parentID: null,
                customerID: 2,
                shopID: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                //id: 3
                comment: "Hàng nhận đẹp đúng như mô tả, đóng gói cẩn thận. Giao hàng nhanh",
                rating: 5,
                productTypeID: 1,
                parentID: null,
                customerID: 3,
                shopID: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductReview', null, {});
    }
};
