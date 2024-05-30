const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
const { hashPassword } = require("../services/LoginRegisterService.js");

const updateUserPassword = async (new_password, user_id) => {
    try {

        let hash_password = hashPassword(new_password);

        db.User.update({
            password: hash_password
        }, {
            where: {
                id: +user_id
            }
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Change user password successfully !'
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
    updateUserPassword
}