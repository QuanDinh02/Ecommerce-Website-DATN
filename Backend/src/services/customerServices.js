const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

import dotenv from 'dotenv';
dotenv.config();

const getCustomerInfoForOrder = async (customer_id) => {
    try {
        let customerInfo = await db.Customer.findOne({
            raw: true,
            nest: true,
            include: {
                model: db.Address,
                attributes: ['fullname', 'mobile', 'street', 'ward', 'district', 'province', 'country'],
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

const handleCreateVertificationCode = async (data) => {
    try {
        let { code, email } = data;

        let existCode = await db.CustomerVertification.findAll({
            raw: true,
            where: {
                email: {
                    [Op.eq]: email,
                },
            }
        });

        if (existCode.length > 0) {
            await db.CustomerVertification.destroy({
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                }
            });

            let result = await db.CustomerVertification.create({
                email: email,
                code: code,
                createdAt: new Date()
            })

            if (result) {
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Create new OTP code successfully !'
                }
            }

            return {
                EC: 0,
                DT: '',
                EM: 'Create new OTP code failed !'
            }
        } else {
            await db.CustomerVertification.destroy({
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                }
            });

            let result = await db.CustomerVertification.create({
                email: email,
                code: code,
                createdAt: new Date()
            })

            if (result) {
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Create new OTP code successfully !'
                }
            }

            return {
                EC: 0,
                DT: '',
                EM: 'Create new OTP code failed !'
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

const handleOTPVertification = async (data) => {
    try {
        let { otp, email } = data;

        let result = await db.CustomerVertification.findOne({
            raw: true,
            attributes: ['id', 'code', 'createdAT'],
            where: {
                email: {
                    [Op.eq]: email,
                },
            }
        });

        if (result) {

            let otpTimeStart = result.createdAT.getTime(); //miliseconds
            let date = new Date();
            let otpTimeNow = date.getTime(); //miliseconds

            let time_span = otpTimeNow - otpTimeStart; // otp valid: time_span < 600000 (milisecond) (10 minute) | otp invalid: time_span > 600000 (milisecond) (10 minute)

            if (result.code === otp && time_span < process.env.OTP_TIME_DURATION) {

                await db.CustomerVertification.destroy({
                    where: {
                        email: {
                            [Op.eq]: email,
                        },
                    }
                });

                return {
                    EC: 0,
                    DT: "",
                    EM: 'Mã OTP hợp lệ !'
                }
            }
            return {
                EC: 1,
                DT: "",
                EM: 'Mã OTP không hợp lệ !'
            }
        }

        return {
            EC: 1,
            DT: "",
            EM: 'Mã OTP không hợp lệ !'
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
    getCustomerInfoForOrder, handleCreateVertificationCode,
    handleOTPVertification
}