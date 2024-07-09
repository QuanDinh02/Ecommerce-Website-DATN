const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
const { checkPassword, hashPassword } = require("./LoginRegisterService.js");

import dotenv from 'dotenv';
dotenv.config();

const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

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

        const getObjectParams = {
            Bucket: bucketName,
            Key: `customer_${customer_id}.jpeg`
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return {
            EC: 0,
            DT: {
                ...customerInfo, image: url
            },
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

const createNewCustomerAddress = async (data) => {
    try {
        let { type, customerID } = data;

        if (type === 1) {
            let result = await db.Address.update({
                type: 0
            }, {
                where: {
                    customerID: {
                        [Op.eq]: customerID
                    }
                }
            });

            if (result) {
                await db.Address.create(data);

                return {
                    EC: 0,
                    DT: '',
                    EM: 'Tạo mới địa chỉ thành công'
                }
            }

        } else {
            await db.Address.create(data);

            return {
                EC: 0,
                DT: '',
                EM: 'Tạo mới địa chỉ thành công'
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

const updateCustomerAddress = async (data) => {
    try {
        let { id: address_id } = data;

        let update_data = data;
        delete update_data.id;

        let result = await db.Address.update(update_data, {
            where: {
                id: {
                    [Op.eq]: address_id
                }
            }
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Cập nhật địa chỉ thành công'
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

const updateCustomerInfo = async (data, image_file) => {
    try {
        let { id } = data;

        if (image_file && image_file !== "") {
            let imageName = `customer_${id}.jpeg`;

            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: image_file.buffer,
                ContentType: image_file.mimetype
            }

            const command = new PutObjectCommand(params);

            await s3.send(command);

            await db.Customer.update({
                name: data.name,
                mobile: data.mobile,
                gender: data.gender,
                birth: data.birth
            }, {
                where: {
                    id: +id
                }
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Cập nhật thông tin thành công'
            }
        } else {
            await db.Customer.update({
                name: data.name,
                mobile: data.mobile,
                gender: data.gender,
                birth: data.birth
            }, {
                where: {
                    id: +id
                }
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Cập nhật thông tin thành công'
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

const deleteCustomerAddress = async (address_id) => {
    try {
        await db.Address.destroy({
            where: {
                id: {
                    [Op.eq]: +address_id
                }
            },
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Xóa địa chỉ thành công'
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

const updateCustomerDefaultAddress = async (address_id, customer_id) => {
    try {

        await db.Address.update({
            type: 0
        }, {
            where: {
                [Op.and]: [
                    {
                        id: {
                            [Op.not]: address_id
                        }
                    },
                    {
                        customerID: {
                            [Op.eq]: customer_id
                        }
                    }
                ]

            }
        });

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

        let existCode = await db.CodeVertification.findAll({
            raw: true,
            where: {
                email: {
                    [Op.eq]: email,
                },
            }
        });

        if (existCode.length > 0) {
            await db.CodeVertification.destroy({
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                }
            });

            let result = await db.CodeVertification.create({
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
            await db.CodeVertification.destroy({
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                }
            });

            let result = await db.CodeVertification.create({
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

        let result = await db.CodeVertification.findOne({
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

                await db.CodeVertification.destroy({
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

const handleCheckNewUser = async (customer_id) => {
    try {
        let customer_info = await db.NewCustomer.findOne({
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            }
        })

        if (customer_info) {
            return {
                EC: 0,
                DT: {
                    new_customer: true
                },
                EM: 'Khách hàng mới'
            }
        }

        return {
            EC: 0,
            DT: {
                new_customer: false
            },
            EM: 'Khách hàng cũ !'
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

const removeNewCustomer = async (customer_id) => {
    try {
        await db.NewCustomer.destroy({
            where: {
                customerID: {
                    [Op.eq]: +customer_id
                }
            },
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Change into old customer'
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

const trainingNewCustomer = async (session_id, data, customer_id) => {
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

                await Promise.all(data.map(async item => {

                    await db.SearchSession.create({
                        sessionID: session_id,
                        content: item.title,
                        searchTime: new Date()
                    });

                }));

                await db.NewCustomer.destroy({
                    where: {
                        customerID: {
                            [Op.eq]: +customer_id
                        }
                    },
                });

                return {
                    EC: 0,
                    DT: '',
                    EM: 'Training new customer'
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
    handleCreateVertificationCode,
    handleOTPVertification, getCustomerInfo, updateCustomerInfo, changeCustomerPassword,
    getCustomerAddresses, updateCustomerDefaultAddress,
    createNewCustomerAddress, deleteCustomerAddress, updateCustomerAddress, handleCheckNewUser,
    removeNewCustomer, trainingNewCustomer
}