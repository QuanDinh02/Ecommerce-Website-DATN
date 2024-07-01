const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
import { hashPassword, checkPassword } from './LoginRegisterService.js';

//sort_id: 1 - "Lượt xem tăng dần"

//sort_id: 2 - "Lượt xem giảm dần"

//sort_id: 3 - "Lượt đề xuất tăng dần"

//sort_id: 4 - "Lượt đề xuất giảm dần"

const SORT_TYPE = [['view'], ['view'], ['view'], ['recommend'], ['recommend']]

const SORT_TYPE_ORDER = [['asc'], ['asc'], ['desc'], ['asc'], ['desc']];

const handleSortData = (data, sort_id, off_set, limit) => {
    let type = SORT_TYPE[sort_id];
    let type_order = SORT_TYPE_ORDER[sort_id];

    let pagination_data = _(data).orderBy(type, type_order).drop(off_set).take(limit).value();
    return pagination_data;
}

const getAnalysisProduct = async (item_limit, page, category_id, sub_category_id, sort_id) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (category_id !== 0 && sub_category_id === 0) {

                let subCategoryList = await db.SubCategory.findAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'title'],
                    where: {
                        categoryID: {
                            [Op.eq]: category_id,
                        },
                    }
                });

                let sub_category_list = await subCategoryList.map(item => item.id);

                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: db.Product,
                            raw: true,
                            nest: true,
                            attributes: ['id', 'name'],
                            include: {
                                model: db.ProductTracking,
                                attributes: ['productID', 'view', 'recommend', 'recommend_view']
                            }
                        }
                    ],
                    where: {
                        subCategoryID: {
                            [Op.in]: sub_category_list,
                        },
                    }
                });

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                //let productTrackingPangination = _(productListRaw).drop(offSet).take(item_limit).value();

                let analysis_product_data = productListRaw.map(product => {

                    let productInfo = product.Product;
                    let productTrackingInfo = productInfo.ProductTracking;

                    return {
                        id: productInfo.id,
                        name: productInfo.name,
                        view: productTrackingInfo.view,
                        recommend: productTrackingInfo.recommend,
                        recommend_view: productTrackingInfo.recommend_view,
                    }
                });

                let productTrackingPangination = handleSortData(analysis_product_data, sort_id, offSet, item_limit);

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        analysis_product_list: productTrackingPangination
                    },
                    EM: 'Get analysis products !'
                }
            }

            if (sub_category_id !== 0) {
                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: db.Product,
                            raw: true,
                            nest: true,
                            attributes: ['id', 'name'],
                            include: {
                                model: db.ProductTracking,
                                attributes: ['productID', 'view', 'recommend', 'recommend_view']
                            }
                        }
                    ],
                    where: {
                        subCategoryID: {
                            [Op.eq]: sub_category_id,
                        },
                    }
                });

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                let analysis_product_data = productListRaw.map(product => {

                    let productInfo = product.Product;
                    let productTrackingInfo = productInfo.ProductTracking;

                    return {
                        id: productInfo.id,
                        name: productInfo.name,
                        view: productTrackingInfo.view,
                        recommend: productTrackingInfo.recommend,
                        recommend_view: productTrackingInfo.recommend_view,
                    }
                });

                let productTrackingPangination = handleSortData(analysis_product_data, sort_id, offSet, item_limit);

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        analysis_product_list: productTrackingPangination
                    },
                    EM: 'Get analysis products !'
                }
            }

            let productTrackingRaw = await db.ProductTracking.findAll({
                raw: true,
                nest: true,
                attributes: ['productID', 'view', 'recommend', 'recommend_view'],
                include: {
                    model: db.Product,
                    attributes: ['name'],
                }
            });

            const listLength = productTrackingRaw.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            //let productTrackingPangination = _(productTrackingRaw).orderBy(SORT_TYPE[sort_id], SORT_TYPE_ORDER[sort_id]).drop(offSet).take(item_limit).value();
            let productTrackingPangination = handleSortData(productTrackingRaw, sort_id, offSet, item_limit);

            let analysis_product_data = productTrackingPangination.map(product => {
                return {
                    id: product.productID,
                    name: product.Product.name,
                    view: product.view,
                    recommend: product.recommend,
                    recommend_view: product.recommend_view,
                }
            })

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
                    analysis_product_list: analysis_product_data
                },
                EM: 'Get analysis products !'
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

const getAnalysisProductSearch = async (product_id) => {
    try {
        let productTracking = await db.ProductTracking.findOne({
            raw: true,
            nest: true,
            attributes: ['productID', 'view', 'recommend', 'recommend_view'],
            include: {
                model: db.Product,
                attributes: ['name'],
            },
            where: {
                productID: {
                    [Op.eq]: +product_id,
                },
            }
        });

        if (productTracking) {
            let data = {
                id: productTracking.productID,
                name: productTracking.Product.name,
                view: productTracking.view,
                recommend: productTracking.recommend,
                recommend_view: productTracking.recommend_view,
            }

            return {
                EC: 0,
                DT: [data],
                EM: 'Get analysis product search !'
            }
        }
        else {
            return {
                EC: 0,
                DT: [],
                EM: 'Get analysis product search !'
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

const getDashboardData = async () => {
    try {

        let { count: staff } = await db.User.findAndCountAll({
            raw: true,
            where: {
                role: {
                    [Op.eq]: 1,
                },
            }
        });

        let { count: customer } = await db.User.findAndCountAll({
            raw: true,
            where: {
                role: {
                    [Op.eq]: 3,
                },
            }
        });

        let { count: seller } = await db.User.findAndCountAll({
            raw: true,
            where: {
                role: {
                    [Op.eq]: 2,
                },
            }
        });

        let { count: shipping_unit } = await db.User.findAndCountAll({
            raw: true,
            where: {
                role: {
                    [Op.eq]: 4,
                },
            }
        });

        let data = [customer, seller, staff, shipping_unit];

        return {
            EC: 0,
            DT: data,
            EM: 'Get admin dashboard data !'
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

const getCustomerData = async (item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let customerList = await db.Customer.findAll({
                raw: true,
                nest: true,
                attributes: ['id', 'name', 'mobile', 'email']
            });

            const listLength = customerList.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            customerList.reverse();

            let customerDataPangination = _(customerList).drop(offSet).take(item_limit).value();

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
                    customer_list: customerDataPangination
                },
                EM: 'Get customer data !'
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

const getCustomerSearch = async (search_content) => {
    try {
        let customerList = await db.Customer.findAll({
            raw: true,
            attributes: ['id', 'name', 'mobile', 'email'],
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: search_content
                        }
                    },
                    {
                        mobile: {
                            [Op.substring]: search_content
                        }
                    }
                ]

            }
        });

        return {
            EC: 0,
            DT: {
                customer_list: customerList
            },
            EM: 'Get customer data search !'
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

const getSellerData = async (item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let sellerList = await db.Seller.findAll({
                raw: true,
                attributes: ['id', 'name', 'shopName', 'mobile', 'email']
            });

            const listLength = sellerList.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            sellerList.reverse();

            let sellerDataPangination = _(sellerList).drop(offSet).take(item_limit).value();

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
                    seller_list: sellerDataPangination
                },
                EM: 'Get seller data !'
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

const getSellerSearch = async (search_content) => {
    try {
        let seller_list = await db.Seller.findAll({
            raw: true,
            attributes: ['id', 'name', 'shopName', 'mobile', 'email'],
            where: {
                [Op.or]: [
                    {
                        shopName: {
                            [Op.substring]: search_content
                        }
                    },
                    {
                        mobile: {
                            [Op.substring]: search_content
                        }
                    }
                ]

            }
        });

        return {
            EC: 0,
            DT: {
                seller_list: seller_list
            },
            EM: 'Get shop data search !'
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

const getShippingUnitData = async (item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let suList = await db.ShippingUnit.findAll({
                raw: true,
                attributes: ['id', 'nameUnit', 'address', 'mobile', 'description']
            });

            const listLength = suList.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            suList.reverse();

            let suPangination = _(suList).drop(offSet).take(item_limit).value();

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
                    su_list: suPangination
                },
                EM: 'Get shipping unit data !'
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

const getShippingUnitSearch = async (search_content) => {
    try {
        let suList = await db.ShippingUnit.findAll({
            raw: true,
            attributes: ['id', 'nameUnit', 'address', 'mobile', 'description'],
            where: {
                [Op.or]: [
                    {
                        nameUnit: {
                            [Op.substring]: search_content
                        }
                    },
                    {
                        mobile: {
                            [Op.substring]: search_content
                        }
                    }
                ]

            }
        });

        return {
            EC: 0,
            DT: {
                su_list: suList
            },
            EM: 'Get shipping unit data search !'
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

const createShippingUnit = async (data) => {
    try {

        if (data.mobile.length < 10 || data.mobile.length > 11) {
            return {
                EC: -1,
                DT: "",
                EM: "Số điện thoại không hợp lệ"
            }
        }

        let existSUName = await db.ShippingUnit.findOne({
            raw: true,
            where: {
                nameUnit: {
                    [Op.eq]: data.nameUnit
                }
            }
        });

        if (existSUName) {
            return {
                EC: -1,
                DT: "",
                EM: "Tên đơn vị đã tồn tại"
            }
        }

        let existUsername = await db.User.findOne({
            raw: true,
            where: {
                username: {
                    [Op.eq]: data.username
                }
            }
        });

        if (existUsername) {
            return {
                EC: -1,
                DT: "",
                EM: "Tên tài khoản đã tồn tại"
            }
        }

        let userInfo = await db.User.create({
            username: data.username,
            password: hashPassword(data.password),
            role: 4,
            registeredAt: new Date()
        });

        if (userInfo) {
            let user_info = userInfo.dataValues;

            await db.ShippingUnit.create({
                nameUnit: data.nameUnit,
                address: data.address,
                mobile: data.mobile,
                description: data.description,
                userID: user_info.id
            });

            return {
                EC: 0,
                DT: "",
                EM: 'Thêm mới đơn vị thành công !'
            }
        }

        return {
            EC: -1,
            DT: "",
            EM: 'Lỗi thêm mới đơn vị !'
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

const updateShippingUnit = async (data) => {
    try {

        await db.ShippingUnit.update({
            nameUnit: data.nameUnit,
            address: data.address,
            mobile: data.mobile,
            description: data.description,
        }, {
            where: {
                id: +data.id
            }
        });

        return {
            EC: 0,
            DT: "",
            EM: 'Cập nhật đơn vị thành công!'
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateShippingUnitPassword = async (data) => {
    try {

        let { su_id, old_password, new_password } = data;
        
        let suInfo = await db.ShippingUnit.findOne({
            raw: true,
            attributes: ['userID'],
            where: {
                id: {
                    [Op.eq]: +su_id
                }
            }
        })

        if (suInfo) {
            let user_id = suInfo.userID;

            let userInfo = await db.User.findOne({
                raw: true,
                attributes: ['password'],
                where: {
                    id: {
                        [Op.eq]: +user_id
                    }
                }
            });

            let user_password = userInfo.password;
            if (checkPassword(old_password, user_password)) {

                await db.User.update({
                    password: hashPassword(new_password),
                }, {
                    where: {
                        id: {
                            [Op.eq]: +user_id
                        }
                    }
                });

                return {
                    EC: 0,
                    DT: "",
                    EM: 'Thay đổi mật khẩu thành công!'
                }
            } else {
                return {
                    EC: -1,
                    DT: "",
                    EM: 'Mật khẩu cũ không đúng!'
                }
            }
        }
        return {
            EC: -1,
            DT: "",
            EM: 'Đơn vị vận chuyển không tồn tại!'
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAnalysisProduct, getAnalysisProductSearch, getDashboardData,
    getCustomerData, getCustomerSearch, getSellerData, getSellerSearch,
    getShippingUnitData, getShippingUnitSearch, createShippingUnit, updateShippingUnit, updateShippingUnitPassword
}