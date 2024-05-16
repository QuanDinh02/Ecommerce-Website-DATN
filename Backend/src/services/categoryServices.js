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
                attributes: ['id', 'title'],
                where: {
                    categoryID: {
                        [Op.eq]: category_id,
                    },
                },
            });

            let subCategoryData = _(subCategoryList).take(20).value();

            return {
                id: category_id,
                title: item.title,
                sub_category_list: subCategoryData
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

module.exports = {
    getAllCategories
}