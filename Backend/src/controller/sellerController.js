import sellerServices from '../services/sellerServices';

const getProductPagination = async (req, res) => {
    try {

        let {limit, page } = req.query;
        let { user } = req;

        let result = await sellerServices.getProductPagination(+user.seller_id, +limit, +page);
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
    getProductPagination
}