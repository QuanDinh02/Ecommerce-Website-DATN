import cartItemServices from '../services/cartItemServices';

const getQuickCartItems = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await cartItemServices.getQuickCartItemsByCustomer(+id);
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
    getQuickCartItems
}