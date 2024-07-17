"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = _interopRequireDefault(require("../controller/apiController"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _customerController = _interopRequireDefault(require("../controller/customerController"));
var _categoryController = _interopRequireDefault(require("../controller/categoryController"));
var _productController = _interopRequireDefault(require("../controller/productController"));
var _subCategoryController = _interopRequireDefault(require("../controller/subCategoryController"));
var _cartItemController = _interopRequireDefault(require("../controller/cartItemController"));
var _wishListController = _interopRequireDefault(require("../controller/wishListController"));
var _searchController = _interopRequireDefault(require("../controller/searchController"));
var _sessionController = _interopRequireDefault(require("../controller/sessionController"));
var _orderController = _interopRequireDefault(require("../controller/orderController"));
var _recommendProductController = _interopRequireDefault(require("../controller/recommendProductController"));
var _locationController = _interopRequireDefault(require("../controller/locationController"));
var _imageController = _interopRequireDefault(require("../controller/imageController"));
var _sellerController = _interopRequireDefault(require("../controller/sellerController"));
var _jwt = require("../middleware/jwt");
var _cache = require("../middleware/cache");
var _shippingUnitController = _interopRequireDefault(require("../controller/shippingUnitController"));
var _adminController = _interopRequireDefault(require("../controller/adminController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
});
var ApiRoute = function ApiRoute(app) {
  router.get('/testAPI', _apiController["default"].testAPI);

  // USER AUTHENTICATION
  router.get('/user/register/email-validate', _userController["default"].checkCustomerEmailExist);
  router.post('/user/register', _userController["default"].handleUserRegister);
  router.post('/user/login', _userController["default"].handleUserLogin);
  router.get('/user/logout', _userController["default"].handleUserLogout);
  router.put('/user/change-password', _userController["default"].handleUserChangePassword);
  router.get('/user/change-password/email-validate', _userController["default"].checkEmailWebsiteUserExist);
  router.post('/user/change-pasword/verification-code', _userController["default"].sendVertificationCode);
  router.post('/user/change-pasword/verify', _userController["default"].handleCodeVertification);

  // SYSTEM USER AUTHENTICATION
  router.post('/user/sys/login', _userController["default"].handleSystemUserLogin);
  router.get('/user/sys/logout', _userController["default"].handleSystemUserLogout);
  router.get('/user/account', _jwt.checkUserJWT, _userController["default"].handleFetchUserAccount);
  router.get('/user/sys/account', _jwt.checkSysUserJWT, _userController["default"].handleFetchUserAccount);
  router.put('/user/password', _userController["default"].handleChangeUserPassword);

  // CUSTOMER
  router.get('/customer/info', _customerController["default"].getCustomerInfo);
  router.post('/customer/info', _jwt.checkUserJWT, upload.single('image'), _customerController["default"].updateCustomerInfo);
  router.put('/customer/info/password', _jwt.checkUserJWT, _customerController["default"].changeCustomerPassword);
  router.get('/customer/info/address', _jwt.checkUserJWT, _customerController["default"].getAllCustomerAddress);
  router.post('/customer/info/address', _jwt.checkUserJWT, _customerController["default"].createNewCustomerAddress);
  router.put('/customer/info/address', _jwt.checkUserJWT, _customerController["default"].updateCustomerDefaultAddress);
  router.put('/customer/info/address/update', _customerController["default"].updateCustomerAddress);
  router["delete"]('/customer/info/address/:id', _customerController["default"].deleteCustomerAddress);
  router.post('/customer/register/verification-code', _customerController["default"].sendVertificatedCode);
  router.post('/customer/register/verify', _customerController["default"].handleCodeVertification);

  // NEW CUSTOMER
  router.get('/new-customer/check', _customerController["default"].handleCheckNewCustomer);
  router["delete"]('/new-customer/remove/:id', _customerController["default"].handleRemoveCheckNewCustomer);
  router.post('/new-customer/training', _jwt.checkUserJWT, _customerController["default"].trainingNewCustomer);
  router.get('/categories', (0, _cache.cacheMiddleware)(300), _categoryController["default"].getCategoryList);
  router.get('/category', _categoryController["default"].getCategoryInfo);
  router.get('/categories-only', _categoryController["default"].getOnlyCategory);
  router.get('/product/detail', _productController["default"].getProductDetail);
  router.get('/product/detail/shop_info', (0, _cache.cacheMiddleware)(300), _productController["default"].getProductDetailShopInfo);
  router.get('/product/detail/review', _productController["default"].getProductReviews);
  router.post('/products/history', _productController["default"].getProductsHistory);
  router.post('/products/history/swiper', _productController["default"].getHistoryProductsSwiper);
  router.get('/products/category', _productController["default"].getProductsByCategory);
  router.get('/shop/products/category', _productController["default"].getProductsByShopCategory);
  router.get('/shop/categories', _productController["default"].getShopCategories);
  router.get('/shop/shop_info', (0, _cache.cacheMiddleware)(300), _productController["default"].getShopInfo);
  router.get('/products/sub-category', _productController["default"].getProductsBySubCategory);
  router.get('/products/search', _productController["default"].handleGetSearchProducts);
  router.get('/products/search-page', (0, _cache.cacheMiddleware)(300), _productController["default"].handleGetSearchProductsWithPagination);
  router.get('/sub-category/category', _subCategoryController["default"].getSubCategoryByCategory);
  router.get('/sub-category/category-web', (0, _cache.cacheMiddleware)(300), _subCategoryController["default"].getSubCategoryByCategoryWeb);
  router.post('/sub-category/recommend', _subCategoryController["default"].getRecommendSubCategory);
  router.get('/sub-category', _subCategoryController["default"].getSubCategoryInfo);

  // CUSTOMER CART ITEM
  router.get('/cart-item', _cartItemController["default"].getQuickCartItems);
  router.post('/cart-item', _cartItemController["default"].addCartItem);
  router.put('/cart-item', _cartItemController["default"].updateCartItem);
  router["delete"]('/cart-item/:id', _cartItemController["default"].deleteCartItem);
  router["delete"]('/cart-item/all/:id', _cartItemController["default"].deleteCartItemByCustomer);

  // CUSTOMER WISH LIST
  router.get('/wish-list', _wishListController["default"].getWishListByCustomer);
  router.post('/wish-list', _wishListController["default"].addWishListItem);
  router["delete"]('/wish-list/:id', _wishListController["default"].deleteWishListItem);
  router.post('/search-history', _jwt.checkUserJWT, _searchController["default"].customerSearchRecord);
  router.post('/session-activity', _jwt.checkUserJWT, _sessionController["default"].handleSavingSessionActivity);

  // CUSTOMER ORDER
  router.post('/order', _jwt.checkUserJWT, _orderController["default"].createNewOrder);
  router.get('/order', _orderController["default"].getOrderByCustomer);
  router["delete"]('/order/cancel/:id', _orderController["default"].cancelOrderByCustomer);
  router.get('/order/search', _orderController["default"].getOrderSearchByCustomer);
  router.get('/order/detail', _orderController["default"].getCustomerOrderDetail);
  router.get('/order/rating', _orderController["default"].getOrderItemInfoForRating);
  router.post('/order/rating', _jwt.checkUserJWT, _orderController["default"].customerRatingProduct);
  router.get('/order/shipping-method', _orderController["default"].getShippingMethod);
  router.get('/order/payment-method', _orderController["default"].getPaymentMethod);

  // DATA FOR ADDRESS
  router.get('/provinces', (0, _cache.cacheMiddleware)(300), _locationController["default"].getAllProvinces);
  router.get('/districts/province/:province_code', (0, _cache.cacheMiddleware)(300), _locationController["default"].getDistrictsByProvince);
  router.get('/wards/district/:district_code', (0, _cache.cacheMiddleware)(300), _locationController["default"].getWardsByDistrict);

  // RECOMMEND PRODUCT
  router.post('/recommend', _recommendProductController["default"].createRecommendProducts);
  router.get('/recommend', _recommendProductController["default"].getRecommendProducts);
  router.put('/product/recommend', _productController["default"].updateProductRecommendClick);
  router.get('/training-recommend-item', _recommendProductController["default"].handleExecuteTrainingRecommendProduct);
  router.post('/simulating-recommend', _recommendProductController["default"].simulatingCreateRecommendProducts);
  router.post('/simulating-3session-recommend', _recommendProductController["default"].simulatingCreateRecommend3SessionProducts);
  router.get('/simulating-training-recommend-item', _recommendProductController["default"].handleSimulatingExecuteTrainingRecommendProduct);
  router.get('/predict-recommend-relevant-item', (0, _cache.cacheMiddleware)(300), _recommendProductController["default"].handlePredictRecommendRelevantProducts);
  router.get('/image', _imageController["default"].getImage);
  router.post('/image', upload.single('image'), _imageController["default"].uploadImage);
  router["delete"]('/image/:id', _imageController["default"].deleteImage);

  //SELLER:
  router.get('/seller/dashboard', _jwt.checkUserJWT, _sellerController["default"].getDashboardData);
  router.get('/seller/register/email-validate', _userController["default"].checkSellerEmailExist);
  router.post('/seller/register/verification-code', _sellerController["default"].sendVertificatedCode);
  router.post('/seller/register/verify', _sellerController["default"].handleCodeVertification);
  router.get('/seller/products/inventory/search', _jwt.checkUserJWT, _sellerController["default"].getProductInventorySearch);
  router.put('/seller/products/inventory', _jwt.checkUserJWT, _sellerController["default"].updateProductInventory);
  router.get('/seller/products/announce', _jwt.checkUserJWT, _sellerController["default"].getProductsAnnouncement);
  router.get('/seller/products', _jwt.checkUserJWT, _sellerController["default"].getProductPagination);
  router.get('/seller/products/search', _jwt.checkUserJWT, _sellerController["default"].getProductSearch);
  router.get('/seller/order', _jwt.checkUserJWT, _sellerController["default"].getOrderPagination);
  router.get('/seller/order/search', _jwt.checkUserJWT, _sellerController["default"].getOrderSearch);
  router.put('/seller/order/confirm', _jwt.checkUserJWT, _sellerController["default"].confirmCustomerOrder);
  router.put('/seller/order/packing', _jwt.checkUserJWT, _sellerController["default"].packingCustomerOrder);
  router.get('/seller/product-review/order', _jwt.checkUserJWT, _sellerController["default"].getOrderReviewPagination);
  router.get('/seller/product-review/order/search', _jwt.checkUserJWT, _sellerController["default"].getOrderReviewSearch);
  router.post('/seller/product-review/order/response', _jwt.checkUserJWT, _sellerController["default"].sellerResponseCustomerRating);
  router.post('/seller/product', _jwt.checkUserJWT, upload.single('image'), _sellerController["default"].createNewProduct);
  router.put('/seller/product', _jwt.checkUserJWT, _sellerController["default"].updateProduct);
  router["delete"]('/seller/product/:id', _sellerController["default"].deleteProduct);
  router.get('/seller/categories', (0, _cache.cacheMiddleware)(300), _sellerController["default"].getCategoryList);
  router.get('/seller/subcategories/:category_id', (0, _cache.cacheMiddleware)(300), _sellerController["default"].getSubCategoryList);
  router.get('/seller/info', _jwt.checkUserJWT, _sellerController["default"].getSellerInfo);
  router.post('/seller/info', _jwt.checkUserJWT, upload.single('image'), _sellerController["default"].updateSellerInfo);
  router.get('/seller/shop/info', _jwt.checkUserJWT, _sellerController["default"].getSellerShopInfo);
  router.post('/seller/shop/info', _jwt.checkUserJWT, upload.single('image'), _sellerController["default"].updateShopInfo);
  router.get('/seller/order/detail', _jwt.checkUserJWT, _sellerController["default"].getOrderDetail);
  router.get('/seller/shop/category', _jwt.checkUserJWT, _sellerController["default"].getShopCategory);
  router.post('/seller/shop/category', _jwt.checkUserJWT, _sellerController["default"].createShopCategory);
  router.put('/seller/shop/category', _jwt.checkUserJWT, _sellerController["default"].editShopCategory);
  router["delete"]('/seller/shop/category/:id', _jwt.checkUserJWT, _sellerController["default"].removeShopCategory);
  router.get('/seller/shop/category/detail/exist', _jwt.checkUserJWT, _sellerController["default"].getShopCategoryDetailExist);
  router.get('/seller/shop/category/detail/not-exist', _jwt.checkUserJWT, _sellerController["default"].getShopCategoryDetailNotExist);
  router.post('/seller/shop/category/product', _jwt.checkUserJWT, _sellerController["default"].addProductToCategoryShop);
  router["delete"]('/seller/shop/category/product/:id', _jwt.checkUserJWT, _sellerController["default"].removeProductOutCategoryShop);

  // SHIPPING UNIT:
  router.get('/shipping-unit/dashboard', _jwt.checkSysUserJWT, _shippingUnitController["default"].getDashboardData);
  router.get('/shipping-unit/list', _shippingUnitController["default"].getShippingUnitList);
  router.get('/shipping-unit/order/search', _jwt.checkSysUserJWT, _shippingUnitController["default"].getOrderSearch);
  router.get('/shipping-unit/order', _jwt.checkSysUserJWT, _shippingUnitController["default"].getOrderStatus);
  router.get('/shipping-unit/order/detail', _jwt.checkSysUserJWT, _shippingUnitController["default"].getOrderDetail);
  router.put('/shipping-unit/order/received-confirmation', _jwt.checkSysUserJWT, _shippingUnitController["default"].confirmReceiveOrderSeller);
  router.put('/shipping-unit/order/shipping', _jwt.checkSysUserJWT, _shippingUnitController["default"].handleShippingOrder);
  router.put('/shipping-unit/order/complete-shipping', _jwt.checkSysUserJWT, _shippingUnitController["default"].handleConfirmCompleteShippingOrder);

  // ADMIN:
  router.get('/admin/analysis-product', _jwt.checkSysUserJWT, _adminController["default"].getAnalysisProduct);
  router.get('/admin/analysis-product/search', _jwt.checkSysUserJWT, _adminController["default"].getAnalysisProductSearch);
  router.get('/admin/dashboard', _jwt.checkSysUserJWT, _adminController["default"].getDashboardData);
  router.get('/admin/customer', _jwt.checkSysUserJWT, _adminController["default"].getCustomerData);
  router.get('/admin/customer/detail', _jwt.checkSysUserJWT, _adminController["default"].getCustomerInfoDetail);
  router.get('/admin/customer/search', _jwt.checkSysUserJWT, _adminController["default"].getCustomerSearch);
  router.put('/admin/customer/account', _jwt.checkSysUserJWT, _adminController["default"].updateAccountStatus);
  router.get('/admin/seller', _jwt.checkSysUserJWT, _adminController["default"].getSellerData);
  router.get('/admin/seller/search', _jwt.checkSysUserJWT, _adminController["default"].getSellerSearch);
  router.get('/admin/seller/detail', _jwt.checkSysUserJWT, _adminController["default"].getSellerInfoDetail);
  router.get('/admin/shipping-unit', _jwt.checkSysUserJWT, _adminController["default"].getShippingUnitData);
  router.get('/admin/shipping-unit/search', _jwt.checkSysUserJWT, _adminController["default"].getShippingUnitSearch);
  router.post('/admin/shipping-unit', _jwt.checkSysUserJWT, _adminController["default"].createShippingUnit);
  router.put('/admin/shipping-unit', _jwt.checkSysUserJWT, _adminController["default"].updateShippingUnit);
  router.put('/admin/shipping-unit/password', _jwt.checkSysUserJWT, _adminController["default"].updateShippingUnitPassword);
  return app.use('/api', router);
};
var _default = exports["default"] = ApiRoute;