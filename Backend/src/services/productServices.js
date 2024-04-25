const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getProductsByCategory = async (category_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let subCategoryByCategoryList = await db.SubCategory.findAll({
                raw: true,
                attributes: ['id', 'title'],
                where: {
                    categoryID: {
                        [Op.eq]: category_id,
                    },
                },
            });

            let subCategoryIdList = await subCategoryByCategoryList.map(item => {
                return item.id;
            })

            let productListRaw = await db.SubCategory.findAll({
                raw: true,
                nest: true,
                attributes: [],
                include: {
                    model: db.Product,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
                where: {
                    id: {
                        [Op.in]: subCategoryIdList,
                    },
                }
            });
         
            const pageTotal = Math.ceil(productListRaw.length / item_limit);

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let productListFinal = [];

            await productListRaw.forEach(item => {
                let product = item.Products;
                if (product.id != null) {
                    productListFinal = [...productListFinal, product];
                }
            });

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    product_list: productListFinal
                },
                EM: 'Get products by category !'
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

const getProductsBySubCategory = async (sub_category_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let productListRaw = await db.SubCategory.findAll({
                raw: true,
                nest: true,
                attributes: [],
                include: {
                    model: db.Product,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
                where: {
                    id: {
                        [Op.eq]: sub_category_id,
                    },
                }
            });
         
            const pageTotal = Math.ceil(productListRaw.length / item_limit);

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let productListFinal = [];

            await productListRaw.forEach(item => {
                let product = item.Products;
                if (product.id != null) {
                    productListFinal = [...productListFinal, product];
                }
            });

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    product_list: productListFinal
                },
                EM: 'Get products by sub-category !'
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

module.exports = {
    getProductsByCategory, getProductsBySubCategory
}