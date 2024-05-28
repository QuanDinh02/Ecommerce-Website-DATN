const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const createRecommendProducts = async (data) => {
    try {

        await db.RecommendProduct.bulkCreate(data);

        return {
            EC: 0,
            DT: "",
            EM: 'Save recommend products !'
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
    createRecommendProducts
}