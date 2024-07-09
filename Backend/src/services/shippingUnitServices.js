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

const getOrderStatus = async (shipping_unit_id, item_limit, page, status, startDate, endDate) => {
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

                if (+startDate !== 0 && +endDate !== 0) {

                    let start_date = new Date(startDate);
                    let end_date = new Date(endDate);

                    if (start_date.getTime() !== end_date.getTime()) {
                        orderListRaw = orderListRaw.filter(order => order.orderDate >= start_date && order.orderDate <= end_date);
                    }
                    else {
                        orderListRaw = orderListRaw.filter(order => {
                            let order_date = new Date(order.orderDate);

                            let order_month = order_date.getMonth() + 1; // months from 1-12
                            let order_day = order_date.getDate();
                            let order_year = order_date.getFullYear();

                            let month = start_date.getMonth() + 1; // months from 1-12
                            let day = start_date.getDate();
                            let year = start_date.getFullYear();

                            return order_day === day && order_month === month && order_year === year;
                        });
                    }
                }

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

                const listLength = filter_order_list_data.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                filter_order_list_data.reverse();
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

                if (+startDate !== 0 && +endDate !== 0) {

                    let start_date = new Date(startDate);
                    let end_date = new Date(endDate);

                    if (start_date.getTime() !== end_date.getTime()) {
                        orderListRaw = orderListRaw.filter(order => order.orderDate >= start_date && order.orderDate <= end_date);
                    }
                    else {
                        orderListRaw = orderListRaw.filter(order => {
                            let order_date = new Date(order.orderDate);

                            let order_month = order_date.getMonth() + 1; // months from 1-12
                            let order_day = order_date.getDate();
                            let order_year = order_date.getFullYear();

                            let month = start_date.getMonth() + 1; // months from 1-12
                            let day = start_date.getDate();
                            let year = start_date.getFullYear();

                            return order_day === day && order_month === month && order_year === year;
                        });
                    }
                }

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

                const listLength = filter_order_list_data.length;
                const pageTotal = Math.ceil(listLength / item_limit);

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

const getOrderSearch = async (shipping_unit_id, order_id) => {
    try {

        let orderInfo = await db.Order.findOne({
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
                [Op.and]: [
                    {
                        id: {
                            [Op.eq]: order_id
                        }
                    },
                    {
                        shippingUnit: {
                            [Op.eq]: shipping_unit_id,
                        }
                    }
                ]

            }
        });

        if (orderInfo) {

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
                        [Op.eq]: +orderInfo.id,
                    },
                },
                order: [
                    ['updatedDate', 'DESC'],
                    ['status', 'DESC'],
                ]
            });

            let order_status_info = order_status_raw[0];

            let order_status = order_status_info.ShipmentStatus;

            let order_list_data = [
                {
                    id: orderInfo.id,
                    orderDate: orderInfo.orderDate,
                    totalPrice: orderInfo.totalPrice,
                    customer_name: orderInfo.Customer.name,
                    seller_name: orderInfo.Seller.shopName,
                    status: order_status
                }
            ];

            return {
                EC: 0,
                DT: {
                    order_list: order_list_data
                },
                EM: 'Get order search !'
            }
        } else {
            return {
                EC: 0,
                DT: {
                    order_list: []
                },
                EM: 'Get order search !'
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

const confirmReceiveOrderSeller = async (order_id, order_status) => {
    try {

        // order_status: 4 - Đã lấy hàng, 5 - Lấy hàng thất bại

        let date = new Date();

        let result = await db.Shipment.create({
            status: order_status,
            updatedDate: date,
            orderID: order_id
        });

        if (result) {
            return {
                EC: 0,
                DT: '',
                EM: 'Xác nhận lấy hàng thành công'
            }
        }
        else {
            return {
                EC: -1,
                DT: '',
                EM: 'Xác nhận lấy hàng thất bại'
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

const handleShippingOrder = async (order_id) => {
    try {

        let date = new Date();

        let result = await db.Shipment.create({
            status: 6, // 6 - Đang giao hàng
            updatedDate: date,
            orderID: order_id
        });

        if (result) {
            return {
                EC: 0,
                DT: '',
                EM: 'Đơn hàng đang giao'
            }
        }
        else {
            return {
                EC: -1,
                DT: '',
                EM: 'Đơn hàng không thể giao'
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

const handleConfirmCompleteShippingOrder = async (order_id) => {
    try {

        let date = new Date();

        await db.Transaction.update({
            status: 2,
            updatedAt: date
        }, {
            where: {
                orderID: {
                    [Op.eq]: order_id,
                },
            }
        });

        let result = await db.Shipment.create({
            status: 7, // 7 - Giao hàng thành công
            updatedDate: date,
            orderID: order_id
        });

        let order_item_list = await db.OrderItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    raw: true,
                    nest: true,
                    model: db.Product,
                    attributes: ['id', 'name'],
                    include: {
                        raw: true,
                        model: db.ProductType,
                        attributes: ['id']
                    }
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
            await db.ProductType.increment({ sold: +order_item.quantity }, { where: { id: productInfo.ProductType.id } });
        }))

        if (result) {
            return {
                EC: 0,
                DT: '',
                EM: 'Giao hàng thành công'
            }
        }
        else {
            return {
                EC: -1,
                DT: '',
                EM: 'Lỗi xác nhận giao hàng'
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

const getDashboardData = async (shipping_unit_id) => {
    try {

        let pending_shipper_get = 0;
        let shipping = 0;
        let shipping_success = 0;
        let customer_using_service = 0;

        let orderListRaw = await db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
                shippingUnit: {
                    [Op.eq]: shipping_unit_id,
                },
            }
        });

        customer_using_service = orderListRaw.length;

        await Promise.all(orderListRaw.map(async item => {

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

            let order_status_id = order_status_info.ShipmentStatus.id;

            if (order_status_id === 3) {
                pending_shipper_get += 1;
            }

            if (order_status_id === 6) {
                shipping += 1;
            }

            if (order_status_id === 7) {
                shipping_success += 1;
            }
        }));

        let overview_data = [pending_shipper_get, shipping, shipping_success, customer_using_service];

        let data = {
            overview_data: overview_data
        }

        return {
            EC: 0,
            DT: data,
            EM: 'Get shipping unit dashboard data !'
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
    getShippingUnitList, getOrderStatus, getOrderDetail,
    confirmReceiveOrderSeller, handleShippingOrder, handleConfirmCompleteShippingOrder,
    getOrderSearch, getDashboardData
}