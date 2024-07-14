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
                    include: {
                        model: db.Category,
                        attributes: ['id', 'title']
                    }
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

        const getObjectParams = {
            Bucket: bucketName,
            Key: `${product_id}.jpeg`
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        let finalData = {
            id: product_id,
            name: productInfo.name,
            currentPrice: productDetail.currentPrice,
            price: productDetail.price,
            sold: productDetail.sold,
            description: productInfo.summary,
            product_image: url,
            inventory_count: productDetail.quantity,
            sub_category: sub_category,
            category: category,
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

const getProductDetailShopInfo = async (product_id) => {
    try {

        let productInfo = await db.Product.findOne({
            raw: true,
            attributes: ['shop_id'],
            where: {
                id: {
                    [Op.eq]: product_id,
                },
            },
        });

        if (productInfo) {
            let shopID = productInfo.shop_id;

            let shop_info = await db.Seller.findOne({
                raw: true,
                nest: true,
                attributes: ['id', 'shopName'],
                include: [
                    {
                        model: db.User,
                        attributes: ['registeredAt'],
                    },
                ],
                where: {
                    id: {
                        [Op.eq]: shopID,
                    },
                },
            });

            let { count } = await db.Product.findAndCountAll({
                raw: true,
                where: {
                    shop_id: {
                        [Op.eq]: shopID,
                    },
                }
            });

            let shop_join_date = shop_info.User.registeredAt;

            const getObjectParams = {
                Bucket: bucketName,
                Key: `shop_${shop_info.id}.jpeg`
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                EC: 0,
                DT: {
                    id: shopID,
                    image: url,
                    shop_name: shop_info.shopName,
                    product_total: count,
                    shop_join_date: shop_join_date
                },
                EM: 'Shop info summary !'
            }
        }

        return {
            EC: 0,
            DT: null,
            EM: 'Shop info summary !'
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

const getShopInfo = async (shop_id) => {
    try {

        let shop_info = await db.Seller.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'shopName'],
            include: [
                {
                    model: db.User,
                    attributes: ['registeredAt'],
                },
            ],
            where: {
                id: {
                    [Op.eq]: shop_id,
                },
            },
        });

        let { count } = await db.Product.findAndCountAll({
            raw: true,
            where: {
                shop_id: {
                    [Op.eq]: shop_id,
                },
            }
        });

        let shop_join_date = shop_info.User.registeredAt;

        const getObjectParams = {
            Bucket: bucketName,
            Key: `shop_${shop_info.id}.jpeg`
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return {
            EC: 0,
            DT: {
                id: shop_id,
                image: url,
                shop_name: shop_info.shopName,
                product_total: count,
                shop_join_date: shop_join_date
            },
            EM: 'Shop info summary !'
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

const getProductsHistory = async (item_limit, page, data) => {
    try {

        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let productList = await Promise.all(data.map(async item => {

                let productExist = await db.Product.findOne({
                    raw: true,
                    attributes: ['id'],
                    where: {
                        id: {
                            [Op.eq]: item
                        }
                    }
                });

                if (productExist) {
                    let productInfo = await db.Product.findOne({
                        raw: true,
                        nest: true,
                        attributes: ['id', 'name', 'summary', 'shop_id'],
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
                        where: {
                            id: {
                                [Op.eq]: item
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
                                [Op.eq]: item
                            }
                        }
                    });

                    if (!productType) {
                        return null;
                    }
                    else {
                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `${item}.jpeg`
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
                }
                else {
                    return null;
                }

            }));

            let productFinal = productList.filter(item => item !== null);

            const listLength = productFinal.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            let limit_data = _(productFinal).drop(offSet).take(item_limit).value();

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    product_list: limit_data
                },
                EM: "History products !"
            }
        }
        return {
            EC: -1,
            DT: "",
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

const getProductsHistorySwiper = async (data) => {
    try {

        let productList = await Promise.all(data.map(async item => {

            let productExist = await db.Product.findOne({
                raw: true,
                attributes: ['id'],
                where: {
                    id: {
                        [Op.eq]: item
                    }
                }
            });

            if (productExist) {
                let productInfo = await db.Product.findOne({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'name', 'summary', 'shop_id'],
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
                    where: {
                        id: {
                            [Op.eq]: item
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
                            [Op.eq]: item
                        }
                    }
                });

                if (!productType) {
                    return null;
                }

                else {
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `${item}.jpeg`
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
            }
            else {
                return null;
            }
        }));

        let productFinal = productList.filter(item => item !== null);

        let limit_data = _(productFinal).take(20).value();

        return {
            EC: 0,
            DT: {
                product_list: limit_data
            },
            EM: "History products !"
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

const getProductsByCategory = async (category_id, item_limit, page, rating, minPrice, maxPrice) => {
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
            });

            if (rating === 0) {
                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
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
                                    model: db.ProductType,
                                    attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
                                }
                            ]
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

                let productListFinal = await productListRaw.map(item => {

                    let sub_category = {
                        id: item.SubCategory.id,
                        name: item.SubCategory.title
                    }

                    let seller_info = {
                        id: item.Product.Seller.id,
                        name: item.Product.Seller.shopName,
                    }

                    return {
                        id: item.Product.id,
                        name: item.Product.name,
                        summary: item.Product.summary ? item.Product.summary : "",
                        sub_category: sub_category,
                        seller_info: seller_info,
                        current_price: item.Product.ProductType.currentPrice,
                        price: item.Product.ProductType.price,
                        sold: item.Product.ProductType.sold,
                        quantity: item.Product.ProductType.quantity
                    }
                });

                let productListPriceFilter = [];

                if (minPrice === 0 && maxPrice === 0) {
                    productListPriceFilter = _.cloneDeep(productListFinal);
                }

                if (minPrice !== 0 && maxPrice === 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice);
                }

                if (minPrice === 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price <= maxPrice);
                }

                if (minPrice !== 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice && item.current_price <= maxPrice);
                }

                const listLength = productListPriceFilter.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListPriceFilter.reverse();
                productListPriceFilter = _(productListPriceFilter).drop(offSet).take(item_limit).value();

                let productListFinalWithImage = await Promise.all(productListPriceFilter.map(async item => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `${item.id}.jpeg`
                    }

                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    let productRating = await db.ProductRating.findOne({
                        raw: true,
                        attributes: ['id', 'rating'],
                        where: {
                            productID: {
                                [Op.eq]: item.id
                            }
                        }
                    });

                    let rating_average = productRating ? productRating.rating : 0;

                    return {
                        ...item,
                        image: url,
                        rating: rating_average,
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
            else {
                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
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
                                },
                                {
                                    model: db.ProductType,
                                    attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
                                }
                            ]
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

                let productListFinal = await productListRaw.map(item => {

                    let sub_category = {
                        id: item.SubCategory.id,
                        name: item.SubCategory.title
                    }

                    let seller_info = {
                        id: item.Product.Seller.id,
                        name: item.Product.Seller.shopName,
                    }

                    return {
                        id: item.Product.id,
                        name: item.Product.name,
                        summary: item.Product.summary ? item.Product.summary : "",
                        sub_category: sub_category,
                        seller_info: seller_info,
                        rating: item.Product.ProductRating.rating,
                        current_price: item.Product.ProductType.currentPrice,
                        price: item.Product.ProductType.price,
                        sold: item.Product.ProductType.sold,
                        quantity: item.Product.ProductType.quantity
                    }
                });

                let productListPriceFilter = [];

                if (minPrice === 0 && maxPrice === 0) {
                    productListPriceFilter = productListFinal.filter(item => item.rating >= rating);
                }

                if (minPrice !== 0 && maxPrice === 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice && item.rating >= rating);
                }

                if (minPrice === 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price <= maxPrice && item.rating >= rating);
                }

                if (minPrice !== 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice && item.current_price <= maxPrice && item.rating >= rating);
                }

                const listLength = productListPriceFilter.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListPriceFilter.reverse();
                productListPriceFilter = _(productListPriceFilter).drop(offSet).take(item_limit).value();

                let productListFinalWithImage = await Promise.all(productListPriceFilter.map(async item => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `${item.id}.jpeg`
                    }

                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    return {
                        ...item,
                        image: url
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

const getProductsByShopCategory = async (sub_category_id, shop_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (sub_category_id === 0) {
                let subCategoryByCategoryList = await db.SubCategory.findAll({
                    raw: true,
                    attributes: ['id', 'title'],
                    where: {
                        shopID: {
                            [Op.eq]: shop_id,
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
                            raw: true,
                            nest: true,
                            include: {
                                model: db.Seller,
                                attributes: ['id', 'shopName']
                            }
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

                    let seller_info = {
                        id: item.Product.Seller.id,
                        name: item.Product.Seller.shopName,
                    }

                    return {
                        id: item.Product.id,
                        name: item.Product.name,
                        summary: item.Product.summary ? item.Product.summary : "",
                        sub_category: sub_category,
                        seller_info: seller_info
                    }
                });

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

                    let productRating = await db.ProductRating.findOne({
                        raw: true,
                        attributes: ['id', 'rating'],
                        where: {
                            productID: {
                                [Op.eq]: item.id
                            }
                        }
                    });

                    let rating_average = productRating ? productRating.rating : 0;

                    return {
                        ...item,
                        image: url,
                        current_price: productType.currentPrice,
                        price: productType.price,
                        sold: productType.sold,
                        rating: rating_average,
                        quantity: productType.quantity
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
                    EM: 'Get products by all shop categories !'
                }
            }
            else {

                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: db.Product,
                            attributes: ['id', 'name', 'summary'],
                            raw: true,
                            nest: true,
                            include: {
                                model: db.Seller,
                                attributes: ['id', 'shopName']
                            }
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

                    let seller_info = {
                        id: item.Product.Seller.id,
                        name: item.Product.Seller.shopName,
                    }

                    return {
                        id: item.Product.id,
                        name: item.Product.name,
                        summary: item.Product.summary ? item.Product.summary : "",
                        sub_category: sub_category,
                        seller_info: seller_info
                    }
                });

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

                    let productRating = await db.ProductRating.findOne({
                        raw: true,
                        attributes: ['id', 'rating'],
                        where: {
                            productID: {
                                [Op.eq]: item.id
                            }
                        }
                    });

                    let rating_average = productRating ? productRating.rating : 0;

                    return {
                        ...item,
                        image: url,
                        current_price: productType.currentPrice,
                        price: productType.price,
                        sold: productType.sold,
                        rating: rating_average,
                        quantity: productType.quantity
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
                    EM: 'Get products by shop category !'
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

const getProductsBySubCategory = async (sub_category_id, item_limit, page, rating, minPrice, maxPrice) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (rating === 0) {
                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
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
                                    model: db.ProductType,
                                    attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
                                }
                            ]
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

                let productListFinal = await productListRaw.map(item => {

                    let sub_category = {
                        id: item.SubCategory.id,
                        name: item.SubCategory.title
                    }

                    let seller_info = {
                        id: item.Product.Seller.id,
                        name: item.Product.Seller.shopName,
                    }

                    return {
                        id: item.Product.id,
                        name: item.Product.name,
                        summary: item.Product.summary ? item.Product.summary : "",
                        sub_category: sub_category,
                        seller_info: seller_info,
                        current_price: item.Product.ProductType.currentPrice,
                        price: item.Product.ProductType.price,
                        sold: item.Product.ProductType.sold,
                        quantity: item.Product.ProductType.quantity
                    }
                });

                let productListPriceFilter = [];

                if (minPrice === 0 && maxPrice === 0) {
                    productListPriceFilter = _.cloneDeep(productListFinal);
                }

                if (minPrice !== 0 && maxPrice === 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice);
                }

                if (minPrice === 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price <= maxPrice);
                }

                if (minPrice !== 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice && item.current_price <= maxPrice);
                }

                const listLength = productListPriceFilter.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListPriceFilter.reverse();
                productListPriceFilter = _(productListPriceFilter).drop(offSet).take(item_limit).value();

                let productListFinalWithImage = await Promise.all(productListPriceFilter.map(async item => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `${item.id}.jpeg`
                    }

                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    let productRating = await db.ProductRating.findOne({
                        raw: true,
                        attributes: ['id', 'rating'],
                        where: {
                            productID: {
                                [Op.eq]: item.id
                            }
                        }
                    });

                    let rating_average = productRating ? productRating.rating : 0;

                    return {
                        ...item,
                        image: url,
                        rating: rating_average,
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
            else {
                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
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
                                },
                                {
                                    model: db.ProductType,
                                    attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity']
                                }
                            ]
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

                let productListFinal = await productListRaw.map(item => {

                    let sub_category = {
                        id: item.SubCategory.id,
                        name: item.SubCategory.title
                    }

                    let seller_info = {
                        id: item.Product.Seller.id,
                        name: item.Product.Seller.shopName,
                    }

                    return {
                        id: item.Product.id,
                        name: item.Product.name,
                        summary: item.Product.summary ? item.Product.summary : "",
                        sub_category: sub_category,
                        seller_info: seller_info,
                        rating: item.Product.ProductRating.rating,
                        current_price: item.Product.ProductType.currentPrice,
                        price: item.Product.ProductType.price,
                        sold: item.Product.ProductType.sold,
                        quantity: item.Product.ProductType.quantity
                    }
                });

                let productListPriceFilter = [];

                if (minPrice === 0 && maxPrice === 0) {
                    productListPriceFilter = productListFinal.filter(item => item.rating >= rating);
                }

                if (minPrice !== 0 && maxPrice === 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice && item.rating >= rating);
                }

                if (minPrice === 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price <= maxPrice && item.rating >= rating);
                }

                if (minPrice !== 0 && maxPrice !== 0) {
                    productListPriceFilter = productListFinal.filter(item => item.current_price >= minPrice && item.current_price <= maxPrice && item.rating >= rating);
                }

                const listLength = productListPriceFilter.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListPriceFilter.reverse();
                productListPriceFilter = _(productListPriceFilter).drop(offSet).take(item_limit).value();

                // const listLength = productListFinal.length;
                // const pageTotal = Math.ceil(listLength / item_limit);

                // productListFinal = _(productListFinal).drop(offSet).take(item_limit).value();

                let productListFinalWithImage = await Promise.all(productListPriceFilter.map(async item => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: `${item.id}.jpeg`
                    }

                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                    return {
                        ...item,
                        image: url,
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

const getSearchProductsWithPagination = async (content, item_limit, page, rating) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (rating === 0) {
                let productListRaw = await db.Product.findAll({
                    raw: true,
                    attributes: ['id', 'name', 'summary'],
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

                    let seller_info = {
                        id: item.Seller.id,
                        name: item.Seller.shopName,
                    }

                    return {
                        id: item.id,
                        name: item.name,
                        summary: item.summary ? item.summary : "",
                        seller_info: seller_info,
                        rating: item.ProductRating.rating
                    }
                });

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
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        product_list: productListFinalWithImage
                    },
                    EM: 'Get products by search !'
                }
            }
            else {
                let productListRaw = await db.Product.findAll({
                    raw: true,
                    attributes: ['id', 'name', 'summary'],
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
                    where: {
                        name: {
                            [Op.substring]: `${content}`
                        }
                    },
                });

                let productListFinal = await productListRaw.map(item => {

                    let seller_info = {
                        id: item.Seller.id,
                        name: item.Seller.shopName,
                    }

                    return {
                        id: item.id,
                        name: item.name,
                        summary: item.summary ? item.summary : "",
                        seller_info: seller_info,
                        rating: item.ProductRating.rating
                    }
                }).filter(item => item.rating >= rating);

                const listLength = productListFinal.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListFinal = _(productListFinal).drop(offSet).take(item_limit).value();

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
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        product_list: productListFinalWithImage
                    },
                    EM: 'Get products by search !'
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

const getProductReviews = async (product_id, item_limit, page, rating) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (rating === 0) {
                let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'comment', 'rating', 'createdAt'],
                    include: {
                        model: db.Customer,
                        attributes: ['id', 'name']
                    },
                    order: [['createdAt', 'DESC']],
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

                let productReviewListRaw = [];

                productReviewListRaw = _.cloneDeep(productReviewList);

                productReviewListRaw = _(productReviewListRaw).drop(offSet).take(item_limit).value();

                let finalData = await Promise.all(productReviewListRaw.map(async item => {
                    let customer = item.Customer;
                    if (!customer.id) {
                        delete item.Customer;

                        return {
                            ...item, customer: null, customer_image: ""
                        }
                    } else {

                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `customer_${customer.id}.jpeg`
                        }

                        const command = new GetObjectCommand(getObjectParams);
                        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                        return {
                            ...item, customer: customer, customer_image: url
                        }
                    }
                }));

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
            else {
                let { count, rows: productReviewList } = await db.ProductReview.findAndCountAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'comment', 'rating', 'createdAt'],
                    include: {
                        model: db.Customer,
                        attributes: ['id', 'name']
                    },
                    order: [['createdAt', 'DESC']],
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

                let product_rating_review = productReviewList.filter(review => review.rating === rating);

                await productReviewList.forEach(item => {
                    star_ratings[`${item.rating}`] += 1;
                });

                let rating_average = Math.round(parseFloat((star_ratings['1'] + star_ratings['2'] * 2 + star_ratings['3'] * 3 + star_ratings['4'] * 4 + star_ratings['5'] * 5) / count) * 10) / 10;

                const pageTotal = Math.ceil(product_rating_review.length / item_limit);

                let productReviewListRaw = [];

                productReviewListRaw = _.cloneDeep(product_rating_review);

                productReviewListRaw = _(productReviewListRaw).drop(offSet).take(item_limit).value();

                let finalData = await Promise.all(productReviewListRaw.map(async item => {
                    let customer = item.Customer;
                    if (!customer.id) {
                        delete item.Customer;

                        return {
                            ...item, customer: null, customer_image: ""
                        }
                    } else {

                        const getObjectParams = {
                            Bucket: bucketName,
                            Key: `customer_${customer.id}.jpeg`
                        }

                        const command = new GetObjectCommand(getObjectParams);
                        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

                        return {
                            ...item, customer: customer, customer_image: url
                        }
                    }
                }));

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
    getSearchProducts,
    getProductDetail, getProductReviews, getSearchProductsWithPagination,
    getProductsHistory, getProductsHistorySwiper, getProductDetailShopInfo,
    getProductsByShopCategory, getShopInfo
}