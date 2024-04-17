import { QueryTypes } from "sequelize";
import { sequelize } from '../models/index';
import _ from 'lodash';

const getStaffsWithPagination = async (limit, page) => {
    try {
        if (limit != 0 && page > 0) {
            let offset = (page - 1) * limit;

            let results = await sequelize.query(`
            SELECT s.id, s.FullName, s.BirthDate, s.Gender, s.Address, s.Email, s.PhoneNumber, s.Role as role_id, r.name as role_name
            FROM Staffs s, StaffRoles r
            WHERE s.Role = r.id
        `, { type: QueryTypes.SELECT });

            results.reverse();

            let newResults = results.map(item => {
                return {
                    id: item.id,
                    FullName: item.FullName,
                    BirthDate: item.BirthDate,
                    Gender: item.Gender,
                    Address: item.Address,
                    Email: item.Email,
                    PhoneNumber: item.PhoneNumber,
                    Role: {
                        id: item.role_id,
                        name: item.role_name
                    }
                }
            });

            let totalPages = Math.ceil(newResults.length / limit);
            let buildData = _(newResults).drop(offset).take(limit).value();

            return {
                EC: 0,
                DT: {
                    total_pages: totalPages,
                    current_page: page,
                    data: buildData
                },
                EM: 'Fetch staffs successfully !'

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

const getStaffRoles = async () => {
    try {
        let results = await sequelize.query(`
            SELECT *
            FROM StaffRoles r
        `, { type: QueryTypes.SELECT });

        return {
            EC: 0,
            DT: results,
            EM: 'Fetch staffs successfully !'

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

const createStaff = async (data) => {
    try {
        let result = await sequelize.query(`
            SELECT *
            FROM Staffs
            WHERE PhoneNumber = '${data.PhoneNumber}'
        `, { type: QueryTypes.SELECT });

        if (result.length > 0) {
            return {
                EC: -1,
                DT: '',
                EM: 'Nhân viên đã tồn tại !'

            }
        } else {

            let response = await sequelize.query(`
                INSERT INTO Staffs (FullName, BirthDate, Role, Gender, Address, Email, PhoneNumber )
                VALUES (N'${data.FullName}', '${data.BirthDate}','${data.Role}', N'${data.Gender}', N'${data.Address}', '${data.Email}', '${data.PhoneNumber}')
            `, { type: QueryTypes.INSERT });

            let fetchResult = await sequelize.query(`
                SELECT *
                FROM Staffs
                WHERE PhoneNumber = '${data.PhoneNumber}'
            `, { type: QueryTypes.SELECT });

            let staffInfo = fetchResult[0];

            if (staffInfo) {
                let response2 = await sequelize.query(`
                INSERT INTO StaffAccounts (staffID, username, password)
                VALUES ('${staffInfo.id}', '${data.username}','${data.password}')
            `, { type: QueryTypes.INSERT });

                return {
                    EC: 0,
                    DT: staffInfo,
                    EM: 'Tạo mới nhân viên thành công !'
                }
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

const updateStaffInfo = async (data) => {
    try {
        let result = await sequelize.query(`
            UPDATE Staffs
            SET FullName = N'${data.FullName}', BirthDate = '${data.BirthDate}', 
            Address = N'${data.Address}', Email = '${data.Email}', Role='${data.Role}',
            Gender = N'${data.Gender}', PhoneNumber = '${data.PhoneNumber}'
            WHERE id = '${data.id}'
        `, { type: QueryTypes.UPDATE });

        return {
            EC: 0,
            DT: "",
            EM: 'Cập nhật thành công !'

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

const deleteStaff = async (staff_id) => {
    try {
        let result = await sequelize.query(`
            DELETE FROM Staffs
            WHERE id = '${staff_id}'
        `, { type: QueryTypes.DELETE });

        let result2 = await sequelize.query(`
            DELETE FROM StaffAccounts
            WHERE staffID = '${staff_id}'
        `, { type: QueryTypes.DELETE });

        return {
            EC: 0,
            DT: "",
            EM: 'Xóa nhân viên thành công !'

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
    getStaffsWithPagination, getStaffRoles, createStaff, deleteStaff, updateStaffInfo
}