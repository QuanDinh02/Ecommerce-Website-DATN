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
            }).sortBy('count', 'desc').orderBy("count", "desc").take(20)
            .value();

        let finalRecommendSubCategory = sortedData.map(item => +item.id);

        let subCategoryFinalList = await db.SubCategory.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'title'],
            where: {
                id: {
                    [Op.in]: finalRecommendSubCategory,
                },
            }
        });

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

module.exports = {
    getSubCategoryByCategory, getSubCategoryInfo
}