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

            let { count, rows: productListRaw } = await db.SubCategory.findAndCountAll({
                raw: true,
                nest: true,
                attributes: [],
                include: {
                    model: db.Product,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
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

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productTypes = await db.ProductType.findAll({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                let { currentPrice } = _.minBy(productTypes, (o) => {
                    return o.currentPrice;
                })

                let { price } = _.minBy(productTypes, (o) => {
                    return o.price;
                })

                let productImages = await db.Image.findOne({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'image'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });
                return {
                    ...item,
                    image: productImages.image,
                    current_price: currentPrice,
                    price: price
                }
            }));

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: count,
                    product_list: productListFinalWithImage
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

            let { count, rows: productListRaw } = await db.SubCategory.findAndCountAll({
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

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productTypes = await db.ProductType.findAll({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                let { currentPrice } = _.minBy(productTypes, (o) => {
                    return o.currentPrice;
                })

                let { price } = _.minBy(productTypes, (o) => {
                    return o.price;
                })

                let productImages = await db.Image.findOne({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'image'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });
                return {
                    ...item,
                    image: productImages.image,
                    current_price: currentPrice,
                    price: price
                }
            }));

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: count,
                    product_list: productListFinalWithImage
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

const putUpdateProductImage = async (data) => {
    try {
        let { id, image } = data;

        let existImage = await db.Image.findOne({
            where: {
                id: +id
            },
            attributes: ['id'],
            raw: true
        })

        if (!_.isEmpty(existImage)) {

            let result = await db.Image.update({
                image: image
            }, {
                where: {
                    id: +id
                }
            });
            return {
                EC: 0,
                EM: 'Update product image successfully !',
                DT: ''
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            EM: 'Something is wrong on services !',
            DT: ''
        }
    }
}


module.exports = {
    getProductsByCategory, getProductsBySubCategory,
    putUpdateProductImage
}