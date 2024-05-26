import customerServices from '../services/customerServices';

const getCustomerInfoForOrder = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await customerServices.getCustomerInfoForOrder(+id);

        if (result) {
            return res.status(200).json({
                EC: result.EC,
                DT: result.DT,
                EM: result.EM
            })
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


module.exports = {
    getCustomerInfoForOrder
}