const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const addNewOrder = async (orderData, session_id) => {
    try {

        let newOrder = await db.Order.create({
            orderDate: new Date(),
            shipFee: orderData.shipFee,
            totalPrice: orderData.totalPrice,
            shipMethod: null,
            address: orderData.address,
            note: orderData.note,
            customerID: orderData.customerID,
        });

        if (newOrder) {
            let orderInfo = newOrder.dataValues;

            let { order_items } = orderData;

            let orderItemBuild = order_items.map(item => {
                return {
                    ...item, orderID: orderInfo.id
                }
            });

            await db.OrderItem.bulkCreate(orderItemBuild);

            let buyItemsBuild = order_items.map(item => {
                return {
                    sessionID: session_id,
                    productID: item.productID,
                    type: 1
                }
            });

            await db.SessionActivity.bulkCreate(buyItemsBuild);

            let shippingStatus = await db.Shipment.create({
                status: "ĐANG XỬ LÝ",
                updatedDate: orderInfo.orderDate,
                orderID: orderInfo.id
            });

            if (shippingStatus) {

                return {
                    EC: 0,
                    DT: '',
                    EM: 'Thêm đơn hàng thành công !'
                }
            }

            return {
                EC: -1,
                DT: '',
                EM: 'Thêm đơn hàng thất bại !'
            }
        }

        return {
            EC: -1,
            DT: '',
            EM: 'Thêm đơn hàng thất bại !'
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

const getOrderByCustomer = async (customer_id) => {
    try {

        let order_list = await db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice', 'note','shipFee'],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let order_detail_list = await Promise.all(order_list.map(async order => {

            let order_item_list = await db.OrderItem.findAll({
                raw: true,
                nest: true,
                attributes: ['id', 'quantity', 'price'],
                include: [
                    {
                        model: db.Product,
                        attributes: ['id', 'name'],
                    }
                ],
                where: {
                    orderID: {
                        [Op.eq]: order.id
                    }
                }
            });

            let orderStatus = await db.Shipment.findOne({
                raw: true,
                attributes: ['status'],
                where: {
                    orderID: {
                        [Op.eq]: order.id
                    }
                }
            })

            let order_item_list_format = order_item_list.map(order_item => {
                let orderItem = order_item;
                let productInfo = orderItem.Product;

                delete orderItem.Product;

                return {
                    ...orderItem,
                    product_id: productInfo.id,
                    product_name: productInfo.name,
                    product_image: ""
                }

            });

            return {
                ...order, 
                status: orderStatus.status,
                order_item_list: order_item_list_format
            }
        }))

        return {
            EC: 0,
            DT: order_detail_list,
            EM: 'Tất cả đơn hàng của khách hàng !'
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
    addNewOrder, getOrderByCustomer
}