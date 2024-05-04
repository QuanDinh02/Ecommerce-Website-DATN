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

const addCartItem = async (req, res) => {
    try {
        let { quantity, customerID, productTypeID } = req.body;
        let result = await cartItemServices.addCustomerCartItem(quantity, customerID, productTypeID);
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

const updateCartItem = async (req, res) => {
    try {
        let { id, quantity } = req.body;
        let result = await cartItemServices.updateCustomerCartItem(id, quantity);
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

const deleteCartItem = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await cartItemServices.deleteCustomerCartItem(id);
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
    getQuickCartItems, addCartItem, updateCartItem, deleteCartItem
}