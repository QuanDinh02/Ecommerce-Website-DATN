const db = require('../models/index.js');
const { Op } = require("sequelize");
const _ = require("lodash");

const getAllCategories = async () => {
    try {
        let categoryData = await db.Category.findAll({
            raw: true,
            attributes: ['id', 'title'],
        });

        let data = await Promise.all(categoryData.map(async item => {
            let category_id = +item.id;

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
                }).sortBy('count','desc').orderBy("count","desc").take(20)
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
                id: category_id,
                title: item.title,
                sub_category_list: subCategoryFinalList
            }
        }));

        return {
            EC: 0,
            DT: data,
            EM: 'Get all categories success !'
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

const getCategoryInfo = async (category_id) => {
    try {
        let categoryData = await db.Category.findOne({
            raw: true,
            attributes: ['id', 'title'],
            where: {
                id: {
                    [Op.eq]: category_id,
                },
            }
        });

        if(categoryData) {
            return {
                EC: 0,
                DT: categoryData,
                EM: 'Get category info successfully !'
            }
        }

        else {
            return {
                EC: -1,
                DT: "",
                EM: 'Category is not existed !'
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
    getAllCategories, getCategoryInfo
}