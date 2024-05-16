const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getProductDetail = async (product_id) => {
    try {

        let productInfo = await db.Product.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'summary'],
            include: [
                {
                    raw: true,
                    nest: true,
                    model: db.SubCategory,
                    attributes: ['id', 'title'],
                    through: { attributes: [] },
                    include: {
                        raw: true,
                        model: db.Category,
                        attributes: ['id', 'title'],
                    }
                },
                {
                    model: db.Seller,
                    attributes: ['id', 'shopName'],
                },
            ],
            where: {
                id: {
                    [Op.eq]: product_id,
                },
            },
        });

        let sub_category = productInfo.SubCategories;
        let category = sub_category.Category;
        let shopInfo = productInfo.Seller;

        delete sub_category.Category;

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

        let colors = _.chain(productTypesList).map('color').uniq().value();
        let sizes = _.chain(productTypesList).map('size').uniq().value();

        let { currentPrice } = _.minBy(productTypesList, (o) => {
            return o.currentPrice;
        })

        let { price } = _.minBy(productTypesList, (o) => {
            return o.price;
        })

        let commentList = await Promise.all(productTypesList.map(async item => {

            // let productReviews = await db.ProductReview.findAll({
            //     raw: true,
            //     nest: true,
            //     attributes: ['id', 'comment', 'rating', 'createdAt'],
            //     include: {
            //         model: db.Customer,
            //         attributes: ['id', 'name'],
            //     },
            //     where: {
            //         productTypeID: {
            //             [Op.eq]: item.id
            //         }
            //     }
            // });

            let productReviews = [];

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

            // let productReviewRebuildData = await productReviews.map(item => {
            //     let customer_info = item.Customer;
            //     delete item.Customer;

            //     return {
            //         ...item, customer_name: customer_info.name
            //     }
            // })

            return {
                product_type_id: item.id,
                reviews: productReviews
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
                color: colors.length === 1 && colors[0] === '' ? [] : colors,
                size: sizes.length === 1 && sizes[0] === '' ? [] : sizes
            },
            sub_category: sub_category,
            category: category,
            shop_info: {
                id: shopInfo.id,
                name: shopInfo.shopName
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

            let productListRaw = await db.ProductSubCategory.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Product,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: db.SubCategory,
                        attributes: ['id', 'title'],
                    }
                ],
                where: {
                    subCategoryID: {
                        [Op.in]: subCategoryIdList,
                    },
                }
            });

            const listLength = productListRaw.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let productListFinal = await productListRaw.map(item => {

                let sub_category = {
                    id: item.SubCategory.id,
                    name: item.SubCategory.title
                }

                return {
                    id: item.Product.id,
                    name: item.Product.name,
                    sub_category: sub_category
                }
            });

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                let productImage = await db.Image.findOne({
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
                    image: productImage?.image ? productImage?.image : "",
                    current_price: productType.currentPrice,
                    price: productType.price
                }
            }));

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
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

            let productListRaw = await db.ProductSubCategory.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Product,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: db.SubCategory,
                        attributes: ['id', 'title'],
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

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let productListFinal = await productListRaw.map(item => {

                let sub_category = {
                    id: item.SubCategory.id,
                    name: item.SubCategory.title
                }

                return {
                    id: item.Product.id,
                    name: item.Product.name,
                    sub_category: sub_category
                }
            });

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                let productImage = await db.Image.findOne({
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
                    image: productImage?.image ? productImage?.image : "",
                    current_price: productType.currentPrice,
                    price: productType.price
                }
            }));

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
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

const getProductReviews = async (product_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                raw: true,
                nest: true,
                attributes: ['id', 'comment', 'rating'],
                include: {
                    model: db.Customer,
                    attributes: ['id', 'name']
                },
                where: {
                    productID: {
                        [Op.eq]: product_id,
                    },
                }
            });

            let star_ratings = {
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0,
            }

            await productReviewList.forEach(item => {
                star_ratings[`${item.rating}`] += 1;
            });

            const pageTotal = Math.ceil(productReviewList.length / item_limit);

            let productListRaw = [];

            productListRaw = productReviewList.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let finalData = productListRaw.map(item => {
                let customer = item.Customer;
                if (!customer.id) {
                    delete item.Customer;

                    return {
                        ...item, customer: null
                    }
                } else {
                    return {
                        ...item, customer: customer
                    }
                }
            })

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: count,
                    ratings: star_ratings,
                    product_reviews: finalData
                },
                EM: 'Get product reviews !'
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
    getProductsByCategory, getProductsBySubCategory,
    putUpdateProductImage, getSearchProducts,
    getProductDetail, getProductReviews
}