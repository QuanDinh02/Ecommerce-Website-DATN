import orderServices from '../services/orderServices';

const createNewOrder = async (req, res) => {
    try {
        let data = req.body;
        let { user } = req;

        let session_id = user.session ? user.session.id : null;

        let result = await orderServices.addNewOrder(data, session_id);
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

const getOrderByCustomer = async (req, res) => {
    try {
        let { id, status } = req.query;

        let result = await orderServices.getOrderByCustomer(+id, +status);

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

const getOrderSearchByCustomer = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await orderServices.getOrderSearchByCustomer(id);

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

const getCustomerOrderDetail = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await orderServices.getCustomerOrderDetail(id);

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

const getOrderItemInfoForRating = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await orderServices.getOrderItemInfoForRating(id);

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

const customerRatingProduct = async (req, res) => {
    try {
        let { user } = req;
        let data = req.body;

        let result = await orderServices.customerRatingProduct(data, +user.customer_id);

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

const getShippingMethod = async (req, res) => {
    try {
        let result = await orderServices.getShippingMethod();

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

const getPaymentMethod = async (req, res) => {
    try {
        let result = await orderServices.getPaymentMethod();

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

const cancelOrderByCustomer = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await orderServices.cancelOrderByCustomer(id);

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
    createNewOrder, getOrderByCustomer, getShippingMethod, getPaymentMethod,
    getCustomerOrderDetail, getOrderSearchByCustomer, cancelOrderByCustomer,
    getOrderItemInfoForRating, customerRatingProduct
}