const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
const { checkPassword, hashPassword } = require("./LoginRegisterService.js");

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

const getCustomerInfo = async (customer_id) => {
    try {
        let customerInfo = await db.Customer.findOne({
            raw: true,
            attributes: ['id', 'name', 'mobile', 'gender', 'birth', 'email'],
            where: {
                id: {
                    [Op.eq]: +customer_id
                }
            }
        })

        return {
            EC: 0,
            DT: customerInfo,
            EM: 'Customer Info !'
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

const updateCustomerInfo = async (data) => {
    try {
        await db.Customer.update({
            name: data.name,
            mobile: data.mobile,
            gender: data.gender,
            birth: data.birth
        }, {
            where: {
                id: +data.id
            }
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin thành công'
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

const getCustomerAddresses = async (customer_id) => {
    try {

        let addressData = await db.Address.findAll({
            raw: true,
            attributes: ['id', 'fullname', 'mobile', 'street', 'ward', 'district', 'province', 'country', 'type'],
            where: {
                customerID: {
                    [Op.eq]: customer_id
                }
            }
        })

        return {
            EC: 0,
            DT: addressData,
            EM: 'customer addresses !'
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

const updateCustomerDefaultAddress = async (address_id) => {
    try {

        await db.Address.update({
            type: 1
        }, {
            where: {
                id: {
                    [Op.eq]: address_id
                }
            }
        });

        await db.Address.update({
            type: 0
        }, {
            where: {
                id: {
                    [Op.not]: address_id
                }
            }
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Cập nhật địa chỉ mặc định thành công'
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

const changeCustomerPassword = async (data) => {
    try {
        let customerInfo = await db.Customer.findOne({
            raw: true,
            attributes: ['userID'],
            where: {
                id: {
                    [Op.eq]: +data.id
                }
            }
        });

        if (customerInfo) {
            let accountInfo = await db.User.findOne({
                raw: true,
                attributes: ['id', 'password'],
                where: {
                    id: {
                        [Op.eq]: +customerInfo.userID
                    }
                }
            });
            if (checkPassword(data.old, accountInfo.password)) {
                db.User.update({
                    password: hashPassword(data.new)
                }, {
                    where: {
                        id: {
                            [Op.eq]: +accountInfo.id
                        }
                    }
                });
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Thay đổi mật khẩu thành công'
                }
            } else {
                return {
                    EC: 1,
                    DT: '',
                    EM: 'Mật khẩu cũ không đúng'
                }
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
                EC: 1,
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
                EC: 1,
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
    handleOTPVertification, getCustomerInfo, updateCustomerInfo, changeCustomerPassword,
    getCustomerAddresses, updateCustomerDefaultAddress
}