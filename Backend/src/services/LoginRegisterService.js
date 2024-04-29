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

const userRegister = async (userData) => {

    try {
        let checkUsername = await checkUserNameExist(userData.username);
        if (checkUsername) {
            return {
                EC: 1,
                EM: 'Username has already existed !',
                DT: ''
            }
        }

        let hash_password = hashPassword(userData.password);

        await db.User.create({
            username: userData.username,
            password: hash_password,
            role: userData.role,
            registeredAt: new Date(),
            lastLogin: null,
        })

        return {
            EC: 0,
            EM: "Create new user successfully"
        }

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
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
                
                if (checkPassword(userData.password, user.password)) {

                    let payload = {
                        username: user.username,
                        role: user.role,
                        isAuthenticated: true,
                    }

                    let accessToken = createToken(payload);
                    return {
                        EC: 0,
                        DT: {
                            accessToken: accessToken,
                            username: user.username
                        },
                        EM: 'Login success !'
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

module.exports = { userRegister, userLogin }