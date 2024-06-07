const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getProductDetail = async (product_id) => {
    try {

        let productInfo = await db.Product.findOne({
            raw: true,
            attributes: ['id', 'name', 'summary'],
            where: {
                id: {
                    [Op.eq]: product_id,
                },
            },
        });

        let subCategoryInfo = await db.ProductSubCategory.findOne({
            raw: true,
            nest: true,
            attributes: ['id'],
            include: [
                {
                    model: db.SubCategory,
                    attributes: ['id', 'title'],
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: db.Seller,
                            attributes: ['id', 'shopName']
                        },
                        {
                            model: db.Category,
                            attributes: ['id', 'title']
                        }
                    ]
                },
            ],
            where: {
                productID: {
                    [Op.eq]: productInfo.id,
                },
            },
        });

        let sub_category = subCategoryInfo.SubCategory;
        let category = sub_category.Category;
        let shopInfo = sub_category.Seller;

        delete sub_category.Category;
        delete sub_category.Seller;

        let productDetail = await db.ProductType.findOne({
            raw: true,
            attributes: ['id', 'quantity', 'currentPrice', 'price', 'sold'],
            where: {
                productID: {
                    [Op.eq]: product_id,
                },
            }
        });

        // let productImage = await db.Image.findOne({
        //     raw: true,
        //     nest: true,
        //     attributes: ['id', 'image'],
        //     where: {
        //         productID: {
        //             [Op.eq]: product_id
        //         }
        //     }
        // });

        let finalData = {
            id: product_id,
            name: productInfo.name,
            currentPrice: productDetail.currentPrice,
            price: productDetail.price,
            sold: productDetail.price,
            description: productInfo.summary,
            //product_image: productImage?.image ? productImage?.image : "",
            product_image: "",
            inventory_count: productDetail.quantity,
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

const getProductsImage = async (data) => {
    try {
        // let productListWithImage = await data.map(async item => {
        //     let productImage = await db.Image.findOne({
        //         raw: true,
        //         attributes: ['id', 'image'],
        //         where: {
        //             productID: {
        //                 [Op.eq]: item.id
        //             }
        //         }
        //     });

        //     if (productImage) {
        //         return {
        //             ...item, image: productImage.image
        //         }
        //     }

        //     return {
        //         ...item, image: ""
        //     }
        // });

        // console.log(productListWithImage);

        return {
            EC: 0,
            DT: data,
            EM: 'Products With Image !'
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
                        attributes: ['id', 'name', 'summary'],
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
                    summary: item.Product.summary ? item.Product.summary : "",
                    sub_category: sub_category
                }
            });

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price', 'sold'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                // let productImage = await db.Image.findOne({
                //     raw: true,
                //     nest: true,
                //     attributes: ['id', 'image'],
                //     where: {
                //         productID: {
                //             [Op.eq]: item.id
                //         }
                //     }
                // });

                let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'rating'],
                    where: {
                        productID: {
                            [Op.eq]: item.id,
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

                let rating_average = Math.round(parseFloat((star_ratings['1'] + star_ratings['2'] * 2 + star_ratings['3'] * 3 + star_ratings['4'] * 4 + star_ratings['5'] * 5) / count) * 10) / 10;

                return {
                    ...item,
                    //image: productImage?.image ? productImage?.image : "",
                    image: "",
                    current_price: productType.currentPrice,
                    price: productType.price,
                    sold: productType.sold,
                    rating: rating_average
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
                        attributes: ['id', 'name', 'summary'],
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
                    summary: item.Product.summary ? item.Product.summary : "",
                    sub_category: sub_category
                }
            });

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price', 'sold'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                // let productImage = await db.Image.findOne({
                //     raw: true,
                //     nest: true,
                //     attributes: ['id', 'image'],
                //     where: {
                //         productID: {
                //             [Op.eq]: item.id
                //         }
                //     }
                // });

                let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'rating'],
                    where: {
                        productID: {
                            [Op.eq]: item.id,
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

                let rating_average = Math.round(parseFloat((star_ratings['1'] + star_ratings['2'] * 2 + star_ratings['3'] * 3 + star_ratings['4'] * 4 + star_ratings['5'] * 5) / count) * 10) / 10;

                return {
                    ...item,
                    //image: productImage?.image ? productImage?.image : "",
                    image: "",
                    current_price: productType.currentPrice,
                    price: productType.price,
                    sold: productType.sold,
                    rating: rating_average
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

const getSearchProductsWithPagination = async (content, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let productListRaw = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'summary'],
                where: {
                    name: {
                        [Op.substring]: `${content}`
                    }
                },
            });

            const listLength = productListRaw.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let productListFinal = await productListRaw.map(item => {

                return {
                    id: item.id,
                    name: item.name,
                    summary: item.summary ? item.summary : "",
                }
            });

            let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price', 'sold'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                // let productImage = await db.Image.findOne({
                //     raw: true,
                //     nest: true,
                //     attributes: ['id', 'image'],
                //     where: {
                //         productID: {
                //             [Op.eq]: item.id
                //         }
                //     }
                // });

                let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'rating'],
                    where: {
                        productID: {
                            [Op.eq]: item.id,
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

                let rating_average = Math.round(parseFloat((star_ratings['1'] + star_ratings['2'] * 2 + star_ratings['3'] * 3 + star_ratings['4'] * 4 + star_ratings['5'] * 5) / count) * 10) / 10;

                return {
                    ...item,
                    //image: productImage?.image ? productImage?.image : "",
                    image: "",
                    current_price: productType.currentPrice,
                    price: productType.price,
                    sold: productType.sold,
                    rating: rating_average
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
                EM: 'Get products by search !'
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

const getProductReviews = async (product_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                raw: true,
                nest: true,
                attributes: ['id', 'comment', 'rating', 'createdAt'],
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

            let rating_average = Math.round(parseFloat((star_ratings['1'] + star_ratings['2'] * 2 + star_ratings['3'] * 3 + star_ratings['4'] * 4 + star_ratings['5'] * 5) / count) * 10) / 10;

            const pageTotal = Math.ceil(productReviewList.length / item_limit);

            let productListRaw = [];

            productListRaw = _.cloneDeep(productReviewList);
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
                    total_ratings: count,
                    rating_average: rating_average,
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
    getProductDetail, getProductReviews, getProductsImage, getSearchProductsWithPagination
}