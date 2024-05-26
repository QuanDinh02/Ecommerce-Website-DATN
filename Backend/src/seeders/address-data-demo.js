'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Address', [
            {
                //id: 1
                fullname: "Lê Thiên Bảo",
                mobile: '0901234456',
                street: '20',
                ward: '4',
                district: 'Tân Bình',
                province: 'TP.HCM',
                country: 'Việt Nam',
                type: 1,
                customerID: 1,
            },
            {
                //id: 2
                fullname: "Lê Thiên Bảo",
                mobile: '0901234456',
                street: '12/2',
                ward: '6',
                district: 'Gò Vấp',
                province: 'TP.HCM',
                country: 'Việt Nam',
                type: 0,
                customerID: 1,
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Address', null, {});
    }
};
