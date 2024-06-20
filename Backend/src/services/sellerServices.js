const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
const path = require('path');
const fs = require('fs-extra')

import dotenv from 'dotenv';
dotenv.config();

const singleFileUpload = async (fileObject, product_id) => {

    let extName = path.extname(fileObject.name);

    let uploadPath = path.resolve(__dirname, '../../../Frontend/src/assets/img/products');
    let finalName = `${product_id}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            EC: 0,
            DT: "",
            EM: "Upload image successfully ",
        }

    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            DT: "",
            EM: "Upload image failed ",
        }
    }
}

const getProductPagination = async (shop_seller_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let productListRaw = await db.Product.findAll({
                raw: true,
                attributes: ['id', 'name', 'summary'],
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

const createNewProduct = async (data, img_file) => {
    try {

        let newProduct = await db.Product.create({
            name: data.name,
            summary: data.summary,
            shop_id: data.seller_id
        });

        if (newProduct) {
            let product_info = newProduct.dataValues;

            await db.ProductType.create({
                quantity: data.quantity,
                currentPrice: data.currentPrice === 0 ? data.price : data.currentPrice,
                price: data.price,
                productID: product_info.id,
            });

            await db.ProductSubCategory.create({
                productID: product_info.id,
                subCategoryID: data.sub_category_id
            })

            let result = await singleFileUpload(img_file, product_info.id);
            if (result) {
                if (result.EC === 0) {
                    return {
                        EC: 0,
                        DT: "",
                        EM: 'Thêm sản phẩm thành công!'
                    }
                } else {
                    return {
                        EC: -1,
                        DT: "",
                        EM: 'Thêm sản phẩm thành công với ảnh lỗi !'
                    }
                }
            }
        } else {
            return {
                EC: -1,
                DT: "",
                EM: 'Create new product failed!'
            }
        }

        // let result = await singleFileUpload(img_file, "TEST");
        // if (result) {
        //     if (result.EC === 0) {
        //         return {
        //             EC: 0,
        //             DT: "",
        //             EM: 'Create new product successfully!'
        //         }
        //     } else {
        //         return {
        //             EC: -1,
        //             DT: "",
        //             EM: 'Create new product successfully with upload image failed !'
        //         }
        //     }
        // }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateProduct = async (data) => {
    try {

        await db.Product.update({
            name: data.name,
            summary: data.summary,
            shop_id: data.seller_id
        }, {
            where: {
                id: +data.id
            }
        });

        await db.ProductType.update({
            quantity: data.quantity,
            price: data.price,
            currentPrice: data.currentPrice
        }, {
            where: {
                productID: +data.id
            }
        });

        await db.ProductSubCategory.update({
            subCategoryID: data.sub_category_id,
        }, {
            where: {
                productID: +data.id
            }
        });

        return {
            EC: 0,
            DT: "",
            EM: 'Cập nhật sản phẩm thành công!'
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteProduct = async (product_id) => {
    try {
        await db.Product.destroy({
            where: {
                id: +product_id
            },
        });

        await db.ProductType.destroy({
            where: {
                productID: +product_id
            },
        });

        await db.ProductSubCategory.destroy({
            where: {
                productID: +product_id
            },
        });

        let file_path = path.resolve(__dirname, `../../../Frontend/src/assets/img/products/${product_id}.jpeg`);

        await fs.remove(file_path);
        return {
            EC: 0,
            DT: '',
            EM: 'Xóa sản phẩm thành công !'
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

const getAllCategories = async () => {
    try {
        let categoryData = await db.Category.findAll({
            raw: true,
            attributes: ['id', 'title'],
        });

        const sortedCategoryList = _.orderBy(categoryData, [category => category.title.toLowerCase()], ['asc']);

        return {
            EC: 0,
            DT: sortedCategoryList,
            EM: 'Get all categories successfully !'
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

const getSubCategoriesByCategory = async (category_id) => {
    try {
        let subCategoryData = await db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
                categoryID: {
                    [Op.eq]: category_id
                }
            }
        });

        const sortedSubCategoryList = _.orderBy(subCategoryData, [sub_category => sub_category.title.toLowerCase()], ['asc']);

        return {
            EC: 0,
            DT: sortedSubCategoryList,
            EM: 'Get subcategories successfully !'
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

const handleCreateVertificationCode = async (data) => {
    try {
        let { code, email } = data;

        let existCode = await db.CodeVertification.findAll({
            raw: true,
            where: {
                email: {
                    [Op.eq]: email,
                },
            }
        });

        if (existCode.length > 0) {
            await db.CodeVertification.destroy({
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                }
            });

            let result = await db.CodeVertification.create({
                email: email,
                code: code,
                createdAt: new Date()
            })

            if (result) {
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Create new OTP code successfully !'
                }
            }

            return {
                EC: 1,
                DT: '',
                EM: 'Create new OTP code failed !'
            }
        } else {
            await db.CodeVertification.destroy({
                where: {
                    email: {
                        [Op.eq]: email,
                    },
                }
            });

            let result = await db.CodeVertification.create({
                email: email,
                code: code,
                createdAt: new Date()
            })

            if (result) {
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Create new OTP code successfully !'
                }
            }

            return {
                EC: 1,
                DT: '',
                EM: 'Create new OTP code failed !'
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

const handleOTPVertification = async (data) => {
    try {
        let { otp, email } = data;

        let result = await db.CodeVertification.findOne({
            raw: true,
            attributes: ['id', 'code', 'createdAT'],
            where: {
                email: {
                    [Op.eq]: email,
                },
            }
        });

        if (result) {

            let otpTimeStart = result.createdAT.getTime(); //miliseconds
            let date = new Date();
            let otpTimeNow = date.getTime(); //miliseconds

            let time_span = otpTimeNow - otpTimeStart; // otp valid: time_span < 600000 (milisecond) (10 minute) | otp invalid: time_span > 600000 (milisecond) (10 minute)

            if (result.code === otp && time_span < process.env.OTP_TIME_DURATION) {

                await db.CodeVertification.destroy({
                    where: {
                        email: {
                            [Op.eq]: email,
                        },
                    }
                });

                return {
                    EC: 0,
                    DT: "",
                    EM: 'Mã OTP hợp lệ !'
                }
            }
            return {
                EC: 1,
                DT: "",
                EM: 'Mã OTP không hợp lệ !'
            }
        }

        return {
            EC: 1,
            DT: "",
            EM: 'Mã OTP không hợp lệ !'
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

const getSellerInfo = async (seller_id) => {
    try {
        let customerInfo = await db.Seller.findOne({
            raw: true,
            attributes: ['id', 'name', 'mobile', 'gender', 'birth', 'email'],
            where: {
                id: {
                    [Op.eq]: +seller_id
                }
            }
        })

        return {
            EC: 0,
            DT: customerInfo,
            EM: 'Customer Info !'
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

const updateSellerInfo = async (data) => {
    try {
        await db.Seller.update({
            name: data.name,
            mobile: data.mobile,
            gender: data.gender,
            birth: data.birth
        }, {
            where: {
                id: +data.id
            }
        });

        return {
            EC: 0,
            DT: '',
            EM: 'Cập nhật thông tin thành công'
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

const getOrderAllPagination = async (shop_seller_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let orderListRaw = await db.Order.findAll({
                raw: true,
                attributes: ['id', 'orderDate', 'totalPrice'],
                where: {
                    sellerID: {
                        [Op.eq]: shop_seller_id,
                    },
                }
            });

            const listLength = orderListRaw.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            orderListRaw.reverse();
            orderListRaw = _(orderListRaw).drop(offSet).take(item_limit).value();

            let order_list_data = await Promise.all(orderListRaw.map(async item => {

                let order_status_list = await db.Shipment.findAll({
                    nest: true,
                    raw: true,
                    attributes: ['id', 'status', 'updatedDate'],
                    include: {
                        model: db.ShipmentStatus,
                        attributes: ['id', 'name']
                    },
                    where: {
                        orderID: {
                            [Op.eq]: item.id,
                        },
                    }
                });

                order_status_list = _.orderBy(order_status_list, i => i.updatedDate, 'desc');

                let order_status = order_status_list[0].ShipmentStatus.name;

                return {
                    ...item,
                    status: order_status
                }
            }));

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
                    order_list: order_list_data
                },
                EM: 'Get all orders !'
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

const getOrderDetail = async (order_id) => {
    try {

        let order_info = await db.Order.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'orderDate', 'totalPrice', 'shipFee', 'fullName', 'phone', 'address'],
            include:
            [
                {
                    model: db.ShippingMethod,
                    attributes: ['id', 'nameMethod', 'price'],
                },
                {
                    model: db.Customer,
                    attributes: ['name'],
                },
            ],
            where: {
                id: {
                    [Op.eq]: order_id,
                },
            }
        });

        let shippingMethod = order_info.ShippingMethod.nameMethod;
        let customer_name = order_info.Customer.name;

        let order_item_list = await db.OrderItem.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'quantity', 'price'],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name'],
                }
            ],
            where: {
                orderID: {
                    [Op.eq]: +order_id
                }
            }
        });

        let order_item_list_format = await order_item_list.map(order_item => {
            let orderItem = order_item;
            let productInfo = orderItem.Product;

            delete orderItem.Product;

            return {
                ...orderItem,
                product_id: productInfo.id,
                product_name: productInfo.name
            }

        });

        let transaction_info = await db.Transaction.findOne({
            raw: true,
            nest: true,
            attributes: [],
            include:
            {
                model: db.TransactionPaymentMethod,
                attributes: ['id', 'method_name'],
            }
            ,
            where: {
                orderID: {
                    [Op.eq]: +order_id,
                },
            },
        });

        let transactionPaymentMethod = transaction_info.TransactionPaymentMethod.method_name;

        let order_status_info = await db.Shipment.findAll({
            limit: 1,
            raw: true,
            nest: true,
            attributes: ['id', 'updatedDate'],
            include:
            {
                model: db.ShipmentStatus,
                attributes: ['id', 'name'],
            },
            where: {
                orderID: {
                    [Op.eq]: +order_id,
                },
            },
            order: [['updatedDate', 'DESC']]
        });

        let order_status = order_status_info[0].ShipmentStatus.name;

        return {
            EC: 0,
            DT: {
                id: order_info.id,
                orderDate: order_info.orderDate,
                totalPrice: order_info.totalPrice,
                shipFee: order_info.shipFee,
                order_address: {
                    customer_name: customer_name,
                    name: order_info.fullName,
                    phone: order_info.phone,
                    address: order_info.address
                },
                order_item_list: order_item_list_format,
                payment_method: transactionPaymentMethod,
                shipping_method: shippingMethod,
                status: order_status
            },
            EM: 'Get order detail'
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
    getProductPagination, createNewProduct, deleteProduct,
    getAllCategories, getSubCategoriesByCategory, updateProduct,
    handleCreateVertificationCode, handleOTPVertification,
    getSellerInfo, updateSellerInfo, getOrderAllPagination,
    getOrderDetail
}