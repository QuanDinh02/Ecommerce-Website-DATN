const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const createSessionActivity = async (session_id, product_id, activity_type) => {
    try {
        if (session_id) {

            let session = await db.Session.findOne({
                where: {
                    id: {
                        [Op.eq]: session_id
                    }
                }
            });

            if (session) {

                await db.SessionActivity.create({
                    sessionID: session_id,
                    productID: product_id,
                    type: activity_type
                });

                return {
                    EC: 0,
                    DT: '',
                    EM: 'Lưu activity của người dùng !'
                }
            } else {
                return {
                    EC: -1,
                    DT: '',
                    EM: 'Sesion không hợp lệ !'
                }
            }
        } else {
            return {
                EC: -2,
                DT: '',
                EM: 'Sesion không hợp lệ !'
            }
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
    createSessionActivity
}