import wishListServices from '../services/wishListServices';

const getWishListByCustomer = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await wishListServices.getWishListByCustomer(+id);
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

const addWishListItem = async (req, res) => {
    try {
        let { productID, customerID } = req.body;
        let result = await wishListServices.addWishListItem(+productID, +customerID);
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

const deleteWishListItem = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await wishListServices.deleteWishListItem(+id);
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
    getWishListByCustomer, addWishListItem, deleteWishListItem
}