import shippingUnitServices from '../services/shippingUnitServices';

const getShippingUnitList = async (req, res) => {
    try {
        let result = await shippingUnitServices.getShippingUnitList();
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
    getShippingUnitList
}