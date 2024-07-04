const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getSubCategoryByCategory = async (category_id) => {
    try {
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

        let sub_category_list = _.orderBy(subCategoryList, [sub_category => sub_category.title.toLowerCase()], ['asc']);

        return {
            EC: 0,
            DT: sub_category_list,
            EM: 'Get sub-category by category!'
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

const getSubCategoryByCategoryWeb = async (category_id) => {
    try {
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

        let data = await db.ProductSubCategory.findAll({
            raw: true,
            nest: true,
            attributes: ['id'],
            include: [
                {
                    model: db.SubCategory,
                    attributes: ['id', 'title'],
                }
            ],
            where: {
                subCategoryID: {
                    [Op.in]: sub_category_list,
                },
            }
        });

        let rebuildData = await data.map(item => {
            return {
                id: item.SubCategory.id,
                title: item.SubCategory.title
            }
        })

        let totalById = _.countBy(rebuildData, 'id');

        let sortedData = _.chain(totalById).
            map(function (cnt, id) {
                return {
                    id: id,
                    count: cnt
                }
            }).sortBy('count', 'desc').orderBy("count", "desc").value();

        let finalRecommendSubCategory = sortedData.map(item => +item.id);

        let subCategoryFinalList = await Promise.all(finalRecommendSubCategory.map(async item => {
            let sub_category_info = await db.SubCategory.findOne({
                raw: true,
                attributes: ['id', 'title'],
                where: {
                    id: {
                        [Op.eq]: +item
                    }
                }
            });
            return sub_category_info;
        }));

        return {
            EC: 0,
            DT: subCategoryFinalList,
            EM: 'Get sub-category by category!'
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

const getSubCategoryInfo = async (sub_category_id) => {
    try {
        let subCategoryData = await db.SubCategory.findOne({
            raw: true,
            nest: true,
            attributes: ['id', 'title'],
            include:
            {
                model: db.Category,
                attributes: ['id', 'title'],
            }
            ,
            where: {
                id: {
                    [Op.eq]: sub_category_id
                },
            }
        });

        let formatData = {
            id: subCategoryData.id,
            title: subCategoryData.title,
            category_info: {
                id: subCategoryData.Category.id,
                title: subCategoryData.Category.title
            }
        }

        if (subCategoryData) {
            return {
                EC: 0,
                DT: formatData,
                EM: 'Get sub-category info successfully !'
            }
        }

        else {
            return {
                EC: -1,
                DT: "",
                EM: 'SubCategory is not existed !'
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

const getRecommendSubCategory = async (category_list) => {
    try {
        let recommend_sub_category_data = await Promise.all(category_list.map(async item => {

            let subCategoryList = await db.SubCategory.findAll({
                raw: true,
                nest: true,
                attributes: ['id', 'title'],
                where: {
                    categoryID: {
                        [Op.eq]: item.id,
                    },
                }
            });

            let suffle_sub_category_list = _.shuffle(subCategoryList);

            return {
                ...item,
                sub_category_list: _(suffle_sub_category_list).take(20).value()
            }

        }));

        return {
            EC: 0,
            DT: recommend_sub_category_data,
            EM: 'Get sub-categories for new user!'
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
    getSubCategoryByCategory, getSubCategoryInfo, getRecommendSubCategory,
    getSubCategoryByCategoryWeb
}