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
                currentPrice: 145000,
                price: 240000,
                productID: 1,
            },
            {
                //id: 2
                type: "",
                typeName: "",
                quantity: 100,
                size: "L (65kg-72kg)",
                color: "ĐEN",
                currentPrice: 145000,
                price: 240000,
                productID: 1,
            },
            {
                //id: 3
                type: "",
                typeName: "",
                quantity: 100,
                size: "XL (75kg trở lên)",
                color: "ĐEN",
                currentPrice: 145000,
                price: 240000,
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
                price: 230000,
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
                price: 230000,
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
                price: 230000,
                productID: 1,
            },
            {
                //id: 7
                type: "",
                typeName: "",
                quantity: 50,
                size: "M (50kg-65kg)",
                color: "VÀNG",
                currentPrice: 125000,
                price: 220000,
                productID: 1,
            },
            {
                //id: 8
                type: "",
                typeName: "",
                quantity: 100,
                size: "L (65kg-72kg)",
                color: "VÀNG",
                currentPrice: 125000,
                price: 220000,
                productID: 1,
            },
            {
                //id: 9
                type: "",
                typeName: "",
                quantity: 0,
                size: "XL (75kg trở lên)",
                color: "VÀNG",
                currentPrice: 125000,
                price: 220000,
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
                currentPrice: 149000,
                price: 278000,
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
                currentPrice: 172000,
                price: 240000,
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
                currentPrice: 158000,
                price: 240000,
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
                currentPrice: 5000,
                price: 10000,
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
                currentPrice: 116620,
                price: 119000,
                productID: 6,
            },
            //----------------------------------------------------------
            {
                //id: 15
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 19000,
                price: 20000,
                productID: 7,
            },
            //----------------------------------------------------------
            {
                //id: 16
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 379000,
                price: 450000,
                productID: 8,
            },
            //----------------------------------------------------------
            {
                //id: 17
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 155000,
                price: 240000,
                productID: 9,
            },
            //----------------------------------------------------------
            {
                //id: 18
                type: "",
                typeName: "",
                quantity: 0,
                size: "",
                color: "",
                currentPrice: 179000,
                price: 300000,
                productID: 10,
            },
            //----------------------------------------------------------
            {
                //id: 18
                type: "",
                typeName: "",
                quantity: 100,
                size: "",
                color: "",
                currentPrice: 4900,
                price: 17000,
                productID: 11,
            },
            //----------------------------------------------------------
            {
                //id: 18
                type: "",
                typeName: "",
                quantity: 0,
                size: "",
                color: "",
                currentPrice: 10000,
                price: 15000,
                productID: 12,
            },
            //----------------------------------------------------------
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ProductType', null, {});
    }
};
