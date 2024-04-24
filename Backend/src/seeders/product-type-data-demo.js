'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ProductType', [
            {
                //id: 1
                type: "",
                typeName: "",
                quantity: 100,
                size: "M (50kg-65kg)",
                color: "ĐEN",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 2
                type: "",
                typeName: "",
                quantity: 100,
                size: "L (65kg-72kg)",
                color: "ĐEN",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 3
                type: "",
                typeName: "",
                quantity: 100,
                size: "XL (75kg trở lên)",
                color: "ĐEN",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 4
                type: "",
                typeName: "",
                quantity: 0,
                size: "M (50kg-65kg)",
                color: "TRẮNG",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 5
                type: "",
                typeName: "",
                quantity: 100,
                size: "L (65kg-72kg)",
                color: "TRẮNG",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 6
                type: "",
                typeName: "",
                quantity: 0,
                size: "XL (75kg trở lên)",
                color: "TRẮNG",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 7
                type: "",
                typeName: "",
                quantity: 50,
                size: "M (50kg-65kg)",
                color: "VÀNG",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 8
                type: "",
                typeName: "",
                quantity: 100,
                size: "L (65kg-72kg)",
                color: "VÀNG",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            {
                //id: 9
                type: "",
                typeName: "",
                quantity: 0,
                size: "XL (75kg trở lên)",
                color: "VÀNG",
                currentPrice: 135000,
                price: 250000,
                productID: 1,
            },
            //----------------------------------------------------------
            {
                //id: 10
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 200000,
                price: 250000,
                productID: 2,
            },
            //----------------------------------------------------------
            {
                //id: 11
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 200000,
                price: 250000,
                productID: 3,
            },
            //----------------------------------------------------------
            {
                //id: 12
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 200000,
                price: 250000,
                productID: 4,
            },
            //----------------------------------------------------------
            {
                //id: 13
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 200000,
                price: 250000,
                productID: 5,
            },
            //----------------------------------------------------------
            {
                //id: 14
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 200000,
                price: 250000,
                productID: 6,
            },
            //----------------------------------------------------------
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductType', null, {});
    }
};
