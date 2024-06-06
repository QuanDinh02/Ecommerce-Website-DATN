import recommendProductServices from '../services/recommendProductServices';
import { PythonShell } from 'python-shell';

import dotenv from 'dotenv';
dotenv.config();

const serverErrorMessage = () => {
    return res.status(500).json({
        EC: -2,
        DT: '',
        EM: "error from server !"
    })
}

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

const getRecommendProducts = async (req, res) => {
    try {
        let { id: customer_id } = req.query;

        let training_status = await recommendProductServices.getTrainingRecommendItemStatus(+customer_id);

        if (training_status && training_status.EC === 0) {
            let status_1 = training_status.DT.activePredict;
            let status_2 = training_status.DT.activePredict3Session;

            if(status_1 === 0 && status_2 === 0) {
                let result = await recommendProductServices.getBothRecommendProducts(+customer_id);

                return res.status(200).json({
                    EC: result.EC,
                    DT: result.DT,
                    EM: result.EM
                })
            }
            else if (status_1 === 0) {
                let result = await recommendProductServices.getRecommendProducts(+customer_id);

                return res.status(200).json({
                    EC: result.EC,
                    DT: result.DT,
                    EM: result.EM
                })
            }
            else if (status_2 === 0) {
                let result = await recommendProductServices.get3SessionRecommendProducts(+customer_id);

                return res.status(200).json({
                    EC: result.EC,
                    DT: result.DT,
                    EM: result.EM
                })
            }
            else {
                let result = await recommendProductServices.getHistoryRecommendProducts(+customer_id);

                return res.status(200).json({
                    EC: result.EC,
                    DT: result.DT,
                    EM: result.EM
                })
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
        })
    }
}

const simulatingCreateRecommendProducts = async (req, res) => {
    try {

        // let data = {
        //     customer_id: 1,
        //     list:
        //         [
        //             { product_id: '195797729', predict_rating: '4.436582809224318' },
        //             { product_id: '21441058', predict_rating: '4.436582809224318' },
        //             { product_id: '176598086', predict_rating: '4.330790847049378' },
        //             { product_id: '58678598', predict_rating: '4.330790847049378' },
        //             { product_id: '1025034', predict_rating: '4.2317216981132075' },
        //             { product_id: '579949', predict_rating: '4.2317216981132075' },
        //             { product_id: '68716608', predict_rating: '3.3717679944095043' },
        //             { product_id: '11488924', predict_rating: '3.2317216981132075' },
        //             { product_id: '56941526', predict_rating: '2.4365828092243182' },
        //             { product_id: '25421010', predict_rating: '1' }
        //         ]
        // }

        // let customerID = data.customer_id;
        // let list = data.list;

        // let dataFormat = list.map(item => {
        //     return {
        //         product_id: +item.product_id,
        //         predict_rating: +item.predict_rating,
        //         customerID: +customerID
        //     }
        // })

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

        let result = await recommendProductServices.createRecommendProducts(customerID, dataFormat);

        return res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
        })
    }
}

const simulatingCreateRecommend3SessionProducts = async (req, res) => {
    try {

        // let data = {
        //     customer_id: 1,
        //     list:
        //         [
        //             { product_id: '39001', predict_rating: '4.436582809224318' },
        //             { product_id: '57881', predict_rating: '4.436582809224318' },
        //             { product_id: '63213', predict_rating: '4.330790847049378' },
        //             { product_id: '63217', predict_rating: '4.330790847049378' },
        //             { product_id: '70765', predict_rating: '4.2317216981132075' },
        //             { product_id: '70865', predict_rating: '4.2317216981132075' },
        //             { product_id: '93540', predict_rating: '3.3717679944095043' },
        //             { product_id: '105628', predict_rating: '3.2317216981132075' },
        //             { product_id: '92969', predict_rating: '2.4365828092243182' },
        //             { product_id: '107482', predict_rating: '1' }
        //         ]
        // }

        // let customerID = data.customer_id;
        // let list = data.list;

        // let dataFormat = list.map(item => {
        //     return {
        //         product_id: +item.product_id,
        //         predict_rating: +item.predict_rating,
        //         customerID: +customerID
        //     }
        // })

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
        
        let result = await recommendProductServices.create3SessionRecommendProducts(customerID, dataFormat);

        return res.status(200).json({
            EC: result.EC,
            DT: result.DT,
            EM: result.EM
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -2,
            DT: '',
            EM: "error from server !"
        })
    }
}

const handleSimulatingExecuteTrainingRecommendProduct = async (req, res) => {

    // Recommend Product from file simulatingPredict.py:

    // let data = {
    //     customer_id: 1,
    //     list:
    //         [
    //             { product_id: '195797729', predict_rating: '4.436582809224318' },
    //             { product_id: '21441058', predict_rating: '4.436582809224318' },
    //             { product_id: '176598086', predict_rating: '4.330790847049378' },
    //             { product_id: '58678598', predict_rating: '4.330790847049378' },
    //             { product_id: '1025034', predict_rating: '4.2317216981132075' },
    //             { product_id: '579949', predict_rating: '4.2317216981132075' },
    //             { product_id: '68716608', predict_rating: '3.3717679944095043' },
    //             { product_id: '11488924', predict_rating: '3.2317216981132075' },
    //             { product_id: '56941526', predict_rating: '2.4365828092243182' },
    //             { product_id: '25421010', predict_rating: '1' }
    //         ]
    // }

    // ------------------------------------------------------------------------------------
    // Recommend Product from file simulatingPredict3Session.py:

    // let data = {
    //     customer_id: 1,
    //     list:
    //         [
    //             { product_id: '39001', predict_rating: '4.436582809224318' },
    //             { product_id: '57881', predict_rating: '4.436582809224318' },
    //             { product_id: '63213', predict_rating: '4.330790847049378' },
    //             { product_id: '63217', predict_rating: '4.330790847049378' },
    //             { product_id: '70765', predict_rating: '4.2317216981132075' },
    //             { product_id: '70865', predict_rating: '4.2317216981132075' },
    //             { product_id: '93540', predict_rating: '3.3717679944095043' },
    //             { product_id: '105628', predict_rating: '3.2317216981132075' },
    //             { product_id: '92969', predict_rating: '2.4365828092243182' },
    //             { product_id: '107482', predict_rating: '1' }
    //         ]
    // }
    try {
        let { customer_id } = req.query;

        let training_status = await recommendProductServices.getTrainingRecommendItemStatus(+customer_id);

        if (training_status && training_status.EC === 0) {
            if (training_status.DT.activePredict === 0 && training_status.DT.activePredict3Session === 0) {

                let update_training_status = await recommendProductServices.updateTrainingRecommendItemStatus(+customer_id, 1);
                let update_training_3session_status = await recommendProductServices.updateTraining3SessionRecommendItemStatus(+customer_id, 1);

                if (update_training_status.EC === 0 && update_training_3session_status.EC === 0) {

                    await recommendProductServices.clearHistoryRecommendItem(+customer_id);
                    let backup_recommend_item_res = await recommendProductServices.createHistoryRecommendItem(+customer_id);

                    if (backup_recommend_item_res && backup_recommend_item_res.EC === 0) {

                        var options = {
                            scriptPath: "E:/MINH_QUAN/DO_AN_TOT_NGHIEP/WEBSITE/Backend/src/routes",
                            args: [req.query.customer_id]
                        };

                        // Run training modal from Predict and Predict 3 Session
                        PythonShell.run('predict.py', options);
                        PythonShell.run('after3Session.py', options);

                        return res.status(200).json({
                            EC: 0,
                            DT: "",
                            EM: 'Training data of recommend item is processing !'
                        });

                    } else {
                        await recommendProductServices.updateTrainingRecommendItemStatus(+customer_id, 0);
                        serverErrorMessage();
                    }

                } else {
                    serverErrorMessage();
                }

            }
            else {
                return res.status(200).json({
                    EC: -1,
                    DT: "",
                    EM: 'Training data of recommend item is not finished !'
                })
            }
        } else {
            serverErrorMessage();
        }
    } catch (error) {
        console.log(error);
        serverErrorMessage();
    }
}

module.exports = {
    createRecommendProducts, handleExecuteTrainingRecommendProduct,
    getRecommendProducts, handleSimulatingExecuteTrainingRecommendProduct,
    simulatingCreateRecommendProducts, simulatingCreateRecommend3SessionProducts
}