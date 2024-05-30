const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getCustomerInfoForOrder = async (customer_id) => {
    try {
        let customerInfo = await db.Customer.findOne({
            raw: true,
            nest: true,
            include: {
                model: db.Address,
                attributes: ['fullname', 'mobile','street','ward','district','province','country'],
                where: {
                    type: {
                        [Op.eq]: 1
                    }
                }
            },
            where: {
                id: {
                    [Op.eq]: +customer_id
                }
            }
        })

        let orderAddressInfo = customerInfo.Addresses;

        return {
            EC: 0,
            DT: orderAddressInfo,
            EM: 'Customer Order Info !'
        }
    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !',
        }
    }
}

const handleCreateNewAccount = async (data) => {
    try {
        let customerInfo = await db.Customer.findOne({
            raw: true,
            nest: true,
            include: {
                model: db.Address,
                attributes: ['fullname', 'mobile','street','ward','district','province','country'],
                where: {
                    type: {
                        [Op.eq]: 1
                    }
                }
            },
            where: {
                id: {
                    [Op.eq]: +customer_id
                }
            }
        })

        let orderAddressInfo = customerInfo.Addresses;

        return {
            EC: 0,
            DT: orderAddressInfo,
            EM: 'Customer Order Info !'
        }
    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !',
        }
    }
}

module.exports = {
    getCustomerInfoForOrder, handleCreateNewAccount
}