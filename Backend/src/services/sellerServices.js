const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getProductPagination = async (shop_seller_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let productListRaw = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name'],
                where: {
                    shop_id: {
                        [Op.eq]: shop_seller_id,
                    },
                }
            });

            const listLength = productListRaw.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let productListFinalWithImage = await Promise.all(productListRaw.map(async item => {

                let productType = await db.ProductType.findOne({
                    raw: true,
                    attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                let productSubCategory = await db.ProductSubCategory.findOne({
                    raw: true,
                    nest: true,
                    include: {
                        model: db.SubCategory,
                        attributes: ['id', 'title']
                    },
                    where: {
                        productID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                // const getObjectParams = {
                //     Bucket: bucketName,
                //     Key: `${item.id}.jpeg`
                // }

                // const command = new GetObjectCommand(getObjectParams);
                // const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                let sub_category = productSubCategory.SubCategory;

                return {
                    ...item,
                    //image: url,
                    image: "",
                    current_price: productType.currentPrice,
                    price: productType.price,
                    quantity: productType.quantity,
                    sold: productType.sold,
                    sub_category: {
                        id: sub_category.id !== null ? sub_category.id : null,
                        title: sub_category.title !== null ? sub_category.title : "",
                    }
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
                EM: 'Get products !'
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
    getProductPagination
}