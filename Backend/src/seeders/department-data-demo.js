'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Department', [
            {
                //id: 1
                name: "Nhân sự",
                description: "",
                email: "nhansu@gmail.com",
                phone: "0728884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 2
                name: "Kế toán",
                description: "",
                email: "ketoan@gmail.com",
                phone: "0828884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 3
                name: "Hành Chính",
                description: "",
                email: "ketoan@gmail.com",
                phone: "0928884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 4
                name: "Chăm sóc Khách hàng",
                description: "",
                email: "cskh@gmail.com",
                phone: "0928884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 5
                name: "Công nghệ thông tin",
                description: "",
                email: "it@gmail.com",
                phone: "0928884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 6
                name: "Marketing",
                email: "marketing@gmail.com",
                description: "",
                phone: "0928884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 7
                name: "Kinh doanh",
                email: "kinhdoanh@gmail.com",
                description: "",
                phone: "0928884440",
                createdAt: new Date(),
                updatedAt: null
            },
            {
                //id: 8
                name: "Vận Chuyển",
                email: "vanchuyen@gmail.com",
                description: "",
                phone: "0928884440",
                createdAt: new Date(),
                updatedAt: null
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Department', null, {});
    }
};
