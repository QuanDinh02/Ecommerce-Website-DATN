const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const customerSearchRecord = async (session_id, content) => {
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

                await db.SearchSession.create({
                    sessionID: session_id,
                    content: content,
                    searchTime: new Date()
                });

                return {
                    EC: 0,
                    DT: '',
                    EM: 'Lưu lịch sử tìm kiếm của khách hàng !'
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
    customerSearchRecord
}