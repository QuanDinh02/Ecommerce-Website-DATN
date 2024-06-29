import db from '../models/index';
import { Op } from 'sequelize';

export const getUserByRefreshToken = async (refresh_token) => {

    try {

        let user_info = await db.User.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'username'],
            include: {
                model: db.UserRole,
                attributes: ['id', 'name'],
            },
            where: {
                refreshToken: {
                    [Op.eq]: refresh_token
                }
            }
        });

        if (user_info) {
            let role = user_info.UserRole.name;

            if (role === "customer") {
                let customerInfo = await db.Customer.findOne({
                    raw: true,
                    attributes: ['id'],
                    where: {
                        userID: {
                            [Op.eq]: user_info.id
                        }
                    }
                });

                let sessionInfo = await db.Session.findAll({
                    limit: 1,
                    raw: true,
                    where: {
                        customerID: {
                            [Op.eq]: +customerInfo.id,
                        },
                    },
                    order: [['createdAt', 'DESC']]
                });

                return {
                    customer_id: +customerInfo.id,
                    username: user_info.username,
                    role: role,
                    session: sessionInfo,
                    isAuthenticated: true
                }
            }

            if (role === "seller") {
                let sellerInfo = await db.Seller.findOne({
                    raw: true,
                    attributes: ['id', 'name'],
                    where: {
                        userID: {
                            [Op.eq]: user_info.id
                        }
                    }
                })

                return {
                    seller_id: +sellerInfo.id,
                    username: user_info.username,
                    role: role,
                    isAuthenticated: true
                }
            }

            if (role === "shipping_unit") {
                let shippingUnitInfo = await db.ShippingUnit.findOne({
                    raw: true,
                    attributes: ['id'],
                    where: {
                        userID: {
                            [Op.eq]: user_info.id
                        }
                    }
                })

                return {
                    shipping_unit_id: shippingUnitInfo.id,
                    username: user_info.username,
                    role: role,
                    isAuthenticated: true
                }
            }

            if (role === "admin") {

                let adminInfo = await db.Employee.findOne({
                    raw: true,
                    attributes: ['id'],
                    where: {
                        userID: {
                            [Op.eq]: user_info.id
                        }
                    }
                })

                return {
                    asid: adminInfo.id,
                    username: user_info.username,
                    role: role,
                    isAuthenticated: true
                }
            }
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateUserRefreshToken = async (username, token) => {
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

