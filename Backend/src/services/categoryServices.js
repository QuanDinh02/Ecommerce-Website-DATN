const db = require('../models/index.js');
const { Op } = require("sequelize");

const getAllCategories = async () => {
    try {
        let categoryData = await db.Category.findAll({
            raw: true,
            attributes: ['id', 'title'],
        });

        let data = await Promise.all(categoryData.map(async item => {
            let category_id = +item.id;
            let categoryList = await db.SubCategory.findAll({
                raw: true,
                attributes: ['id', 'title'],
                where: {
                    categoryID: {
                        [Op.eq]: category_id,
                    },
                },
            });

            return {
                id: category_id,
                title: item.title,
                sub_category_list: categoryList
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