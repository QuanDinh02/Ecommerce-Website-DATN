const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

require('dotenv').config()

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

const createRecommendProducts = async (customer_id, data) => {
    try {

        console.log(">>> create data predict.py : ", data);

        await db.RecommendProduct.bulkCreate(data);

        await updateTrainingRecommendItemStatus(+customer_id, 0);

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

const create3SessionRecommendProducts = async (customer_id, data) => {
    try {

        console.log(">>> create data after3Session.py : ", data);
        await db.RecommendThreeSessionProduct.bulkCreate(data);

        await updateTraining3SessionRecommendItemStatus(+customer_id, 0);

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

        let productList_1 = await db.RecommendProduct.findAll({
            raw: true,
            attributes: ['id', 'product_id'],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let productList_2 = await db.RecommendThreeSessionProduct.findAll({
            raw: true,
            attributes: ['id', 'product_id'],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let productList = [..._.cloneDeep(productList_2), ..._.cloneDeep(productList_1)];

        if (productList && productList.length > 0) {
            let history_create_time = new Date();

            let history_data = productList.map(item => {
                return {
                    product_id: +item.product_id,
                    customerID: +customer_id,
                    createdAt: history_create_time
                }
            });

            let dataFormat = history_data.filter(item => item.product_id !== 0);

            let result = await db.HistoryRecommendProduct.bulkCreate(dataFormat);
            if (result) {

                await db.RecommendProduct.destroy({
                    where: {
                        customerID: {
                            [Op.eq]: customer_id,
                        },
                    },
                });

                await db.RecommendThreeSessionProduct.destroy({
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

const clearHistoryRecommendItem = async (customer_id) => {
    try {

        await db.HistoryRecommendProduct.destroy({
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        return {
            EC: 0,
            DT: "",
            EM: 'Clear Backup recommend item successfully !'
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

        await db.TrainingWebData.update({
            activePredict: status_code
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

const updateTraining3SessionRecommendItemStatus = async (customer_id, status_code) => {
    try {

        await db.TrainingWebData.update({
            activePredict3Session: status_code
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

        let result = await db.TrainingWebData.findOne({
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

const getBothRecommendProducts = async (customer_id) => {
    try {
        let productListRaw_1 = await db.RecommendProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'summary'],
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: db.Seller,
                            attributes: ['id', 'shopName']
                        },
                        {
                            model: db.ProductRating,
                            attributes: ['rating'],
                        }
                    ],
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let productListRaw_2 = await db.RecommendThreeSessionProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'summary'],
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: db.Seller,
                            attributes: ['id', 'shopName']
                        },
                        {
                            model: db.ProductRating,
                            attributes: ['rating'],
                        }
                    ],
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let productListRaw = [..._.cloneDeep(productListRaw_2), ..._.cloneDeep(productListRaw_1)];

        let productListFinal = await productListRaw.map(item => {

            let seller_info = {
                id: item.Product.Seller.id,
                name: item.Product.Seller.shopName,
            }

            return {
                id: item.Product.id,
                name: item.Product.name,
                summary: item.Product.summary ? item.Product.summary : "",
                seller_info: seller_info,
                rating: item.Product.ProductRating.rating
            }
        });

        handleSaveRecommendCount(productListFinal);

        let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

            let productType = await db.ProductType.findOne({
                raw: true,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                where: {
                    productID: {
                        [Op.eq]: item.id
                    }
                }
            });

            const getObjectParams = {
                Bucket: bucketName,
                Key: `${item.id}.jpeg`
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                ...item,
                image: url,
                current_price: productType.currentPrice,
                price: productType.price,
                sold: productType.sold,
                quantity: productType.quantity
            }
        }));

        return {
            EC: 0,
            DT: {
                product_list: productListFinalWithImage
            },
            EM: 'Get recommend products from 2 training !'
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
                    nest: true,
                    include: [{
                        model: db.Seller,
                        attributes: ['id', 'shopName']
                    },
                    {
                        model: db.ProductRating,
                        attributes: ['rating'],
                    }
                    ],
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let productListFinal = await productListRaw.map(item => {

            let seller_info = {
                id: item.Product.Seller.id,
                name: item.Product.Seller.shopName,
            }

            return {
                id: item.Product.id,
                name: item.Product.name,
                summary: item.Product.summary ? item.Product.summary : "",
                seller_info: seller_info,
                rating: item.Product.ProductRating.rating
            }
        });

        handleSaveRecommendCount(productListFinal);

        let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

            let productType = await db.ProductType.findOne({
                raw: true,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                where: {
                    productID: {
                        [Op.eq]: item.id
                    }
                }
            });

            const getObjectParams = {
                Bucket: bucketName,
                Key: `${item.id}.jpeg`
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                ...item,
                image: url,
                current_price: productType.currentPrice,
                price: productType.price,
                sold: productType.sold,
                quantity: productType.quantity
            }
        }));

        return {
            EC: 0,
            DT: {
                product_list: productListFinalWithImage
            },
            EM: 'Get recommend products from training predict !'
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

const get3SessionRecommendProducts = async (customer_id) => {
    try {
        let productListRaw = await db.RecommendThreeSessionProduct.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'product_id'],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'summary'],
                    raw: true,
                    nest: true,
                    include: [{
                        model: db.Seller,
                        attributes: ['id', 'shopName']
                    },
                    {
                        model: db.ProductRating,
                        attributes: ['rating'],
                    }
                    ],
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let productListFinal = await productListRaw.map(item => {

            let seller_info = {
                id: item.Product.Seller.id,
                name: item.Product.Seller.shopName,
            }

            return {
                id: item.Product.id,
                name: item.Product.name,
                summary: item.Product.summary ? item.Product.summary : "",
                seller_info: seller_info,
                rating: item.Product.ProductRating.rating
            }
        });

        handleSaveRecommendCount(productListFinal);

        let productListFinalWithImage = await Promise.all(productListFinal.map(async item => {

            let productType = await db.ProductType.findOne({
                raw: true,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                where: {
                    productID: {
                        [Op.eq]: item.id
                    }
                }
            });

            const getObjectParams = {
                Bucket: bucketName,
                Key: `${item.id}.jpeg`
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                ...item,
                image: url,
                current_price: productType.currentPrice,
                price: productType.price,
                sold: productType.sold,
                quantity: productType.quantity
            }
        }));

        return {
            EC: 0,
            DT: {
                product_list: productListFinalWithImage
            },
            EM: 'Get recommend products from training predict 3 session !'
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
                    nest: true,
                    include: [{
                        model: db.Seller,
                        attributes: ['id', 'shopName']
                    },
                    {
                        model: db.ProductRating,
                        attributes: ['rating'],
                    }
                    ],
                },
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        //productListRaw = _(productListRaw).take(20).value();

        let productListFinal = await productListRaw.map(item => {

            let seller_info = {
                id: item.Product.Seller.id,
                name: item.Product.Seller.shopName,
            }

            return {
                id: item.Product.id,
                name: item.Product.name,
                summary: item.Product.summary ? item.Product.summary : "",
                seller_info: seller_info,
                rating: item.Product.ProductRating.rating
            }
        });

        handleSaveRecommendCount(productListFinal);

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
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                where: {
                    productID: {
                        [Op.eq]: item.id
                    }
                }
            });

            const getObjectParams = {
                Bucket: bucketName,
                Key: `${item.id}.jpeg`
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                ...item,
                image: url,
                current_price: productType.currentPrice,
                price: productType.price,
                sold: productType.sold,
                quantity: productType.quantity
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

const getRelevantRecommendProducts = async (item_id) => {
    try {

        let relevant_product_list = await db.SimItem.findAll({
            raw: true,
            attributes: ['id', 'item_rec'],
            where: {
                item_id: {
                    [Op.eq]: item_id
                }
            }
        });

        handleSaveRelevantItemRecommendCount(relevant_product_list);

        let productList = await Promise.all(relevant_product_list.map(async item => {

            let productExist = await db.Product.findOne({
                raw: true,
                attributes: ['id'],
                where: {
                    id: {
                        [Op.eq]: item.item_rec
                    }
                }
            });

            if (productExist) {
                let productInfo = await db.Product.findOne({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'name', 'summary', 'shop_id'],
                    include: [{
                        model: db.Seller,
                        attributes: ['id', 'shopName']
                    },
                    {
                        model: db.ProductRating,
                        attributes: ['rating'],
                    }
                    ],
                    where: {
                        id: {
                            [Op.eq]: item.item_rec
                        }
                    }
                });

                let seller_info = {
                    id: productInfo.Seller.id,
                    name: productInfo.Seller.shopName,
                }

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                    where: {
                        productID: {
                            [Op.eq]: item.item_rec
                        }
                    }
                });

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: `${item.item_rec}.jpeg`
                }

                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                return {
                    id: productInfo.id,
                    name: productInfo.name,
                    seller_info: seller_info,
                    summary: productInfo.summary,
                    image: url,
                    current_price: productType.currentPrice,
                    price: productType.price,
                    sold: productType.sold,
                    rating: productInfo.ProductRating.rating,
                    quantity: productType.quantity
                }
            }
            else {
                return null;
            }
        }));

        let productFinal = productList.filter(item => item !== null);

        return {
            EC: 0,
            DT: {
                product_list: productFinal
            },
            EM: "Recommend relevant products !"
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

const handleSaveRecommendCount = (product_list) => {
    try {
        product_list.map(product => {
            db.ProductTracking.increment({ recommend: 1 }, { where: { productID: product.id } });
        });

    } catch (error) {
        console.log(error);
        return null;
    }
}

const handleSaveRelevantItemRecommendCount = async (product_list) => {
    try {
        await Promise.all(product_list.map(async product => {
            await db.ProductTracking.increment({ recommend: 1 }, { where: { productID: product.item_rec } });
        }));

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createRecommendProducts, getTrainingRecommendItemStatus, updateTrainingRecommendItemStatus,
    getHistoryRecommendProducts, createHistoryRecommendItem, create3SessionRecommendProducts, updateTraining3SessionRecommendItemStatus,
    getRecommendProducts, get3SessionRecommendProducts, getBothRecommendProducts, clearHistoryRecommendItem, getRelevantRecommendProducts
}