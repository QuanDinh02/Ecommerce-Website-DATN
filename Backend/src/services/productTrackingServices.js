const db = require('../models/index.js');

const updateProductRecommendClick = (product_id) => {
    try {
        db.ProductTracking.increment({ recommend_view: 1 }, { where: { productID: product_id } });
    } catch (error) {
        console.log(error);
        return null
    }
}

const updateProductView = (product_id) => {
    try {
        db.ProductTracking.increment({ view: 1 }, { where: { productID: product_id } });
    } catch (error) {
        console.log(error);
        return null
    }
}

module.exports = {
    updateProductRecommendClick, updateProductView
}