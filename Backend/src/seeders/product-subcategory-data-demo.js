'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ProductSubCategory', [
            {
                //id: 1
                productID: 1,
                subCategoryID: 1,
            },
            {
                //id: 2
                productID: 2,
                subCategoryID: 1,
            },
            //-------------------------------------
            {
                //id: 3
                productID: 3,
                subCategoryID: 2,
            },
            {
                //id: 4
                productID: 4,
                subCategoryID: 2,
            },
            //-------------------------------------
            {
                //id: 5
                productID: 5,
                subCategoryID: 3,
            },
            {
                //id: 6
                productID: 6,
                subCategoryID: 3,
            },
            //-------------------------------------
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductSubCategory', null, {});
    }
};
