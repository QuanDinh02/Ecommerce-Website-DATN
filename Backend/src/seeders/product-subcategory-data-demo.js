'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ProductSubCategory', [
            //-------------------------------Quần áo----------------------------------
            //---------------------Áo khoác--------------------------
            {
                //id: 1
                productID: 1,
                subCategoryID: 7,
            },
            {
                //id: 2
                productID: 2,
                subCategoryID: 7,
            },
            //---------------------Quần Jeans--------------------------
            {
                //id: 3
                productID: 3,
                subCategoryID: 8,
            },
            {
                //id: 4
                productID: 4,
                subCategoryID: 8,
            },
            //---------------------Kính Mắt Nam--------------------------
            {
                //id: 5
                productID: 5,
                subCategoryID: 9,
            },
            {
                //id: 6
                productID: 6,
                subCategoryID: 9,
            },
            //---------------------Trang Sức Nam--------------------------
            {
                //id: 7
                productID: 7,
                subCategoryID: 10,
            },
            {
                //id: 8
                productID: 8,
                subCategoryID: 10,
            },
            //---------------------Đồ Bộ--------------------------
            {
                //id: 9
                productID: 9,
                subCategoryID: 11,
            },
            {
                //id: 10
                productID: 10,
                subCategoryID: 11,
            },
            //---------------------Vớ/Tất--------------------------
            {
                //id: 11
                productID: 11,
                subCategoryID: 12,
            },
            {
                //id: 12
                productID: 12,
                subCategoryID: 12,
            },
            //-------------------------------------------------------------------------

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductSubCategory', null, {});
    }
};
