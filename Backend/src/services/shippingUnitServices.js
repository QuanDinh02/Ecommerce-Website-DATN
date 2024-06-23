const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const ORDER_STATUS_DISPLAY_ALLOWANCE = [3, 4, 5, 6, 7, 9];

const getShippingUnitList = async () => {
    try {

        let shipping_unit_list = await db.ShippingUnit.findAll({
            raw: true,
            attributes: ['id', 'nameUnit'],
        });

        return {
            EC: 0,
            DT: shipping_unit_list,
            EM: 'Shipping unit list'
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

const getOrderStatus = async (shipping_unit_id, item_limit, page, status) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (status == 0) {
                let orderListRaw = await db.Order.findAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'orderDate', 'totalPrice'],
                    include: [
                        {
                            model: db.Customer,
                            attributes: ['name'],
                        },
                        {
                            model: db.Seller,
                            attributes: ['shopName'],
                        }
                    ],
                    where: {
                        shippingUnit: {
                            [Op.eq]: shipping_unit_id,
                        },
                    }
                });

                const listLength = orderListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                orderListRaw.reverse();

                let order_list_data = await Promise.all(orderListRaw.map(async item => {

                    let order_status_raw = await db.Shipment.findAll({
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
                                [Op.eq]: +item.id,
                            },
                        },
                        order: [
                            ['updatedDate', 'DESC'],
                            ['status', 'DESC'],
                        ]
                    });

                    let order_status_info = order_status_raw[0];

                    let order_status = order_status_info.ShipmentStatus;

                    return {
                        id: item.id,
                        orderDate: item.orderDate,
                        totalPrice: item.totalPrice,
                        customer_name: item.Customer.name,
                        seller_name: item.Seller.shopName,
                        status: order_status
                    }
                }));

                let filter_order_list_data = order_list_data.filter(item => ORDER_STATUS_DISPLAY_ALLOWANCE.includes(item.status.id));

                let paginate_order_list_data = _(filter_order_list_data).drop(offSet).take(item_limit).value();

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        order_list: paginate_order_list_data
                    },
                    EM: 'Get all orders !'
                }
            }
            else {
                let orderListRaw = await db.Order.findAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'orderDate', 'totalPrice'],
                    include: [
                        {
                            model: db.Customer,
                            attributes: ['name'],
                        },
                        {
                            model: db.Seller,
                            attributes: ['shopName'],
                        }
                    ],
                    where: {
                        shippingUnit: {
                            [Op.eq]: shipping_unit_id,
                        },
                    }
                });

                const listLength = orderListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                orderListRaw.reverse();
                //orderListRaw = _(orderListRaw).drop(offSet).take(item_limit).value();

                let order_list_data = await Promise.all(orderListRaw.map(async item => {

                    let order_status_raw = await db.Shipment.findAll({
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
                                [Op.eq]: +item.id,
                            },
                        },
                        order: [
                            ['updatedDate', 'DESC'],
                            ['status', 'DESC'],
                        ]
                    });

                    let order_status_info = order_status_raw[0];

                    let order_status = order_status_info.ShipmentStatus;

                    return {
                        id: item.id,
                        orderDate: item.orderDate,
                        totalPrice: item.totalPrice,
                        customer_name: item.Customer.name,
                        seller_name: item.Seller.shopName,
                        status: order_status
                    }
                }));

                let filter_order_list_data = order_list_data.filter(item => item.status.id === status);

                let paginate_order_list_data = _(filter_order_list_data).drop(offSet).take(item_limit).value();

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        order_list: paginate_order_list_data
                    },
                    EM: 'Get orders by status !'
                }
            }
        }

        return {
            EC: 0,
            DT: [],
            EM: 'ITEM LIMIT is invalid !'
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

const getOrderDetail = async (order_id) => {
    try {

        let order_info = await db.Order.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice', 'shipFee', 'fullName', 'phone', 'address'],
            include:
                [
                    {
                        model: db.ShippingMethod,
                        attributes: ['id', 'nameMethod', 'price'],
                    },
                    {
                        model: db.ShippingUnit,
                        attributes: ['id', 'nameUnit'],
                    },
                    {
                        model: db.Customer,
                        attributes: ['name'],
                    },
                    {
                        model: db.Seller,
                        attributes: ['shopName', 'mobile', 'address'],
                    },
                ],
            where: {
                id: {
                    [Op.eq]: order_id,
                },
            }
        });

        let shippingMethod = order_info.ShippingMethod.nameMethod;
        let shippingUnit = order_info.ShippingUnit;
        let customer_name = order_info.Customer.name;
        let seller_info = order_info.Seller;

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

        let transactionPaymentMethod = transaction_info.TransactionPaymentMethod.method_name;

        let order_status_info = await db.Shipment.findAll({
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

        let order_status = order_status_info[0].ShipmentStatus.name;

        return {
            EC: 0,
            DT: {
                id: order_info.id,
                orderDate: order_info.orderDate,
                totalPrice: order_info.totalPrice,
                shipFee: order_info.shipFee,
                order_address: {
                    customer_name: customer_name,
                    name: order_info.fullName,
                    phone: order_info.phone,
                    address: order_info.address
                },
                seller_info: {
                    name: seller_info.shopName,
                    mobile: seller_info.mobile,
                    address: seller_info.address
                },
                order_item_list: order_item_list_format,
                payment_method: transactionPaymentMethod,
                shipping_unit: shippingUnit.nameUnit,
                shipping_method: shippingMethod,
                status: order_status
            },
            EM: 'Get order detail'
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
    getShippingUnitList, getOrderStatus, getOrderDetail
}