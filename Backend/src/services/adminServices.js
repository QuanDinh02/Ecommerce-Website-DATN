const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

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

module.exports = {
    getAnalysisProduct, getAnalysisProductSearch
}