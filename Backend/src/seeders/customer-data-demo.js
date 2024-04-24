'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Customer', [
            {
                //id: 1
                name: "Lê Thiên Bảo",
                mobile: "0728884440",
                email: "lethienbao@gmail.com",
                gender: 1,
                birth: new Date(),
                userID: 4,
            },
            {
                //id: 2
                name: "Võ Hoàng Anh",
                mobile: "0928882441",
                email: "vohoanganh@gmail.com",
                gender: 0,
                birth: new Date(),
                userID: 5,
            },
            {
                //id: 3
                name: "Dương Minh Nhật",
                mobile: "0828881240",
                email: "duongminhnhat@gmail.com",
                gender: 1,
                birth: new Date(),
                userID: 6,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Customer', null, {});
    }
};
