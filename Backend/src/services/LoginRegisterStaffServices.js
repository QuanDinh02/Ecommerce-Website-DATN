import { createToken } from '../middleware/jwt';
import { QueryTypes } from "sequelize";
import { sequelize } from '../models/index';
import _ from 'lodash';

const checkExistUsername = async (userName) => {

    let check = await sequelize.query(`SELECT * FROM StaffAccounts WHERE username='${userName}'`, { type: QueryTypes.SELECT });
    if (!_.isEmpty(check)) {
        return true;
    }
    return false;
}

// const checkPassword = (inputPassword, hashPass) => {
//     return bcrypt.compareSync(inputPassword, hashPass);
// }

const checkPassword = (inputPassword, dbPassword) => {
    return dbPassword === inputPassword;
}

const userLogin = async (userData) => {
    try {
        let checkUsername = await checkExistUsername(userData.username);

        if (checkUsername) {

            let staffAccount = await sequelize.query(`
                SELECT * 
                FROM StaffAccounts 
                WHERE username='${userData.username}'
            `, { type: QueryTypes.SELECT });

            let staff = staffAccount[0];

            let staffInfo = await sequelize.query(`
                SELECT * 
                FROM Staffs s 
                WHERE id='${staff.staffID}'
            `, { type: QueryTypes.SELECT });

            let [{ id: staff_id, Role: roleID, FullName: fullName }] = staffInfo;

            let role = await sequelize.query(`
                SELECT s.name 
                FROM StaffRoles s 
                WHERE id='${roleID}'
            `, { type: QueryTypes.SELECT });

            let roleName = role[0].name;

            if (staff) {
                if (checkPassword(userData.password, staff.password)) {

                    let payload = {
                        id: staff_id,
                        username: fullName,
                        role: roleName,
                        isAuthenticated: true,
                    }

                    let accessToken = createToken(payload);
                    return {
                        EC: 0,
                        DT: {
                            accessToken: accessToken,
                            id: staff_id,
                            username: fullName,
                            role: roleName
                        },
                        EM: 'Đăng nhập thành công !'
                    }
                }

            }
        }

        return {
            EC: 1,
            DT: '',
            EM: 'Username/ password không đúng !'

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

module.exports = { userLogin, checkPassword }