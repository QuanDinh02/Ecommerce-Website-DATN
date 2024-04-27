'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Image', [
            {
                //id: 1
                productID: 1,
                productTypeID: null,
                productReviewID: null,
                image: null
            },
            {
                //id: 2
                productID: 2,
                productTypeID: null,
                productReviewID: null,
                image: null
            },
            //----------------------------------------------------------
            {
                //id: 3
                productID: 3,
                productTypeID: null,
                productReviewID: null,
                image: null
            },
            {
                //id: 4
                productID: 4,
                productTypeID: null,
                productReviewID: null,
                image: null
            },
            //----------------------------------------------------------
            {
                //id: 5
                productID: 5,
                productTypeID: null,
                productReviewID: null,
                image: null
            },
            {
                //id: 6
                productID: 6,
                productTypeID: null,
                productReviewID: null,
                image: null
            },
            //----------------------------------------------------------
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Image', null, {});
    }
};
