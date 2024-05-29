import recommendProductServices from '../services/recommendProductServices';

const createRecommendProducts = async (req, res) => {
    try {

        let data = JSON.parse(req.body.data);

        let customerID = data.customer_id;
        let list = data.list;

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

module.exports = {
    createRecommendProducts
}