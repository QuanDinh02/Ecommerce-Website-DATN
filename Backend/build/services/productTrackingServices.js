"use strict";

var db = require('../models/index.js');
var updateProductRecommendClick = function updateProductRecommendClick(product_id) {
  try {
    db.ProductTracking.increment({
      recommend_view: 1
    }, {
      where: {
        productID: product_id
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
var updateProductView = function updateProductView(product_id) {
  try {
    db.ProductTracking.increment({
      view: 1
    }, {
      where: {
        productID: product_id
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  updateProductRecommendClick: updateProductRecommendClick,
  updateProductView: updateProductView
};