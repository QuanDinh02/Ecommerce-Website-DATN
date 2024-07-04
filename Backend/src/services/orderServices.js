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

        let { order_items } = orderData;

        let product_detail_list = await Promise.all(order_items.map(async item => {

            let product_info = await db.Product.findOne({
                raw: true,
                attributes: ['id', 'shop_id'],
                where: {
                    id: {
                        [Op.eq]: item.productID
                    }
                }
            })

            return {
                ...item,
                shop_id: product_info.shop_id
            }
        }))

        let shop_id_list = await product_detail_list.map(item => {
            return {
                shop_id: item.shop_id
            }
        });

        let remove_dup_list = _.uniqBy(shop_id_list, (e) => e.shop_id);

        let order_data_list = remove_dup_list.map((shop) => {
            let order_item_list = product_detail_list.filter(product => product.shop_id === shop.shop_id);
            return {
                seller_id: shop.shop_id,
                order_item_list: order_item_list
            }
        })

        await Promise.all(order_items.map(async order_item => {

            await db.ProductType.decrement('quantity', {
                by: order_item.quantity,
                where: { productID: +order_item.productID }
            });
        }));

        await Promise.all(order_data_list.map(async (order_by_shop) => {

            let order_items = order_by_shop.order_item_list;
            let total_order_price = _.sumBy(order_items, (o) => o.price * o.quantity);

            let newOrder = await db.Order.create({
                orderDate: new Date(),
                shipFee: orderData.shipFee,
                totalPrice: total_order_price + orderData.shipFee,
                shipMethod: orderData.shipMethod,
                shippingUnit: orderData.shippingUnit,
                fullName: orderData.fullName,
                phone: orderData.phone,
                address: orderData.address,
                note: orderData.note,
                customerID: orderData.customerID,
                sellerID: order_by_shop.seller_id
            });

            if (newOrder) {
                let orderInfo = newOrder.dataValues;

                let orderItemBuild = order_items.map(item => {
                    return {
                        productID: item.productID,
                        price: item.price,
                        quantity: item.quantity,
                        orderID: orderInfo.id
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

                await db.Transaction.create({
                    orderID: orderInfo.id,
                    payment: orderData.paymentMethod,
                    amount: orderData.totalPrice,
                    status: 1,
                    createdAt: orderInfo.orderDate,
                    updatedAt: orderInfo.orderDate,
                });
            }
        }));

        return {
            EC: 0,
            DT: "",
            EM: 'Thêm đơn hàng thành công !'
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

const getOrderByCustomer = async (customer_id, status) => {
    try {

        let order_list = await db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        order_list.reverse();

        let order_detail_list = await Promise.all(order_list.map(async order => {

            let order_status = await db.Shipment.findAll({
                limit: 1,
                raw: true,
                nest: true,
                attributes: ['id', 'updatedDate'],
                include:
                {
                    model: db.ShipmentStatus,
                    attributes: ['id', 'name'],
                },
                where: {
                    orderID: {
                        [Op.eq]: +order.id,
                    },
                },
                order: [['updatedDate', 'DESC']]
            });

            let order_status_info = order_status[0];

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

            let order_item_list_format = await Promise.all(order_item_list.map(async order_item => {
                let orderItem = order_item;
                let productInfo = orderItem.Product;

                delete orderItem.Product;

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'price', 'quantity'],
                    where: {
                        productID: {
                            [Op.eq]: productInfo.id
                        }
                    }
                });

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
                    product_price: productType.price,
                    //product_image: url
                    product_image: ""
                }

            }));

            return {
                ...order,
                status: {
                    id: order_status_info.ShipmentStatus.id,
                    name: order_status_info.ShipmentStatus.name,
                    date: order_status_info.updatedDate
                },
                order_item_list: order_item_list_format
            }
        }))

        if (status === 0) {
            return {
                EC: 0,
                DT: order_detail_list,
                EM: 'Tất cả đơn hàng của khách hàng !'
            }
        }

        else {

            let filter_order_list = order_detail_list.filter(order => order.status.id === status);

            return {
                EC: 0,
                DT: filter_order_list,
                EM: ''
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

const getOrderSearchByCustomer = async (order_id) => {
    try {

        let order_info = await db.Order.findOne({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
                id: {
                    [Op.eq]: order_id,
                },
            },
        });

        if (order_info) {

            let order_status = await db.Shipment.findAll({
                limit: 1,
                raw: true,
                nest: true,
                attributes: ['id', 'updatedDate'],
                include:
                {
                    model: db.ShipmentStatus,
                    attributes: ['id', 'name'],
                },
                where: {
                    orderID: {
                        [Op.eq]: +order_id,
                    },
                },
                order: [['updatedDate', 'DESC']]
            });

            let order_status_info = order_status[0];

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
                        [Op.eq]: order_id
                    }
                }
            });

            let order_item_list_format = await Promise.all(order_item_list.map(async order_item => {
                let orderItem = order_item;
                let productInfo = orderItem.Product;

                delete orderItem.Product;

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'price', 'quantity'],
                    where: {
                        productID: {
                            [Op.eq]: productInfo.id
                        }
                    }
                });

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
                    product_price: productType.price,
                    //product_image: url
                    product_image: ""
                }

            }));

            return {
                EC: 0,
                DT:
                    [
                        {
                            ...order_info,
                            status: {
                                id: order_status_info.ShipmentStatus.id,
                                name: order_status_info.ShipmentStatus.name,
                                date: order_status_info.updatedDate
                            },
                            order_item_list: order_item_list_format
                        }
                    ],
                EM: 'Đơn hàng tìm kiếm !'
            }
        } else {
            return {
                EC: 0,
                DT: [],
                EM: 'Đơn hàng tìm kiếm !'
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

const getCustomerOrderDetail = async (order_id) => {
    try {

        let order_status_history_raw = await db.Shipment.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'status', 'updatedDate'],
            include:
            {
                model: db.ShipmentStatus,
                attributes: ['id', 'name'],
            },
            where: {
                orderID: {
                    [Op.eq]: +order_id,
                },
            },
        });

        let order_status_history = order_status_history_raw.map(item => {
            return {
                id: item.ShipmentStatus.id,
                name: item.ShipmentStatus.name,
                date: item.updatedDate
            }
        });

        order_status_history.reverse();

        let transaction_info = await db.Transaction.findOne({
            raw: true,
            nest: true,
            attributes: [],
            include:
            {
                model: db.TransactionPaymentMethod,
                attributes: ['id', 'method_name'],
            }
            ,
            where: {
                orderID: {
                    [Op.eq]: +order_id,
                },
            },
        });

        let transactionPaymentMethod = transaction_info.TransactionPaymentMethod;

        let order_info = await db.Order.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice', 'shipFee', 'address', 'fullName', 'phone'],
            include:
                [
                    {
                        model: db.ShippingMethod,
                        attributes: ['id', 'nameMethod', 'price'],
                    },
                    {
                        model: db.ShippingUnit,
                        attributes: ['id', 'nameUnit'],
                    }
                ],
            where: {
                id: {
                    [Op.eq]: +order_id,
                },
            },
        });

        let shippingMethod = order_info.ShippingMethod;
        let shippingUnit = order_info.ShippingUnit;

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
                    [Op.eq]: +order_id
                }
            }
        });

        let order_item_list_format = await order_item_list.map(order_item => {
            let orderItem = order_item;
            let productInfo = orderItem.Product;

            delete orderItem.Product;

            return {
                ...orderItem,
                product_id: productInfo.id,
                product_name: productInfo.name
            }

        });

        return {
            EC: 0,
            DT: {
                id: order_info.id,
                orderDate: order_info.orderDate,
                totalPrice: order_info.totalPrice,
                shipFee: order_info.shipFee,
                shipping_location: {
                    address: order_info.address,
                    fullName: order_info.fullName,
                    phone: order_info.phone,
                },
                payment_method: transactionPaymentMethod.method_name,
                shipping_method: shippingMethod.nameMethod,
                shipping_unit: shippingUnit.nameUnit,
                order_item_list: order_item_list_format,
                order_status_history: order_status_history
            },
            EM: 'Order Detail !'
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

const getOrderItemInfoForRating = async (order_id) => {
    try {

        let orderStatus = await db.Shipment.findOne({
            raw: true,
            where: {
                [Op.and]: [
                    {
                        status: {
                            [Op.eq]: 7
                        }
                    },
                    {
                        orderID: {
                            [Op.eq]: +order_id
                        }
                    }
                ]

            }
        });

        if (orderStatus) {

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
                        [Op.eq]: +order_id
                    }
                }
            });

            let product_review_data_raw = await db.OrderProductReview.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.ProductReview,
                        attributes: ['id', 'rating', 'productID', 'comment'],
                    }
                ],
                where: {
                    orderID: {
                        [Op.eq]: +order_id
                    }
                }
            });

            let product_review_data = await product_review_data_raw.map(item => {
                return item.ProductReview;
            })

            let product_list = await order_item_list.map(order_item => {

                let orderItem = order_item;
                let productInfo = orderItem.Product;

                let review = product_review_data.filter(item => item.productID === productInfo.id);

                return {
                    id: productInfo.id,
                    name: productInfo.name,
                    review: review.length === 0 ?
                        {
                            id: 0,
                            rating: 0,
                            comment: ""
                        }
                        :
                        {
                            id: review[0].id,
                            rating: review[0].rating,
                            comment: review[0].comment
                        }

                }
            });

            return {
                EC: 0,
                DT: {
                    id: order_id,
                    product_list: product_list
                },
                EM: 'Order Items !'
            }
        } else {
            return {
                EC: 0,
                DT: {
                    id: order_id,
                    product_list: []
                },
                EM: 'Order Items !'
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

const customerRatingProduct = async (data, customer_id) => {
    try {

        let { product_data, order_id } = data;
        let review = product_data.review;

        let date = new Date();

        if (review.id === 0) {

            let review_info = await db.ProductReview.create({
                comment: review.comment,
                rating: +review.rating,
                productID: +product_data.id,
                customerID: +customer_id,
                createdAt: date,
                updatedAt: date
            });

            if (review_info) {
                let reviewInfo = review_info.dataValues;

                await db.OrderProductReview.create({
                    orderID: +order_id,
                    productReviewID: +reviewInfo.id
                });

                let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                    raw: true,
                    attributes: ['rating'],
                    where: {
                        productID: {
                            [Op.eq]: +product_data.id,
                        },
                    }
                });

                let newRating = Math.round(parseFloat((_.sumBy(productReviewList, 'rating')) / count) * 10) / 10;

                await db.ProductRating.update({
                    rating: newRating
                }, {
                    where: {
                        productID: {
                            [Op.eq]: +product_data.id,
                        },
                    }
                });

                return {
                    EC: 0,
                    DT: {
                        id: product_data.id,
                        name: product_data.name,
                        review: {
                            id: +reviewInfo.id,
                            rating: +reviewInfo.rating,
                            comment: reviewInfo.comment
                        }
                    },
                    EM: 'Đã đánh giá sản phẩm !'
                }
            }

        } else {

            await db.ProductReview.update({
                rating: review.rating,
                comment: review.comment,
                updatedAt: date
            }, {
                where: {
                    id: {
                        [Op.eq]: +review.id
                    }
                }
            });

            let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                raw: true,
                attributes: ['rating'],
                where: {
                    productID: {
                        [Op.eq]: +product_data.id,
                    },
                }
            });

            let newRating = Math.round(parseFloat((_.sumBy(productReviewList, 'rating')) / count) * 10) / 10;

            await db.ProductRating.update({
                rating: newRating
            }, {
                where: {
                    productID: {
                        [Op.eq]: +product_data.id,
                    },
                }
            });

            return {
                EC: 0,
                DT: "",
                EM: 'Đã chỉnh sửa đánh giá sản phẩm !'
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

const cancelOrderByCustomer = async (order_id) => {
    try {

        let order_status = await db.Shipment.findAll({
            limit: 1,
            raw: true,
            nest: true,
            attributes: ['id', 'updatedDate'],
            include:
            {
                model: db.ShipmentStatus,
                attributes: ['id', 'name'],
            },
            where: {
                orderID: {
                    [Op.eq]: +order_id,
                },
            },
            order: [['updatedDate', 'DESC']]
        });

        let order_status_info_id = order_status[0].ShipmentStatus.id;

        if (order_status_info_id === 1) {

            let update_date = new Date();

            await db.Shipment.create({
                status: 10,
                updatedDate: update_date,
                orderID: order_id
            });

            await db.Transaction.update({
                status: 3,
                updatedAt: update_date
            }, {
                where: {
                    orderID: {
                        [Op.eq]: +order_id,
                    }
                },
            });

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
                        [Op.eq]: +order_id
                    }
                }
            });

            await Promise.all(order_item_list.map(async order_item => {

                let productInfo = order_item.Product;
                await db.ProductType.increment({ quantity: order_item.quantity }, { where: { productID: productInfo.id } });

            }));

            return {
                EC: 0,
                DT: "",
                EM: 'Hủy đơn hàng thành công'
            }

        } else {
            return {
                EC: -1,
                DT: "",
                EM: 'Đơn hàng không thể hủy'
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

module.exports = {
    addNewOrder, getOrderByCustomer, getShippingMethod, getPaymentMethod,
    getCustomerOrderDetail, getOrderSearchByCustomer, cancelOrderByCustomer,
    getOrderItemInfoForRating, customerRatingProduct
}