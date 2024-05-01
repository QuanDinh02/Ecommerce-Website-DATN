const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getProductDetail = async (product_id) => {
    try {

        let productInfo = await db.Product.findOne({
            raw: true,
            attributes: ['id', 'name','summary'],
            where: {
                id: {
                    [Op.eq]: product_id,
                },
            },
        });

        let productTypesList = await db.ProductType.findAll({
            raw: true,
            attributes: ['id', 'type', 'typeName', 'quantity', 'size', 'color', 'currentPrice', 'price'],
            where: {
                productID: {
                    [Op.eq]: product_id,
                },
            }
        });

        let productImage = await db.Image.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'image'],
            where: {
                productID: {
                    [Op.eq]: product_id
                }
            }
        });

        const colors = _.chain(productTypesList).map('color').uniq().value();
        const sizes = _.chain(productTypesList).map('size').uniq().value();

        let { currentPrice } = _.minBy(productTypesList, (o) => {
            return o.currentPrice;
        })

        let { price } = _.minBy(productTypesList, (o) => {
            return o.price;
        })

        let commentList = await Promise.all(productTypesList.map(async item => {

            let productReviews = await db.ProductReview.findAll({
                raw: true,
                nest: true,
                attributes: ['id', 'comment', 'rating', 'createdAt'],
                include: {
                    model: db.Customer,
                    attributes: ['id', 'name'],
                },
                where: {
                    productTypeID: {
                        [Op.eq]: item.id
                    }
                }
            });

            // let productReviewRebuildData = productReviews.map(item => {
            //     let customer_info = item.Customer;
            //     delete item.Customer;

            //     return {
            //         ...item, customer_name: customer_info.name
            //     }
            // })

            // return {
            //     product_type_id: item.id,
            //     reviews: productReviewRebuildData
            // }

            let productReviewRebuildData = await productReviews.map(item => {
                let customer_info = item.Customer;
                delete item.Customer;

                return {
                    ...item, customer_name: customer_info.name
                }
            })

            return {
                product_type_id: item.id,
                reviews: productReviewRebuildData
            }
        }));

        let allProductsReview = [];

        commentList.forEach(item => {
            allProductsReview = [...allProductsReview, ...item.reviews]
        });
        
        let comment_count = allProductsReview.length;
        let sum_rating = _.sumBy(allProductsReview, function (o) { return o.rating; });
        let inventoryCount = _.sumBy(productTypesList, function (o) { return o.quantity; });

        let finalData = {
            id: product_id,
            name: productInfo.name,
            currentPrice: currentPrice,
            price: price,
            description: productInfo.summary,
            comment_count: comment_count,
            rating_average: Math.round(parseFloat(sum_rating / comment_count) * 10) / 10,
            product_image: productImage.image,
            inventory_count: inventoryCount,
            reviews: allProductsReview,
            product_type_list: productTypesList,
            product_type_group: {
                color: colors,
                size: sizes
            }
        }

        return {
            EC: 0,
            DT: finalData,
            EM: 'Product Detail Info !'
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

const getSearchProducts = async (product_name) => {
    try {
        const productList = await db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: `${product_name}`
                }
            },
            limit: 25,
            attributes: ['id', 'name'],
            raw: true
        })

        return {
            EC: 0,
            DT: productList,
            EM: 'Search products successfully'
        }

    } catch (error) {
        return {
            EC: -2,
            EM: 'Something is wrong on services !',
            DT: ''
        }
    }
}
module.exports = {
    getProductsByCategory, getProductsBySubCategory,
    putUpdateProductImage, getSearchProducts,
    getProductDetail
}