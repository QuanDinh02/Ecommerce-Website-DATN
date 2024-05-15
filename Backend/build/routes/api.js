"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = _interopRequireDefault(require("../controller/apiController"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _categoryController = _interopRequireDefault(require("../controller/categoryController"));
var _productController = _interopRequireDefault(require("../controller/productController"));
var _subCategoryController = _interopRequireDefault(require("../controller/subCategoryController"));
var _cartItemController = _interopRequireDefault(require("../controller/cartItemController"));
var _wishListController = _interopRequireDefault(require("../controller/wishListController"));
var _jwt = require("../middleware/jwt");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var multer = require('multer');
var upload = multer();
var ApiRoute = function ApiRoute(app) {
  router.get('/testAPI', _apiController["default"].testAPI);
  router.post('/user/register', _userController["default"].handleUserRegister);
  router.post('/user/login', _userController["default"].handleUserLogin);
  router.get('/user/logout', _userController["default"].handleUserLogout);
  router.get('/user/account', _jwt.checkUserJWT, _userController["default"].handleFetchUserAccount);
  router.get('/categories', _categoryController["default"].getCategoryList);
  router.get('/product/detail', _productController["default"].getProductDetail);
  router.get('/products/category', _productController["default"].getProductsByCategory);
  router.get('/products/sub-category', _productController["default"].getProductsBySubCategory);
  router.get('/products/search', _productController["default"].handleGetSearchProducts);
  router.get('/sub-category/category', _subCategoryController["default"].getSubCategoryByCategory);
  router.put('/product', upload.single('image'), _productController["default"].handleUpdateProductImage);
  router.get('/cart-item', _cartItemController["default"].getQuickCartItems);
  router.post('/cart-item', _cartItemController["default"].addCartItem);
  router.put('/cart-item', _cartItemController["default"].updateCartItem);
  router["delete"]('/cart-item/:id', _cartItemController["default"].deleteCartItem);
  router.get('/wish-list', _wishListController["default"].getWishListByCustomer);
  router.post('/wish-list', _wishListController["default"].addWishListItem);
  router["delete"]('/wish-list/:id', _wishListController["default"].deleteWishListItem);
  return app.use('/api', router);
};
var _default = exports["default"] = ApiRoute;