import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import categoryController from '../controller/categoryController';
import productController from '../controller/productController';
import subCategoryController from '../controller/subCategoryController';
import { checkUserJWT } from '../middleware/jwt';

const router = express.Router();
const multer  = require('multer')
const upload = multer();

const ApiRoute = (app) => {

    //router.get('/testAPI', apiController.testAPI);

    router.post('/user/register', userController.handleUserRegister);
    router.post('/user/login', userController.handleUserLogin);
    router.get('/user/logout', userController.handleUserLogout);
 
    router.get('/user/account', checkUserJWT, userController.handleFetchUserAccount);

    router.get('/categories', categoryController.getCategoryList);

    router.get('/products/category', productController.getProductsByCategory);

    router.get('/products/sub-category', productController.getProductsBySubCategory);

    router.get('/products/search', productController.handleGetSearchProducts);

    router.get('/sub-category/category', subCategoryController.getSubCategoryByCategory);

    router.put('/product',upload.single('image'),productController.handleUpdateProductImage);

    return app.use('/api', router);
}

export default ApiRoute;