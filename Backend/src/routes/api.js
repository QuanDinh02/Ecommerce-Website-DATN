import express from 'express';
import apiController from '../controller/apiController';

import { checkUserJWT } from '../middleware/jwt';

const router = express.Router();

const ApiRoute = (app) => {

    router.get('/testAPI', apiController.testAPI);

    router.post('/staff/login', apiController.handleStaffLogin);
    router.get('/staff/logout', apiController.handleStaffLogout);
    
    router.get('/fetch/account', checkUserJWT, apiController.handleFetchAccount);

    return app.use('/api', router);
}

export default ApiRoute;