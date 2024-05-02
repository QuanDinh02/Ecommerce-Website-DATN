const db = require('../models/index.js');
const { Op } = require("sequelize");

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
                attributes: ['id', 'currentPrice', 'productID', 'size','color'],
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

module.exports = {
    getQuickCartItemsByCustomer
}