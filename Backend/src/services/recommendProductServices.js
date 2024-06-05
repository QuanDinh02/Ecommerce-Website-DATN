const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const createRecommendProducts = async (data) => {
    try {

        await db.RecommendProduct.bulkCreate(data);

        return {
            EC: 0,
            DT: "",
            EM: 'Save recommend products !'
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

const createHistoryRecommendItem = async (customer_id) => {
    try {

        let productList = await db.RecommendProduct.findAll({
            raw: true,
            attributes: ['id', 'product_id'],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        if (productList && productList.length > 0) {
            let history_create_time = new Date();

            let history_data = productList.map(item => {
                return {
                    product_id: +item.product_id,
                    customerID: +customer_id,
                    createdAt: history_create_time
                }
            });

            let result = await db.HistoryRecommendProduct.bulkCreate(history_data);
            if (result) {

                await db.RecommendProduct.destroy({
                    where: {
                        customerID: {
                            [Op.eq]: customer_id,
                        },
                    },
                });

                return {
                    EC: 0,
                    DT: "",
                    EM: 'Backup recommend item successfully !'
                }
            }
            else {
                return {
                    EC: -1,
                    DT: "",
                    EM: 'Backup recommend item failed !'
                }
            }

        }

        return {
            EC: 0,
            DT: "",
            EM: 'Save recommend products !'
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

const updateTrainingRecommendItemStatus = async (customer_id, status_code) => {
    try {

        await db.TrainingData.update({
            active: status_code
        }, {
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Update training customer recommend item status !'
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

const getTrainingRecommendItemStatus = async (customer_id) => {
    try {

        let result = await db.TrainingData.findOne({
            raw: true,
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        if (result) {
            return {
                EC: 0,
                DT: result,
                EM: 'Training customer recommend item status !'
            }
        }
        return {
            EC: -1,
            DT: [],
            EM: 'Training customer recommend item is not existed !'
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

const getRecommendProducts = async (customer_id) => {
    try {
        let productListRaw = await db.RecommendProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'summary'],
                    raw: true,
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        productListRaw = _(productListRaw).take(20).value();

        let productListFinal = await productListRaw.map(item => {
            return {
                id: item.Product.id,
                name: item.Product.name,
                summary: item.Product.summary ? item.Product.summary : ""
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
                product_list: productListFinalWithImage
            },
            EM: 'Get recommend products !'
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

const getHistoryRecommendProducts = async (customer_id) => {
    try {
        let productListRaw = await db.HistoryRecommendProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'summary'],
                    raw: true,
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        productListRaw = _(productListRaw).take(20).value();

        let productListFinal = await productListRaw.map(item => {
            return {
                id: item.Product.id,
                name: item.Product.name,
                summary: item.Product.summary ? item.Product.summary : ""
            }
        });

        let arrayOfObjAfter = _.map(
            _.uniq(
                _.map(productListFinal, function (obj) {
                    return JSON.stringify(obj);
                })
            ), function (obj) {
                return JSON.parse(obj);
            }
        );

        let productListFinalWithImage = await Promise.all(arrayOfObjAfter.map(async item => {

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
                product_list: productListFinalWithImage
            },
            EM: "Recommend data backup !"
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
    createRecommendProducts, getRecommendProducts, getTrainingRecommendItemStatus, updateTrainingRecommendItemStatus,
    getHistoryRecommendProducts, createHistoryRecommendItem
}