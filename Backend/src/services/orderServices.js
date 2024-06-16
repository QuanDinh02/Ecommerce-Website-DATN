const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

// require('dotenv').config()

// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: accessKey,
//         secretAccessKey: secretAccessKey
//     },
//     region: bucketRegion
// });

const addNewOrder = async (orderData, session_id) => {
    try {

        let newOrder = await db.Order.create({
            orderDate: new Date(),
            shipFee: orderData.shipFee,
            totalPrice: orderData.totalPrice,
            shipMethod: orderData.shipMethod,
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

            await db.Shipment.create({
                status: 1,
                updatedDate: orderInfo.orderDate,
                orderID: orderInfo.id
            });

            let transactionInfo = await db.Transaction.create({
                orderID: orderInfo.id,
                payment: orderData.paymentMethod,
                amount: orderData.totalPrice,
                status: 1,
                createdAt: orderInfo.orderDate,
                updatedAt: orderInfo.orderDate,
            });

            if (transactionInfo) {

                return {
                    EC: 0,
                    DT: {
                        order_id: orderInfo.id
                    },
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
            attributes: ['id', 'orderDate', 'totalPrice', 'note', 'shipFee'],
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

            let order_item_list_format = await Promise.all(order_item_list.map(async order_item => {
                let orderItem = order_item;
                let productInfo = orderItem.Product;

                delete orderItem.Product;

                // const getObjectParams = {
                //     Bucket: bucketName,
                //     Key: `${productInfo.id}.jpeg`
                // }

                // const command = new GetObjectCommand(getObjectParams);
                // const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                return {
                    ...orderItem,
                    product_id: productInfo.id,
                    product_name: productInfo.name,
                    //product_image: url
                    product_image: ""
                }

            }));

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

const getShippingMethod = async () => {
    try {

        let shipping_method_list = await db.ShippingMethod.findAll({
            raw: true,
            attributes: ['id', 'nameMethod', 'price', 'status'],
        });

        return {
            EC: 0,
            DT: shipping_method_list,
            EM: 'Shipping method'
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

const getPaymentMethod = async () => {
    try {

        let payment_method_list = await db.TransactionPaymentMethod.findAll({
            raw: true,
            attributes: ['id', 'method_name', 'status'],
        });

        return {
            EC: 0,
            DT: payment_method_list,
            EM: 'Payment method'
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
    addNewOrder, getOrderByCustomer, getShippingMethod, getPaymentMethod
}