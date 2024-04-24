'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Admin', [
            {
                //id: 1
                name: "Nguyen Văn A",
                admin_role: 1,
                email: "nguyenvana@gmail.com",
                phone: "0728884440",
                userID: 1,
            },
            {
                //id: 2
                name: "Nguyen Văn B",
                admin_role: 2,
                email: "nguyenvanb@gmail.com",
                phone: "0923232110",
                userID: 2,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Admin', null, {});
    }
};
