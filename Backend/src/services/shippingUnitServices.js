const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getShippingUnitList = async () => {
    try {

        let shipping_unit_list = await db.ShippingUnit.findAll({
            raw: true,
            attributes: ['id', 'nameUnit'],
        });

        return {
            EC: 0,
            DT: shipping_unit_list,
            EM: 'Shipping unit list'
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
    getShippingUnitList
}