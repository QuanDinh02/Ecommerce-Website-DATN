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

const getOrderStatus = async (req, res) => {
    try {

        let { limit, page, status, startDate, endDate } = req.query;
        let { user } = req;

        let result = await shippingUnitServices.getOrderStatus(+user.shipping_unit_id, +limit, +page, +status, startDate, endDate);
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

const getOrderSearch = async (req, res) => {
    try {
        let { user } = req;
        let { id } = req.query;
        let result = await shippingUnitServices.getOrderSearch(+user.shipping_unit_id, +id);

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

const getOrderDetail = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await shippingUnitServices.getOrderDetail(+id);

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
            EC: -2,
            DT: '',
            EM: "error from server !"
        })
    }
}

const confirmReceiveOrderSeller = async (req, res) => {
    try {
        let { id, order_status } = req.body;
        let result = await shippingUnitServices.confirmReceiveOrderSeller(+id, +order_status);

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
            EC: -2,
            DT: '',
            EM: "error from server !"
        })
    }
}

const handleShippingOrder = async (req, res) => {
    try {
        let { id } = req.body;
        let result = await shippingUnitServices.handleShippingOrder(+id);

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
            EC: -2,
            DT: '',
            EM: "error from server !"
        })
    }
}

const handleConfirmCompleteShippingOrder = async (req, res) => {
    try {
        let { id } = req.body;
        let result = await shippingUnitServices.handleConfirmCompleteShippingOrder(+id);

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
            EC: -2,
            DT: '',
            EM: "error from server !"
        })
    }
}

module.exports = {
    getShippingUnitList, getOrderStatus, getOrderDetail, 
    confirmReceiveOrderSeller, handleShippingOrder, handleConfirmCompleteShippingOrder,
    getOrderSearch
}