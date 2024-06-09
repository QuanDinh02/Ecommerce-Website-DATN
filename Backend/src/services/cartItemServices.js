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

const getQuickCartItemsByCustomer = async (customer_id) => {
    try {

        let cartItemList = await db.CartItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity'],
            include: {
                model: db.Product,
                attributes: ['id', 'name'],
                raw: true,
                nest: true,
                include: {
                    model: db.Seller,
                    attributes: ['id', 'shopName'],
                },
            },
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let cartItemData = await Promise.all(cartItemList.map(async item => {

            let product = item.Product;

            let productDetail = await db.ProductType.findOne({
                raw: true,
                attributes: ['id', 'quantity', 'currentPrice', 'price'],
                where: {
                    productID: {
                        [Op.eq]: product.id,
                    },
                }
            });
            let shopInfo = product.Seller;

            const getObjectParams = {
                Bucket: bucketName,
                Key: `${product.id}.jpeg`
            }
    
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                id: item.id,
                quantity: item.quantity,
                price: productDetail ? productDetail.currentPrice : 0,
                product_info: {
                    id: product.id,
                    name: product.name,
                    image: url,
                },
                shop_info: {
                    id: shopInfo.id,
                    name: shopInfo.shopName
                }
            }
        }));

        return {
            EC: 0,
            DT: cartItemData,
            EM: 'Cart Item !'
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

const addCustomerCartItem = async (quantity, customerID, productID) => {
    try {

        let cartItemList = await db.CartItem.findAll({
            raw: true,
            attributes: ['id', 'quantity'],
            where: {
                [Op.and]: [
                    { customerID: customerID },
                    { productID: productID }
                ],
            },
        });

        if (cartItemList.length > 0) {

            let cart_item = cartItemList[0];
            let update_quantity = cart_item.quantity + quantity;

            await db.CartItem.update({
                quantity: update_quantity,
                updatedAt: new Date()
            }, {
                where: {
                    id: +cart_item.id
                }
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Đã thêm vào giỏ hàng !'
            }
        } else {
            await db.CartItem.create({
                quantity: quantity,
                customerID: customerID,
                productID: productID,
                createdAt: new Date(),
                updatedAt: null,
            })

            return {
                EC: 0,
                DT: '',
                EM: 'Đã thêm vào giỏ hàng !'
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

const updateCustomerCartItem = async (id, quantity) => {
    try {

        let cart_item = await db.CartItem.findOne({
            raw: true,
            attributes: ['id'],
            where: {
                id: {
                    [Op.eq]: +id
                }
            }
        });

        if (_.isEmpty(cart_item)) {
            return {
                EC: -1,
                DT: '',
                EM: 'Cart item is not existed !'
            }
        }

        if (quantity > 0) {
            await db.CartItem.update({
                quantity: quantity,
                updatedAt: new Date()
            }, {
                where: {
                    id: +id
                }
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Cập nhật giỏ hàng!'
            }
        } else {
            return {
                EC: -1,
                DT: '',
                EM: "Số lượng sản phẩm không hợp lệ !"
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

const deleteCustomerCartItem = async (id) => {
    try {

        let cart_item = await db.CartItem.findOne({
            raw: true,
            attributes: ['id'],
            where: {
                id: {
                    [Op.eq]: +id
                }
            }
        });

        if (_.isEmpty(cart_item)) {
            return {
                EC: -1,
                DT: '',
                EM: 'Cart item is not existed !'
            }
        } else {
            await db.CartItem.destroy({
                where: {
                    id: +id,
                },
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Xóa sản phẩm khỏi giỏ hàng !'
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

const deleteCartItemByCustomer = async (customer_id) => {
    try {

        await db.CartItem.destroy({
            where: {
                customerID: +customer_id,
            },
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Xóa sản phẩm khỏi giỏ hàng !'
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
    getQuickCartItemsByCustomer, addCustomerCartItem, updateCustomerCartItem,
    deleteCustomerCartItem, deleteCartItemByCustomer
}