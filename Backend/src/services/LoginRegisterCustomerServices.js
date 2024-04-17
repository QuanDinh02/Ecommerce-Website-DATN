import { createToken } from '../middleware/jwt';
import { QueryTypes } from "sequelize";
import { sequelize } from '../models/index';
import _ from 'lodash';

const checkExistUsername = async (userName) => {

    let check = await sequelize.query(`SELECT * FROM CustomerAccounts WHERE username='${userName}'`, { type: QueryTypes.SELECT });
    if (!_.isEmpty(check)) {
        return true;
    }
    return false;
}

const checkPassword = (inputPassword, dbPassword) => {
    return dbPassword === inputPassword;
}

const customerLogin = async (userData) => {
    try {
        let checkUsername = await checkExistUsername(userData.username);

        if (checkUsername) {

            let CutomerAccount = await sequelize.query(`
                SELECT * 
                FROM CustomerAccounts 
                WHERE username='${userData.username}'
            `, { type: QueryTypes.SELECT });

            let customer = CutomerAccount[0];

            let customerInfo = await sequelize.query(`
                SELECT * 
                FROM Customers s 
                WHERE id='${customer.customerID}'
            `, { type: QueryTypes.SELECT });

            let [{ id: customer_id, name: fullName }] = customerInfo;

            if (customer) {
                if (checkPassword(userData.password, customer.password)) {

                    let payload = {
                        id: customer_id,
                        username: fullName,
                        role: "Khách hàng",
                        isAuthenticated: true,
                    }

                    let accessToken = createToken(payload);
                    return {
                        EC: 0,
                        DT: {
                            accessToken: accessToken,
                            id: customer_id,
                            username: fullName,
                            role: "Khách hàng"
                        },
                        EM: 'Đăng nhập thành công !'
                    }
                }

            }
        }

        return {
            EC: 1,
            DT: '',
            EM: 'Số điện thoại /mật khẩu không đúng !'

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

module.exports = { customerLogin }