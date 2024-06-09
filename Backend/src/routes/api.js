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
import { checkUserJWT } from '../middleware/jwt';
import { cacheMiddleware } from '../middleware/cache';

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

    router.get('/user/account', checkUserJWT, userController.handleFetchUserAccount);

    router.put('/user/password', userController.handleChangeUserPassword);

    router.get('/customer/order-info', customerController.getCustomerInfoForOrder);
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

    router.get('/categories', cacheMiddleware(300), categoryController.getCategoryList);
    router.get('/category', categoryController.getCategoryInfo);

    router.get('/product/detail', productController.getProductDetail);
    router.get('/product/detail/review', productController.getProductReviews);

    router.get('/products/category', productController.getProductsByCategory);

    router.get('/products/sub-category', productController.getProductsBySubCategory);

    router.get('/products/search', productController.handleGetSearchProducts);

    router.get('/products/search-page', cacheMiddleware(300), productController.handleGetSearchProductsWithPagination);

    router.get('/sub-category/category', subCategoryController.getSubCategoryByCategory);
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

    router.get('/provinces', cacheMiddleware(300), locationController.getAllProvinces);
    router.get('/districts/province/:province_code', cacheMiddleware(300), locationController.getDistrictsByProvince);
    router.get('/wards/district/:district_code', cacheMiddleware(300), locationController.getWardsByDistrict);

    router.post('/recommend', recommendProductController.createRecommendProducts);
    router.get('/recommend', recommendProductController.getRecommendProducts);

    router.get('/training-recommend-item', recommendProductController.handleExecuteTrainingRecommendProduct);

    router.post('/simulating-recommend', recommendProductController.simulatingCreateRecommendProducts);
    router.post('/simulating-3session-recommend', recommendProductController.simulatingCreateRecommend3SessionProducts);
    router.get('/simulating-training-recommend-item', recommendProductController.handleSimulatingExecuteTrainingRecommendProduct);

    router.get('/image', imageController.getImage);
    router.post('/image', upload.single('image'), imageController.uploadImage);
    router.delete('/image/:id', imageController.deleteImage);

    // >>> check data: 
    // {
    //     customer_id: 1,
    //     list: 
    //     [
    //         { product_id: '195797729', predict_rating: '4.436582809224318' },
    //         { product_id: '21441058', predict_rating: '4.436582809224318' },
    //         { product_id: '176598086', predict_rating: '4.330790847049378' },
    //         { product_id: '58678598', predict_rating: '4.330790847049378' },
    //         { product_id: '1025034', predict_rating: '4.2317216981132075' },
    //         { product_id: '579949', predict_rating: '4.2317216981132075' },
    //         { product_id: '68716608', predict_rating: '3.3717679944095043' },
    //         { product_id: '11488924', predict_rating: '3.2317216981132075' },
    //         { product_id: '56941526', predict_rating: '2.4365828092243182' },
    //         { product_id: '25421010', predict_rating: '1' }
    //     ]
    // } 

    return app.use('/api', router);
}

export default ApiRoute;