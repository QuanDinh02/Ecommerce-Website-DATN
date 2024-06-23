import bcrypt from "bcryptjs";
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';
import { createToken } from '../middleware/jwt';

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
                //checkPassword(userData.password, user.password)
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

                        await db.Session.create({
                            createdAt: date,
                            expiredAt: date,
                            customerID: customer_id
                        });

                        let sessionData = await db.Session.findAll({
                            raw: true,
                            attributes: ['id', 'createdAt'],
                            order: [
                                ['createdAt', 'DESC'],
                            ],
                        })

                        let payload = {
                            customer_id: customer_id,
                            username: user.username,
                            role: user.role,
                            session: sessionData.length > 0 ? sessionData[0] : null,
                            isAuthenticated: true
                        }

                        let accessToken = createToken(payload);

                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken,
                                username: user.username,
                                role: user.role,
                                customer_id: customer_id
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
                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken,
                                username: sellerInfo.name,
                                role: user.role,
                                seller_id: seller_id
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

                        return {
                            EC: 0,
                            DT: {
                                accessToken: accessToken
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

module.exports = {
    userRegister, userLogin, hashPassword,
    checkCustomerEmailExist, checkPassword,
    checkSellerEmailExist, userSystemLogin
}