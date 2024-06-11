const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");
const path = require('path');
const fs = require('fs-extra')

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

module.exports = {
    getProductPagination, createNewProduct, deleteProduct, getAllCategories, getSubCategoriesByCategory,
    updateProduct
}