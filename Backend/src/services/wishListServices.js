const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

// require('dotenv').config()

// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: accessKey,
//         secretAccessKey: secretAccessKey
//     },
//     region: bucketRegion
// });

const getWishListByCustomer = async (customer_id) => {
    try {

        let wishList = await db.WishList.findAll({
            raw: true,
            nest: true,
            attributes: ['id'],
            include: {
                raw: true,
                nest: true,
                model: db.Product,
                attributes: ['id', 'name'],
                include: {
                    model: db.Seller,
                    attributes: ['id', 'shopName'],
                },
            },
            order: [
                ['id', 'DESC'],
            ],
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let wishListData = await Promise.all(wishList.map(async item => {
            let product = item.Product;
            let shopInfo = product.Seller;

            let productDetail = await db.ProductType.findOne({
                raw: true,
                attributes: ['id', 'quantity', 'currentPrice', 'price'],
                where: {
                    productID: {
                        [Op.eq]: product.id,
                    },
                }
            });

            // const getObjectParams = {
            //     Bucket: bucketName,
            //     Key: `${product.id}.jpeg`
            // }

            // const command = new GetObjectCommand(getObjectParams);
            // const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            return {
                id: item.id,
                price: productDetail ? productDetail.currentPrice : 0,
                product_info: {
                    id: product.id,
                    name: product.name,
                    //image: url,
                    image: "",
                },
                shop_info: {
                    id: shopInfo.id,
                    name: shopInfo.shopName
                }
            }
        }));

        return {
            EC: 0,
            DT: wishListData,
            EM: 'Wish List !'
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

const addWishListItem = async (productID, customerID) => {
    try {

        let wishListItem = await db.WishList.findOne({
            raw: true,
            attributes: ['id'],
            where: {
                [Op.and]: [
                    { customerID: customerID },
                    { productID: productID }
                ],
            },
        });

        if (wishListItem) {

            return {
                EC: 0,
                DT: '',
                EM: 'Đã thêm sản phẩm yêu thích !'
            }
        } else {
            await db.WishList.create({
                productID: productID,
                customerID: customerID,
                addedAt: new Date(),
            })

            return {
                EC: 0,
                DT: '',
                EM: 'Đã thêm sản phẩm yêu thích !'
            }
        }

        // if (cartItemList.length > 0) {

        //     let cart_item = cartItemList[0];
        //     let update_quantity = cart_item.quantity + quantity;

        //     await db.CartItem.update({
        //         quantity: update_quantity,
        //         updatedAt: new Date()
        //     }, {
        //         where: {
        //             id: +cart_item.id
        //         }
        //     });

        //     return {
        //         EC: 0,
        //         DT: '',
        //         EM: 'Đã thêm vào giỏ hàng !'
        //     }
        // } else {
        // await db.CartItem.create({
        //     quantity: quantity,
        //     customerID: customerID,
        //     productTypeID: productTypeID,
        //     createdAt: new Date(),
        //     updatedAt: null,
        // })

        //     return {
        //         EC: 0,
        //         DT: '',
        //         EM: 'Đã thêm vào giỏ hàng !'
        //     }
        // }

    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !',
        }
    }
}

const deleteWishListItem = async (id) => {
    try {

        let wish_list_item = await db.WishList.findOne({
            raw: true,
            attributes: ['id'],
            where: {
                id: {
                    [Op.eq]: +id
                }
            }
        });

        if (_.isEmpty(wish_list_item)) {
            return {
                EC: -1,
                DT: '',
                EM: 'Wish List item is not existed !'
            }
        } else {
            await db.WishList.destroy({
                where: {
                    id: +id,
                },
            });

            return {
                EC: 0,
                DT: '',
                EM: 'Xóa sản phẩm yêu thích !'
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

module.exports = {
    getWishListByCustomer, addWishListItem, deleteWishListItem
}