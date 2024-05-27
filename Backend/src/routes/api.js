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
import { checkUserJWT } from '../middleware/jwt';

const router = express.Router();
const multer = require('multer')
const upload = multer();

const ApiRoute = (app) => {

    router.get('/testAPI', apiController.testAPI);

    router.post('/user/register', userController.handleUserRegister);
    router.post('/user/login', userController.handleUserLogin);
    router.get('/user/logout', userController.handleUserLogout);

    router.get('/user/account', checkUserJWT, userController.handleFetchUserAccount);

    router.get('/customer/order-info', customerController.getCustomerInfoForOrder);

    router.get('/categories', categoryController.getCategoryList);

    router.get('/product/detail', productController.getProductDetail);
    router.get('/product/detail/review', productController.getProductReviews);

    router.get('/products/category', productController.getProductsByCategory);

    router.get('/products/sub-category', productController.getProductsBySubCategory);

    router.get('/products/search', productController.handleGetSearchProducts);

    router.get('/sub-category/category', subCategoryController.getSubCategoryByCategory);

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

    return app.use('/api', router);
}

export default ApiRoute;