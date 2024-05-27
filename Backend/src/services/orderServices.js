const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const addNewOrder = async (orderData) => {
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

module.exports = {
    addNewOrder
}