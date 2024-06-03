'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Employee', [
            {
                //id: 1
                fullName: "Nguyen Văn A",
                role: 1,
                email: "nguyenvana@gmail.com",
                phone: "0728884440",
                address: "",
                dob: null,
                createdAt: new Date(),
                updatedAt: null,
                startsAt: new Date(),
                endsAt: null,
                active: 1,
                departmentID: null,
                userID: 1,
            },
            {
                //id: 2
                fullName: "Dương Chí Diễn",
                role: 3,
                email: "duongcd@gmail.com",
                phone: "0728885467",
                address: "",
                dob: null,
                createdAt: new Date(),
                updatedAt: null,
                startsAt: new Date(),
                endsAt: null,
                active: 1,
                departmentID: 8,
                userID: 2,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Employee', null, {});
    }
};
