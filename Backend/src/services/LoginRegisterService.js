import bcrypt from "bcryptjs";
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';
import { createToken } from '../middleware/jwt';
import { v4 as uuidv4 } from 'uuid';

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const checkUserNameExist = async (username) => {
    let check = await db.User.findOne({ where: { username: username } });
    return check ? true : false;
}

const checkPassword = (inputPassword, hashPass) => {
    return bcrypt.compareSync(inputPassword, hashPass);
}

const checkCustomerEmailExist = async (email) => {
    try {
        let check = await db.Customer.findOne({ where: { email: email } });
        if (check) {
            return {
                EC: 0,
                DT: '',
                EM: "Email đã tồn tại"
            }
        } else {
            return {
                EC: 1,
                DT: '',
                EM: "Email không tồn tại"
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
        }
    }
}

const checkEmailWebsiteUserExist = async (email) => {
    try {
        let customerInfo = await db.Customer.findOne({ where: { email: email } });
        let sellerInfo = await db.Seller.findOne({ where: { email: email } });

        if (customerInfo || sellerInfo) {
            return {
                EC: 0,
                DT: '',
                EM: "Email hợp lệ"
            }
        }

        return {
            EC: -1,
            DT: '',
            EM: "Email không hợp lệ"
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
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

const checkSellerEmailExist = async (email) => {
    try {
        let check = await db.Seller.findOne({ where: { email: email } });
        if (check) {
            return {
                EC: 0,
                DT: '',
                EM: "Email đã tồn tại"
            }
        } else {
            return {
                EC: 1,
                DT: '',
                EM: "Email không tồn tại"
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
        }
    }

}

const userRegister = async (userData) => {

    try {
        let { role } = userData;

        let new_birth = new Date();
        new_birth.setUTCFullYear(1900, 0, 1);

        if (role === 3) {
            let checkUsername = await checkUserNameExist(userData.username);

            if (checkUsername) {
                return {
                    EC: 1,
                    DT: '',
                    EM: 'Tên đăng nhập đã tồn tại !',
                }
            } else {
                let hash_password = hashPassword(userData.password);

                let userInfo = await db.User.create({
                    username: userData.username,
                    password: hash_password,
                    role: 3,
                    registeredAt: new Date(),
                    lastLogin: null,
                })

                if (userInfo) {
                    let user_info = userInfo.dataValues;

                    let customerInfo = await db.Customer.create({
                        mobile: userData.phone,
                        email: userData.email,
                        userID: user_info.id,
                        gender: 0,
                        birth: new_birth
                    });

                    if (customerInfo) {
                        let customer_info = customerInfo.dataValues;

                        await db.NewCustomer.create({
                            customerID: customer_info.id
                        });

                        await db.TrainingWebData.create({
                            customerID: customer_info.id,
                            activePredict: 0,
                            activePredict3Session: 0,
                            lastTrainingTime: null,
                        });

                        return {
                            EC: 0,
                            DT: '',
                            EM: 'Đăng ký thành công !',
                        }
                    }
                }
            }
        }

        if (role === 2) {
            let checkUsername = await checkUserNameExist(userData.username);

            if (checkUsername) {
                return {
                    EC: 1,
                    DT: '',
                    EM: 'Tên đăng nhập đã tồn tại !',
                }
            } else {
                let hash_password = hashPassword(userData.password);

                let userInfo = await db.User.create({
                    username: userData.username,
                    password: hash_password,
                    role: 2,
                    registeredAt: new Date(),
                    lastLogin: null,
                })

                if (userInfo) {
                    let user_info = userInfo.dataValues;

                    await db.Seller.create({
                        email: userData.email,
                        userID: user_info.id,
                        gender: 0,
                        birth: new_birth
                    })

                    return {
                        EC: 0,
                        DT: '',
                        EM: 'Đăng ký thành công !',
                    }
                }
            }
        }

        return {
            EC: 1,
            DT: '',
            EM: "Đăng ký không thành công"
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
        }
    }
}

const userLogin = async (userData) => {
    try {
        let checkUsername = await checkUserNameExist(userData.username);

        if (checkUsername) {
            let userExist = await db.User.findOne({
                nest: true,
                raw: true,
                attributes: ['id', 'username', 'password', 'role', 'active'],
                include: {
                    model: db.UserRole,
                    attributes: ['id', 'name'],
                },
                where: {
                    username: {
                        [Op.eq]: userData.username
                    }
                }
            })

            if (userExist) {
                let role = userExist.UserRole.name;
                let user = {
                    id: userExist.id,
                    username: userExist.username,
                    password: userExist.password,
                    role: role
                }

                let active = userExist.active;

                //checkPassword(userData.password, user.password)
                if(active === 0) {
                    return {
                        EC: -1,
                        DT: '',
                        EM: 'Tài khoản đã bị khóa !'

                    }
                }

                if (checkPassword(userData.password, user.password)) {

                    let customer_id = 0;
                    let seller_id = 0;

                    if (role === "customer") {
                        let customerInfo = await db.Customer.findOne({
                            raw: true,
                            attributes: ['id'],
                            where: {
                                userID: {
                                    [Op.eq]: user.id
                                }
                            }
                        })

                        customer_id = customerInfo.id;

                        let date = new Date();

                        let sessionInfo = await db.Session.create({
                            createdAt: date,
                            expiredAt: date,
                            customerID: customer_id
                        });

                        let session_info = sessionInfo.dataValues;

                        let payload = {
                            customer_id: customer_id,
                            username: user.username,
                            role: user.role,
                            session: session_info,
                            isAuthenticated: true
                        }

                        let accessToken = createToken(payload);
                        let refreshToken = uuidv4();

                        await updateUserRefreshToken(user.username, refreshToken);

                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            },
                            EM: 'Login success !'
                        }
                    }

                    if (role === "seller") {
                        let sellerInfo = await db.Seller.findOne({
                            raw: true,
                            attributes: ['id', 'name'],
                            where: {
                                userID: {
                                    [Op.eq]: user.id
                                }
                            }
                        })

                        seller_id = sellerInfo.id;

                        let payload = {
                            seller_id: seller_id,
                            username: user.username,
                            role: user.role,
                            isAuthenticated: true,
                        }

                        let accessToken = createToken(payload);
                        let refreshToken = uuidv4();

                        await updateUserRefreshToken(user.username, refreshToken);

                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            },
                            EM: 'Login success !'
                        }
                    }

                    else {
                        return {
                            EC: 1,
                            DT: '',
                            EM: 'Your username or password is incorrect !'

                        }
                    }
                }

            }
        }

        return {
            EC: 1,
            DT: '',
            EM: 'Your username or password is incorrect !'

        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
        }
    }
}

const userSystemLogin = async (userData) => {
    try {
        let checkUsername = await checkUserNameExist(userData.username);

        if (checkUsername) {
            let userExist = await db.User.findOne({
                nest: true,
                raw: true,
                attributes: ['id', 'username', 'password', 'role'],
                include: {
                    model: db.UserRole,
                    attributes: ['id', 'name'],
                },
                where: {
                    username: {
                        [Op.eq]: userData.username
                    }
                }
            })

            if (userExist) {
                let role = userExist.UserRole.name;
                let user = {
                    id: userExist.id,
                    username: userExist.username,
                    password: userExist.password,
                    role: role
                }

                if (checkPassword(userData.password, user.password)) {

                    let shipping_unit_id = 0;

                    if (role === "shipping_unit") {
                        let shippingUnitInfo = await db.ShippingUnit.findOne({
                            raw: true,
                            attributes: ['id'],
                            where: {
                                userID: {
                                    [Op.eq]: user.id
                                }
                            }
                        })

                        shipping_unit_id = shippingUnitInfo.id;

                        let payload = {
                            shipping_unit_id: shipping_unit_id,
                            username: user.username,
                            role: user.role,
                            isAuthenticated: true
                        }

                        let accessToken = createToken(payload);
                        let refreshToken = uuidv4();

                        await updateUserRefreshToken(user.username, refreshToken);

                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            },
                            EM: 'Login success !'
                        }

                    }

                    else if (role === "admin") {
                        let adminInfo = await db.Employee.findOne({
                            raw: true,
                            attributes: ['id'],
                            where: {
                                userID: {
                                    [Op.eq]: user.id
                                }
                            }
                        })

                        let payload = {
                            asid: adminInfo.id,
                            username: user.username,
                            role: user.role,
                            isAuthenticated: true
                        }

                        let accessToken = createToken(payload);
                        let refreshToken = uuidv4();

                        await updateUserRefreshToken(user.username, refreshToken);

                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            },
                            EM: 'Login success !'
                        }

                    }

                    else {
                        return {
                            EC: 1,
                            DT: '',
                            EM: 'Your username or password is incorrect !'

                        }
                    }
                }
            }
        }

        return {
            EC: 1,
            DT: '',
            EM: 'Your username or password is incorrect !'
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
        }
    }
}

const updateUserRefreshToken = async (username, token) => {
    try {
        await db.User.update({
            refreshToken: token
        }, {
            where: {
                username: username
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const userChangePassword = async (userData) => {

    try {
        let { email, password } = userData;

        //let hash_password = hashPassword(userData.password);

        let customerInfo = await db.Customer.findOne({
            raw: true,
            attributes: ['userID'],
            where: {
                email: email
            }
        });

        let sellerInfo = await db.Seller.findOne({
            raw: true,
            attributes: ['userID'],
            where: {
                email: email
            }
        });

        if (customerInfo) {
            let user_id = customerInfo.userID;

            await db.User.update({
                password: hashPassword(password),
            }, {
                where: {
                    id: {
                        [Op.eq]: +user_id
                    }
                }
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Thay đổi mật khẩu thành công !',
            }
        }

        if (sellerInfo) {
            let user_id = sellerInfo.userID;

            await db.User.update({
                password: hashPassword(password),
            }, {
                where: {
                    id: {
                        [Op.eq]: +user_id
                    }
                }
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Thay đổi mật khẩu thành công !',
            }
        }

        return {
            EC: -1,
            DT: '',
            EM: "Lỗi thay đổi mật khẩu"
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            DT: '',
            EM: "Some things is wrong at service!"
        }
    }
}

module.exports = {
    userRegister, userLogin, hashPassword,
    checkCustomerEmailExist, checkPassword,
    checkSellerEmailExist, userSystemLogin,
    updateUserRefreshToken, checkEmailWebsiteUserExist, handleCreateVertificationCode, handleOTPVertification, userChangePassword
}