import express from 'express';
import apiController from '../controller/apiController';
import categoryController from '../controller/categoryController';
import productController from '../controller/productController';
import { checkUserJWT } from '../middleware/jwt';

const router = express.Router();

const ApiRoute = (app) => {

    //router.get('/testAPI', apiController.testAPI);

    // router.post('/staff/login', apiController.handleStaffLogin);
    // router.get('/staff/logout', apiController.handleStaffLogout);
    
    // router.get('/fetch/account', checkUserJWT, apiController.handleFetchAccount);

    router.get('/categories', categoryController.getCategoryList);

    router.get('/products/category', productController.getProductsByCategory);

    router.get('/products/sub-category', productController.getProductsBySubCategory);

    return app.use('/api', router);
}

export default ApiRoute;