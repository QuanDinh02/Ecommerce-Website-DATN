const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getAllProvinces = async () => {
    try {

        let result = await db.Provinces.findAll({
            raw: true,
            attributes: ['code', 'name']
        })

        return {
            EC: 0,
            DT: result,
            EM: 'Get all provinces !'
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

const getDistrictsByProvince = async (province_code) => {
    try {

        let result = await db.Districts.findAll({
            raw: true,
            attributes: ['code', 'full_name'],
            where: {
                province_code: {
                    [Op.eq]: province_code
                }
            }
        })

        return {
            EC: 0,
            DT: result,
            EM: 'Get all districts by province !'
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

const getWardsByDistrict = async (district_code) => {
    try {

        let result = await db.Wards.findAll({
            raw: true,
            attributes: ['code', 'full_name'],
            where: {
                district_code: {
                    [Op.eq]: district_code
                }
            }
        })

        return {
            EC: 0,
            DT: result,
            EM: 'Get all wards by district !'
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
    getAllProvinces, getDistrictsByProvince, getWardsByDistrict
}