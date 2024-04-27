const db = require('../models/index.js');
const { Op } = require("sequelize");

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
     
        return {
            EC: 0,
            DT: subCategoryList,
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

module.exports = {
    getSubCategoryByCategory
}