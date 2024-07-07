const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
const path = require('path');
const fs = require('fs-extra')

import dotenv from 'dotenv';
dotenv.config();

const SORT_TYPE_ORDER = [['desc'], ['asc']];

const handleSortData = (data, sort_id, off_set, limit) => {
    if (sort_id === 0) {
        let pagination_data = _(data).drop(off_set).take(limit).value();
        return pagination_data;
    } else {
        let type_order = SORT_TYPE_ORDER[sort_id - 1];

        let pagination_data = _(data).orderBy(['current_price'], type_order).drop(off_set).take(limit).value();
        return pagination_data;
    }
}

const singleFileUpload = async (fileObject, product_id) => {

    let extName = path.extname(fileObject.name);

    let uploadPath = path.resolve(__dirname, '../../../Frontend/src/assets/img/products');
    let finalName = `${product_id}.jpeg`;
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

const getProductPagination = async (shop_seller_id, item_limit, page, category_id, sub_category_id, sort_id) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (category_id !== 0 && sub_category_id === 0) {

                let subCategoryList = await db.SubCategory.findAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'title'],
                    where: {
                        categoryID: {
                            [Op.eq]: category_id,
                        },
                    }
                });

                let sub_category_list = await subCategoryList.map(item => item.id);

                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: {
                        model: db.Product,
                        raw: true,
                        nest: true,
                        attributes: ['id', 'name', 'summary'],
                        include: {
                            model: db.ProductType,
                            attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                        },
                        where: {
                            shop_id: {
                                [Op.eq]: shop_seller_id
                            }
                        }
                    },
                    where: {
                        subCategoryID: {
                            [Op.in]: sub_category_list,
                        },
                    }
                });

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                let productListFormat = await Promise.all(productListRaw.map(async product => {

                    let productInfo = product.Product;
                    let productType = productInfo.ProductType;

                    let productSubCategory = await db.ProductSubCategory.findOne({
                        raw: true,
                        nest: true,
                        include: {
                            model: db.SubCategory,
                            attributes: ['id', 'title']
                        },
                        where: {
                            productID: {
                                [Op.eq]: +productInfo.id
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
                        id: productInfo.id,
                        name: productInfo.name,
                        summary: productInfo.summary,
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

                let productListFormatPangination = handleSortData(productListFormat, sort_id, offSet, item_limit);

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        product_list: productListFormatPangination
                    },
                    EM: 'Get products !'
                }
            }

            else if (sub_category_id !== 0) {

                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: {
                        model: db.Product,
                        raw: true,
                        nest: true,
                        attributes: ['id', 'name', 'summary'],
                        include: {
                            model: db.ProductType,
                            attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                        },
                        where: {
                            shop_id: {
                                [Op.eq]: shop_seller_id
                            }
                        }
                    },
                    where: {
                        subCategoryID: {
                            [Op.eq]: sub_category_id,
                        },
                    }
                });

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                let productListFormat = await Promise.all(productListRaw.map(async product => {

                    let productInfo = product.Product;
                    let productType = productInfo.ProductType;

                    let productSubCategory = await db.ProductSubCategory.findOne({
                        raw: true,
                        nest: true,
                        include: {
                            model: db.SubCategory,
                            attributes: ['id', 'title']
                        },
                        where: {
                            productID: {
                                [Op.eq]: +productInfo.id
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
                        id: productInfo.id,
                        name: productInfo.name,
                        summary: productInfo.summary,
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

                let productListFormatPangination = handleSortData(productListFormat, sort_id, offSet, item_limit);

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        product_list: productListFormatPangination
                    },
                    EM: 'Get products !'
                }
            }

            else {
                let productListRaw = await db.Product.findAll({
                    raw: true,
                    nest: true,
                    attributes: ['id', 'name', 'summary'],
                    include: {
                        model: db.ProductType,
                        attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                    },
                    where: {
                        shop_id: {
                            [Op.eq]: shop_seller_id,
                        },
                    }
                });

                let productListFormat = productListRaw.map(product => {

                    let productType = product.ProductType;

                    return {
                        ...product,
                        current_price: productType.currentPrice,
                        price: productType.price,
                        quantity: productType.quantity,
                        sold: productType.sold,
                    }
                })

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                let productListFormatPangination = handleSortData(productListFormat, sort_id, offSet, item_limit);

                productListFormatPangination.reverse();

                let productListFinalWithImage = await Promise.all(productListFormatPangination.map(async item => {

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

const getProductSearch = async (shop_seller_id, product_id) => {
    try {
        let productInfo = await db.Product.findOne({
            raw: true,
            attributes: ['id', 'name', 'summary'],
            where: {
                [Op.and]: [
                    {
                        id: {
                            [Op.eq]: +product_id,
                        }
                    },
                    {
                        shop_id: {
                            [Op.eq]: +shop_seller_id,
                        }
                    }
                ]

            }
        });

        if (productInfo) {
            let productType = await db.ProductType.findOne({
                raw: true,
                attributes: ['id', 'currentPrice', 'price', 'sold', 'quantity'],
                where: {
                    productID: {
                        [Op.eq]: productInfo.id
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
                        [Op.eq]: productInfo.id
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

            let data = {
                id: productInfo.id,
                name: productInfo.name,
                summary: productInfo.summary,
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

            return {
                EC: 0,
                DT: {
                    product_list: [data]
                },
                EM: 'Get product search !'
            }
        } else {
            return {
                EC: 0,
                DT: {
                    product_list: []
                },
                EM: 'Get product search !'
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

            await db.ProductRating.create({
                productID: product_info.id,
                rating: 0
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

const getOrderPagination = async (shop_seller_id, item_limit, page, status, startDate, endDate) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            if (status == 0) {

                let orderListRaw = await db.Order.findAll({
                    raw: true,
                    attributes: ['id', 'orderDate', 'totalPrice'],
                    where: {
                        sellerID: {
                            [Op.eq]: shop_seller_id,
                        },
                    }
                });

                if (+startDate !== 0 && +endDate !== 0) {

                    let start_date = new Date(startDate);
                    let end_date = new Date(endDate);

                    if (start_date.getTime() !== end_date.getTime()) {
                        orderListRaw = orderListRaw.filter(order => order.orderDate >= start_date && order.orderDate <= end_date);
                    }
                    else {
                        orderListRaw = orderListRaw.filter(order => {
                            let order_date = new Date(order.orderDate);

                            let order_month = order_date.getMonth() + 1; // months from 1-12
                            let order_day = order_date.getDate();
                            let order_year = order_date.getFullYear();

                            let month = start_date.getMonth() + 1; // months from 1-12
                            let day = start_date.getDate();
                            let year = start_date.getFullYear();

                            return order_day === day && order_month === month && order_year === year;
                        });
                    }
                }

                const listLength = orderListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                orderListRaw.reverse();
                orderListRaw = _(orderListRaw).drop(offSet).take(item_limit).value();

                let order_list_data = await Promise.all(orderListRaw.map(async item => {

                    let order_status_raw = await db.Shipment.findAll({
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
                                [Op.eq]: +item.id,
                            },
                        },
                        order: [
                            ['updatedDate', 'DESC'],
                            ['status', 'DESC'],
                        ]
                    });

                    let order_status_info = order_status_raw[0];

                    let order_status = order_status_info.ShipmentStatus;

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
            else {
                let orderListRaw = await db.Order.findAll({
                    raw: true,
                    attributes: ['id', 'orderDate', 'totalPrice'],
                    where: {
                        sellerID: {
                            [Op.eq]: shop_seller_id,
                        },
                    }
                });

                if (+startDate !== 0 && +endDate !== 0) {

                    let start_date = new Date(startDate);
                    let end_date = new Date(endDate);

                    if (start_date.getTime() !== end_date.getTime()) {
                        orderListRaw = orderListRaw.filter(order => order.orderDate >= start_date && order.orderDate <= end_date);
                    }
                    else {
                        orderListRaw = orderListRaw.filter(order => {
                            let order_date = new Date(order.orderDate);

                            let order_month = order_date.getMonth() + 1; // months from 1-12
                            let order_day = order_date.getDate();
                            let order_year = order_date.getFullYear();

                            let month = start_date.getMonth() + 1; // months from 1-12
                            let day = start_date.getDate();
                            let year = start_date.getFullYear();

                            return order_day === day && order_month === month && order_year === year;
                        });
                    }
                }

                orderListRaw.reverse();
                //orderListRaw = _(orderListRaw).drop(offSet).take(item_limit).value();

                let order_list_data = await Promise.all(orderListRaw.map(async item => {

                    let order_status_raw = await db.Shipment.findAll({
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
                                [Op.eq]: +item.id,
                            },
                        },
                        order: [
                            ['updatedDate', 'DESC'],
                            ['status', 'DESC'],
                        ]
                    });

                    let order_status_info = order_status_raw[0];

                    let order_status = order_status_info.ShipmentStatus;

                    return {
                        ...item,
                        status: order_status
                    }
                }));

                let filter_order_list_data = order_list_data.filter(item => item.status.id === status);

                const listLength = filter_order_list_data.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                let paginate_order_list_data = _(filter_order_list_data).drop(offSet).take(item_limit).value();

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        order_list: paginate_order_list_data
                    },
                    EM: 'Get orders by status !'
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
                        model: db.ShippingUnit,
                        attributes: ['id', 'nameUnit'],
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
        let shippingUnit = order_info.ShippingUnit;
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
                shipping_unit: shippingUnit.nameUnit,
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

const confirmCustomerOrder = async (order_id, packing) => {
    try {

        // order_status: 2 - Chờ xác nhận, 3 - Đang đóng gói

        let date = new Date();

        if (!packing) {
            let result = await db.Shipment.create({
                status: 2,
                updatedDate: date,
                orderID: order_id
            });

            if (result) {
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Xác nhận đơn hàng thành công'
                }
            }
            else {
                return {
                    EC: -1,
                    DT: '',
                    EM: 'Xác nhận đơn hàng thất bại'
                }
            }
        } else {
            let result = await db.Shipment.bulkCreate([
                {
                    status: 2,
                    updatedDate: date,
                    orderID: order_id
                },
                {
                    status: 3,
                    updatedDate: date,
                    orderID: order_id
                }
            ]);

            if (result) {
                return {
                    EC: 0,
                    DT: '',
                    EM: 'Đơn hàng đã xác nhận và đang đóng gói'
                }
            }
            else {
                return {
                    EC: -1,
                    DT: '',
                    EM: 'Xác nhận đơn hàng thất bại'
                }
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

const packingCustomerOrder = async (order_id) => {
    try {

        // order_status: 2 - Chờ xác nhận, 3 - Đang đóng gói

        let date = new Date();

        let result = await db.Shipment.create({
            status: 3,
            updatedDate: date,
            orderID: order_id
        });

        if (result) {
            return {
                EC: 0,
                DT: '',
                EM: 'Đơn hàng đang đóng gói'
            }
        }
        else {
            return {
                EC: -1,
                DT: '',
                EM: 'Xác nhận đơn hàng thất bại'
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

const getShopCategory = async (seller_id) => {
    try {
        let categoryList = await db.SubCategory.findAll({
            raw: true,
            attributes: ['id', 'title'],
            where: {
                shopID: {
                    [Op.eq]: +seller_id
                }
            }
        })

        if (categoryList.length === 0) {
            return {
                EC: 0,
                DT: [],
                EM: 'Shop Category is emtpy !'
            }
        } else {

            let format_category_list = await Promise.all(categoryList.map(async item => {

                let { count } = await db.ProductSubCategory.findAndCountAll({
                    raw: true,
                    where: {
                        subCategoryID: {
                            [Op.eq]: item.id,
                        },
                    }
                });

                return {
                    ...item,
                    quantity: count
                }
            }));

            return {
                EC: 0,
                DT: format_category_list,
                EM: 'Shop Category !'
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

const getShopCategoryDetailExist = async (category_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let productListRaw = await db.ProductSubCategory.findAll({
                raw: true,
                nest: true,
                attributes: ['id'],
                include: {
                    model: db.Product,
                    attributes: ['id', 'name']
                },
                where: {
                    subCategoryID: {
                        [Op.eq]: category_id,
                    },
                }
            });

            const listLength = productListRaw.length;
            const pageTotal = Math.ceil(listLength / item_limit);

            productListRaw.reverse();
            productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

            let product_list_format = productListRaw.map(item => {
                return {
                    id: item.Product.id,
                    name: item.Product.name,
                    index: item.id
                };
            })

            return {
                EC: 0,
                DT: {
                    page: page,
                    page_total: pageTotal,
                    total_items: listLength,
                    product_list: product_list_format
                },
                EM: 'Get products by shop category !'
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

const getShopCategoryDetailNotExist = async (seller_id, item_limit, page) => {
    try {
        if (item_limit > 0) {

            let offSet = (page - 1) * item_limit;

            let categoryList = await db.SubCategory.findAll({
                raw: true,
                attributes: ['id', 'title'],
                where: {
                    shopID: {
                        [Op.eq]: +seller_id
                    }
                }
            })

            if (categoryList.length !== 0) {
                let category_id_list = categoryList.map(item => item.id);

                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: {
                        model: db.Product,
                        attributes: ['id', 'name'],
                        where: {
                            shop_id: {
                                [Op.eq]: seller_id
                            }
                        }
                    },
                    where: {
                        subCategoryID: {
                            [Op.notIn]: category_id_list,
                        },
                    },
                    order: [['id', 'DESC']]
                });

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

                let product_list_format = productListRaw.map(item => item.Product);

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        product_list: product_list_format
                    },
                    EM: 'Get products not exist in shop category !'
                }
            } else {

                let productListRaw = await db.ProductSubCategory.findAll({
                    raw: true,
                    nest: true,
                    include: {
                        model: db.Product,
                        attributes: ['id', 'name'],
                        where: {
                            shop_id: {
                                [Op.eq]: seller_id
                            }
                        }
                    },
                    order: [['id', 'DESC']]
                });

                const listLength = productListRaw.length;
                const pageTotal = Math.ceil(listLength / item_limit);

                productListRaw = _(productListRaw).drop(offSet).take(item_limit).value();

                let product_list_format = productListRaw.map(item => item.Product);

                return {
                    EC: 0,
                    DT: {
                        page: page,
                        page_total: pageTotal,
                        total_items: listLength,
                        product_list: product_list_format
                    },
                    EM: 'Get products not exist in shop category !'
                }

            }

            // return {
            //     EC: 0,
            //     DT: {
            //         page: page,
            //         page_total: pageTotal,
            //         total_items: listLength,
            //         product_list: product_list_format
            //     },
            //     EM: 'Get products by shop category !'
            // } 


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

const createShopCategory = async (seller_id, category_title) => {
    try {
        let result = await db.SubCategory.create({
            title: category_title,
            shopID: seller_id
        });

        if (result) {
            let category_info = result.dataValues;
            return {
                EC: 0,
                DT: {
                    ...category_info,
                    quantity: 0
                },
                EM: 'Đã thêm danh mục thành công'
            }
        }

        return {
            EC: -1,
            DT: "",
            EM: 'Lỗi thêm danh mục'
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

const updateShopCategory = async (category_id, category_title) => {
    try {

        await db.SubCategory.update({
            title: category_title
        }, {
            where: {
                id: category_id
            }
        });

        return {
            EC: 0,
            DT: "",
            EM: 'Chỉnh sửa danh mục thành công'
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

const deleteShopCategory = async (category_id) => {
    try {

        await db.SubCategory.destroy({
            where: {
                id: {
                    [Op.eq]: category_id,
                },
            }
        });

        await db.ProductSubCategory.destroy({
            where: {
                subCategoryID: {
                    [Op.eq]: category_id,
                },
            }
        });

        return {
            EC: 0,
            DT: "",
            EM: "Xóa danh mục thành công"
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

const addProductToCategoryShop = async (category_id, product_id) => {
    try {

        let item = await db.ProductSubCategory.findOne({
            raw: true,
            where: {
                [Op.and]: [
                    { subCategoryID: category_id },
                    { productID: product_id }
                ],
            }
        });

        if (item) {
            return {
                EC: -1,
                DT: "",
                EM: 'Sản phẩm đã có trong danh mục'
            }
        } else {
            let result = await db.ProductSubCategory.create({
                productID: product_id,
                subCategoryID: category_id
            });

            if (result) {

                return {
                    EC: 0,
                    DT: "",
                    EM: 'Đã thêm sản phẩm vào danh mục'
                }
            }

            return {
                EC: -1,
                DT: "",
                EM: 'Lỗi thêm sản phẩm vào danh mục'
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

const removeProductOutCategoryShop = async (id) => {
    try {

        await db.ProductSubCategory.destroy({
            where: {
                id: {
                    [Op.eq]: +id,
                },
            }
        });

        return {
            EC: 0,
            DT: "",
            EM: 'Đã xóa sản phẩm khỏi danh mục'
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

const getDashboardData = async (seller_id) => {
    try {

        let pending_confirm = 0;
        let pending_shipper_get = 0;
        let shipping = 0;
        let shipping_success = 0;
        let cancel = 0;

        let revenues = [...Array(12)].map(i => 0);
        let saleData = [...Array(12)].map(i => 0);

        let orderListRaw = await db.Order.findAll({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
                sellerID: {
                    [Op.eq]: seller_id,
                },
            }
        });

        let product_list = await db.ProductType.findAll({
            raw: true,
            nest: true,
            attributes: ['quantity', 'currentPrice'],
            include: {
                model: db.Product,
                attributes: ['id', 'name'],
                where: {
                    shop_id: {
                        [Op.eq]: +seller_id
                    }
                }
            },
            where: {
                quantity: {
                    [Op.between]: [0, 10]
                }
            }
        });


        let format_product_list = product_list.map(product => {
            return {
                id: product.Product.id,
                name: product.Product.name,
                quantity: product.quantity,
                price: product.currentPrice,
            }
        });

        let outOfOrder_product_list = format_product_list.filter(product => product.quantity === 0);
        let soon_outOfOrder_product_list_temp = format_product_list.filter(product => product.quantity !== 0);

        let soon_outOfOrder_product_list = _.chain(soon_outOfOrder_product_list_temp).orderBy("quantity", "asc").take(3).value();

        let outOfOrder_product_list_quantity = outOfOrder_product_list.length;
        let soon_outOfOrder_product_list_quantity = soon_outOfOrder_product_list.length;


        outOfOrder_product_list = _(outOfOrder_product_list).take(3).value();

        await Promise.all(orderListRaw.map(async item => {

            let order_status_raw = await db.Shipment.findAll({
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
                        [Op.eq]: +item.id,
                    },
                },
                order: [
                    ['updatedDate', 'DESC'],
                    ['status', 'DESC'],
                ]
            });

            let order_status_info = order_status_raw[0];

            let order_status_id = order_status_info.ShipmentStatus.id;

            if (order_status_id === 1) {
                pending_confirm = pending_confirm + 1;
            }

            if (order_status_id === 3) {
                pending_shipper_get += 1;
            }

            if (order_status_id === 6) {
                shipping += 1;
            }

            if (order_status_id === 7) {
                shipping_success += 1;
                //console.log(`id = ${item.id}, month = ${item.orderDate.getMonth() + 1}, revenue = ${item.totalPrice}`);

                revenues[item.orderDate.getMonth()] += item.totalPrice;

                let order_item_list = await db.OrderItem.findAll({
                    raw: true,
                    attributes: ['quantity'],
                    where: {
                        orderID: {
                            [Op.eq]: item.id
                        }
                    }
                });

                let orderSales = _.sumBy(order_item_list, 'quantity');

                saleData[item.orderDate.getMonth()] += orderSales;
            }

            if (order_status_id === 10) {
                cancel += 1;
            }
        }));

        let analysis_data = revenues.map((revenue, index) => {
            return {
                name: `T${index + 1}`,
                revenue: revenue,
                sales: saleData[index]
            }
        })

        let overview_data = [pending_confirm, pending_shipper_get, shipping, shipping_success, cancel];

        let data = {
            overview_data: overview_data,
            analysis_data: analysis_data,
            out_of_order_product_list: {
                quantity: outOfOrder_product_list_quantity,
                data: outOfOrder_product_list
            },
            soon_out_of_order_product_list: {
                quantity: soon_outOfOrder_product_list_quantity,
                data: soon_outOfOrder_product_list
            }
        }

        return {
            EC: 0,
            DT: data,
            EM: 'Get seller dashboard data !'
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

const getOrderSearch = async (shop_seller_id, order_id) => {
    try {

        let orderInfo = await db.Order.findOne({
            raw: true,
            attributes: ['id', 'orderDate', 'totalPrice'],
            where: {
                [Op.and]: [
                    {
                        id: {
                            [Op.eq]: order_id
                        }
                    },
                    {
                        sellerID: {
                            [Op.eq]: shop_seller_id,
                        }
                    }
                ]

            }
        });

        if (orderInfo) {
            let order_status_raw = await db.Shipment.findAll({
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
                        [Op.eq]: +orderInfo.id,
                    },
                },
                order: [
                    ['updatedDate', 'DESC'],
                    ['status', 'DESC'],
                ]
            });

            let order_status_info = order_status_raw[0];

            let order_status = order_status_info.ShipmentStatus;

            let order_list_data = [
                {
                    id: orderInfo.id,
                    orderDate: orderInfo.orderDate,
                    totalPrice: orderInfo.totalPrice,
                    status: order_status
                }
            ];

            return {
                EC: 0,
                DT: {
                    order_list: order_list_data
                },
                EM: 'Get order search !'
            }
        } else {
            return {
                EC: 0,
                DT: {
                    order_list: []
                },
                EM: 'Get order search !'
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
    getProductPagination, createNewProduct, deleteProduct,
    getAllCategories, getSubCategoriesByCategory, updateProduct,
    handleCreateVertificationCode, handleOTPVertification,
    getSellerInfo, updateSellerInfo, getOrderPagination,
    getOrderDetail, confirmCustomerOrder, packingCustomerOrder,
    getShopCategory, createShopCategory, updateShopCategory,
    deleteShopCategory, getShopCategoryDetailExist, getShopCategoryDetailNotExist,
    addProductToCategoryShop, removeProductOutCategoryShop, getDashboardData,
    getOrderSearch, getProductSearch
}