import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import customerController from '../controller/customerController';
import categoryController from '../controller/categoryController';
import productController from '../controller/productController';
import subCategoryController from '../controller/subCategoryController';
import cartItemController from '../controller/cartItemController';
import wishListController from '../controller/wishListController';
import searchController from '../controller/searchController';
import sessionController from '../controller/sessionController';
import orderController from '../controller/orderController';
import recommendProductController from '../controller/recommendProductController';
import locationController from '../controller/locationController';
import imageController from '../controller/imageController';
import sellerController from '../controller/sellerController';
import { checkUserJWT, checkSysUserJWT } from '../middleware/jwt';
import { cacheMiddleware } from '../middleware/cache';
import shippingUnitController from '../controller/shippingUnitController';

const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ApiRoute = (app) => {

    router.get('/testAPI', apiController.testAPI);

    router.get('/user/register/email-validate', userController.checkCustomerEmailExist);
    router.post('/user/register', userController.handleUserRegister);
    router.post('/user/login', userController.handleUserLogin);
    router.get('/user/logout', userController.handleUserLogout);

    router.post('/user/sys/login', userController.handleSystemUserLogin);
    router.get('/user/sys/logout', userController.handleSystemUserLogout);
    router.get('/user/account', checkUserJWT, userController.handleFetchUserAccount);
    router.get('/user/sys/account', checkSysUserJWT, userController.handleFetchUserAccount);

    router.put('/user/password', userController.handleChangeUserPassword);

    router.get('/customer/info', customerController.getCustomerInfo);
    router.put('/customer/info', customerController.updateCustomerInfo);
    router.put('/customer/info/password', checkUserJWT, customerController.changeCustomerPassword);

    router.get('/customer/info/address', checkUserJWT, customerController.getAllCustomerAddress);
    router.post('/customer/info/address', checkUserJWT, customerController.createNewCustomerAddress);
    router.put('/customer/info/address', checkUserJWT, customerController.updateCustomerDefaultAddress);
    router.put('/customer/info/address/update', customerController.updateCustomerAddress);
    router.delete('/customer/info/address/:id', customerController.deleteCustomerAddress);

    router.post('/customer/register/verification-code', customerController.sendVertificatedCode);
    router.post('/customer/register/verify', customerController.handleCodeVertification);

    router.get('/new-customer/check', customerController.handleCheckNewCustomer);
    router.delete('/new-customer/remove/:id', customerController.handleRemoveCheckNewCustomer);
    router.post('/new-customer/training', checkUserJWT, customerController.trainingNewCustomer);

    router.get('/categories', cacheMiddleware(300), categoryController.getCategoryList);
    router.get('/category', categoryController.getCategoryInfo);
    router.get('/categories-only', categoryController.getOnlyCategory);

    router.get('/product/detail', productController.getProductDetail);
    router.get('/product/detail/review', productController.getProductReviews);

    router.post('/products/history', productController.getProductsHistory);
    router.post('/products/history/swiper', productController.getHistoryProductsSwiper);

    router.get('/products/category', productController.getProductsByCategory);

    router.get('/products/sub-category', productController.getProductsBySubCategory);

    router.get('/products/search', productController.handleGetSearchProducts);

    router.get('/products/search-page', cacheMiddleware(300), productController.handleGetSearchProductsWithPagination);

    router.get('/sub-category/category', subCategoryController.getSubCategoryByCategory);
    router.post('/sub-category/recommend', subCategoryController.getRecommendSubCategory);
    router.get('/sub-category', subCategoryController.getSubCategoryInfo);

    router.put('/product', upload.single('image'), productController.handleUpdateProductImage);

    router.get('/cart-item', cartItemController.getQuickCartItems);
    router.post('/cart-item', cartItemController.addCartItem);
    router.put('/cart-item', cartItemController.updateCartItem);
    router.delete('/cart-item/:id', cartItemController.deleteCartItem);

    router.delete('/cart-item/all/:id', cartItemController.deleteCartItemByCustomer);

    router.get('/wish-list', wishListController.getWishListByCustomer);
    router.post('/wish-list', wishListController.addWishListItem);
    router.delete('/wish-list/:id', wishListController.deleteWishListItem);

    router.post('/search-history', checkUserJWT, searchController.customerSearchRecord);
    router.post('/session-activity', checkUserJWT, sessionController.handleSavingSessionActivity);

    router.post('/order', checkUserJWT, orderController.createNewOrder);
    router.get('/order', orderController.getOrderByCustomer);
    router.delete('/order/cancel/:id', orderController.cancelOrderByCustomer);
    router.get('/order/search', orderController.getOrderSearchByCustomer);
    router.get('/order/detail', orderController.getCustomerOrderDetail);
    router.get('/order/rating', orderController.getOrderItemInfoForRating);
    router.post('/order/rating', checkUserJWT, orderController.customerRatingProduct);
    router.get('/order/shipping-method', orderController.getShippingMethod);
    router.get('/order/payment-method', orderController.getPaymentMethod);

    router.get('/provinces', cacheMiddleware(300), locationController.getAllProvinces);
    router.get('/districts/province/:province_code', cacheMiddleware(300), locationController.getDistrictsByProvince);
    router.get('/wards/district/:district_code', cacheMiddleware(300), locationController.getWardsByDistrict);

    router.post('/recommend', recommendProductController.createRecommendProducts);
    router.get('/recommend', recommendProductController.getRecommendProducts);

    router.get('/training-recommend-item', recommendProductController.handleExecuteTrainingRecommendProduct);

    router.post('/simulating-recommend', recommendProductController.simulatingCreateRecommendProducts);
    router.post('/simulating-3session-recommend', recommendProductController.simulatingCreateRecommend3SessionProducts);
    router.get('/simulating-training-recommend-item', recommendProductController.handleSimulatingExecuteTrainingRecommendProduct);

    router.get('/predict-recommend-relevant-item', cacheMiddleware(300), recommendProductController.handlePredictRecommendRelevantProducts);

    router.get('/image', imageController.getImage);
    router.post('/image', upload.single('image'), imageController.uploadImage);
    router.delete('/image/:id', imageController.deleteImage);


    //SELLER:

    router.get('/seller/register/email-validate', userController.checkSellerEmailExist);
    router.post('/seller/register/verification-code', sellerController.sendVertificatedCode);
    router.post('/seller/register/verify', sellerController.handleCodeVertification);

    router.get('/seller/products', checkUserJWT, sellerController.getProductPagination)
    router.get('/seller/order', checkUserJWT, sellerController.getOrderPagination)
    router.put('/seller/order/confirm', checkUserJWT, sellerController.confirmCustomerOrder)
    router.put('/seller/order/packing', checkUserJWT, sellerController.packingCustomerOrder)
    router.post('/seller/product', checkUserJWT, sellerController.createNewProduct);
    router.put('/seller/product', checkUserJWT, sellerController.updateProduct);
    router.delete('/seller/product/:id', sellerController.deleteProduct);

    router.get('/seller/categories', cacheMiddleware(300), sellerController.getCategoryList);
    router.get('/seller/subcategories/:category_id', cacheMiddleware(300), sellerController.getSubCategoryList);

    router.get('/seller/info', checkUserJWT, sellerController.getSellerInfo);
    router.put('/seller/info', checkUserJWT, sellerController.updateSellerInfo);

    router.get('/seller/order/detail', checkUserJWT, sellerController.getOrderDetail);
    router.get('/seller/shop/category', checkUserJWT, sellerController.getShopCategory);
    router.post('/seller/shop/category', checkUserJWT, sellerController.createShopCategory);
    router.put('/seller/shop/category', checkUserJWT, sellerController.editShopCategory);
    router.delete('/seller/shop/category/:id', checkUserJWT, sellerController.removeShopCategory);
    router.get('/seller/shop/category/detail/exist', checkUserJWT, sellerController.getShopCategoryDetailExist);
    router.get('/seller/shop/category/detail/not-exist', checkUserJWT, sellerController.getShopCategoryDetailNotExist);

    // SHIPPING UNIT
    router.get('/shipping-unit/list', shippingUnitController.getShippingUnitList);
    router.get('/shipping-unit/order', checkSysUserJWT, shippingUnitController.getOrderStatus);
    router.get('/shipping-unit/order/detail', checkSysUserJWT, shippingUnitController.getOrderDetail);
    router.put('/shipping-unit/order/received-confirmation', checkSysUserJWT, shippingUnitController.confirmReceiveOrderSeller);
    router.put('/shipping-unit/order/shipping', checkSysUserJWT, shippingUnitController.handleShippingOrder);
    router.put('/shipping-unit/order/complete-shipping', checkSysUserJWT, shippingUnitController.handleConfirmCompleteShippingOrder);

    return app.use('/api', router);
}

export default ApiRoute;