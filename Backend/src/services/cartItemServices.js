const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getQuickCartItemsByCustomer = async (customer_id) => {
    try {

        let cartItemList = await db.CartItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity'],
            include: {
                raw: true,
                nest: true,
                model: db.ProductType,
                attributes: ['id', 'currentPrice', 'productID', 'size', 'color'],
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
            },
            where: {
                customerID: {
                    [Op.eq]: customer_id,
                },
            },
        });

        let cartItemData = await Promise.all(cartItemList.map(async item => {
            let productType = item.ProductType;
            let product = productType.Product;
            let shopInfo = product.Seller;

            let productImage = await db.Image.findOne({
                raw: true,
                attributes: ['id', 'image'],
                where: {
                    productID: {
                        [Op.eq]: product.id
                    }
                }
            });

            return {
                id: item.id,
                quantity: item.quantity,
                price: productType.currentPrice,
                color: productType.color,
                size: productType.size,
                product_info: {
                    id: product.id,
                    name: product.name,
                    image: productImage.image
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

const addCustomerCartItem = async (quantity, customerID, productTypeID) => {
    try {

        let cartItemList = await db.CartItem.findAll({
            raw: true,
            attributes: ['id', 'quantity'],
            where: {
                [Op.and]: [
                    { customerID: customerID },
                    { productTypeID: productTypeID }
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
                productTypeID: productTypeID,
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

module.exports = {
    getQuickCartItemsByCustomer, addCustomerCartItem, updateCustomerCartItem,
    deleteCustomerCartItem
}