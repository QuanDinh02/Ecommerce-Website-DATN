import recommendProductServices from '../services/recommendProductServices';
import { PythonShell } from 'python-shell';

import dotenv from 'dotenv';
dotenv.config();

const createRecommendProducts = async (req, res) => {
    try {

        let data = JSON.parse(req.body.data);

        let customerID = data.customer_id;
        let list = JSON.parse(data.list);

        let dataFormat = list.map(item => {
            return {
                product_id: +item.product_id,
                predict_rating: +item.predict_rating,
                customerID: +customerID
            }
        })

        let result = await recommendProductServices.createRecommendProducts(dataFormat);

        return res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
        })
    }
}

const handleExecuteTrainingRecommendProduct = async (req, res) => {

    var options = {
        scriptPath: process.env.RECOMMEND_ITEM_TRAINING_FILE_PATH,
        args: [req.query.customer_id]
    };

    let result = await PythonShell.run('predict.py', options);

    if (result) {
        let message = result[0];
        if (message === "OK") {
            return res.status(200).json({
                EC: 0,
                DT: '',
                EM: 'Training recommeded item successfully !'
            })
        } else {
            return res.status(500).json({
                EC: -1,
                DT: '',
                EM: 'Training recommeded item failed !'
            })
        }
    }
}

module.exports = {
    createRecommendProducts, handleExecuteTrainingRecommendProduct
}