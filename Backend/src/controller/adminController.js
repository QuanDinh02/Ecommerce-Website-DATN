import adminServices from '../services/adminServices';

const getAnalysisProduct = async (req, res) => {
    try {

        let { limit, page, category_id, sub_category_id, sort_id } = req.query;

        let result = await adminServices.getAnalysisProduct(+limit, +page, +category_id, +sub_category_id, +sort_id);
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

const getAnalysisProductSearch = async (req, res) => {
    try {

        let { id } = req.query;

        let result = await adminServices.getAnalysisProductSearch(id);
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

const getDashboardData = async (req, res) => {
    try {

        let result = await adminServices.getDashboardData();
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

const getCustomerData = async (req, res) => {
    try {

        let { limit, page } = req.query;

        let result = await adminServices.getCustomerData(+limit, +page);
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

const getCustomerSearch = async (req, res) => {
    try {

        let { search } = req.query;

        let result = await adminServices.getCustomerSearch(search);
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

const updateAccountStatus = async (req, res) => {
    try {
        let { user } = req;
        let data = req.body;

        if (user.role === "admin") {
            let result = await adminServices.updateAccountStatus(data);
            return res.status(200).json({
                EC: result.EC,
                DT: result.DT,
                EM: result.EM
            });
        } else {
            return res.status(401).json({
                EC: -1,
                DT: "",
                EM: "Bạn không có quyền thao tác"
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

const getCustomerInfoDetail = async (req, res) => {
    try {
        let { user } = req;
        let { customer_id } = req.query;

        if (user.role === "admin") {
            let result = await adminServices.getCustomerInfoDetail(+customer_id);
            return res.status(200).json({
                EC: result.EC,
                DT: result.DT,
                EM: result.EM
            });
        } else {
            return res.status(401).json({
                EC: -1,
                DT: "",
                EM: "Bạn không có quyền thao tác"
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

const getSellerData = async (req, res) => {
    try {

        let { limit, page } = req.query;

        let result = await adminServices.getSellerData(+limit, +page);
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

const getSellerSearch = async (req, res) => {
    try {

        let { search } = req.query;

        let result = await adminServices.getSellerSearch(search);
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

const getSellerInfoDetail = async (req, res) => {
    try {
        let { user } = req;
        let { seller_id } = req.query;

        if (user.role === "admin") {
            let result = await adminServices.getSellerInfoDetail(+seller_id);
            return res.status(200).json({
                EC: result.EC,
                DT: result.DT,
                EM: result.EM
            });
        } else {
            return res.status(401).json({
                EC: -1,
                DT: "",
                EM: "Bạn không có quyền thao tác"
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

const getShippingUnitData = async (req, res) => {
    try {

        let { limit, page } = req.query;

        let result = await adminServices.getShippingUnitData(+limit, +page);
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

const getShippingUnitSearch = async (req, res) => {
    try {

        let { search } = req.query;

        let result = await adminServices.getShippingUnitSearch(search);
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

const createShippingUnit = async (req, res) => {
    try {

        let data = req.body;

        let result = await adminServices.createShippingUnit(data);
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

const updateShippingUnit = async (req, res) => {
    try {

        let data = req.body;

        let result = await adminServices.updateShippingUnit(data);
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

const updateShippingUnitPassword = async (req, res) => {
    try {

        let data = req.body;

        let result = await adminServices.updateShippingUnitPassword(data);
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
    getAnalysisProduct, getAnalysisProductSearch, getDashboardData,
    getCustomerData, getCustomerSearch, getSellerData, getSellerSearch,
    getShippingUnitData, getShippingUnitSearch, createShippingUnit,
    updateShippingUnit, updateShippingUnitPassword, updateAccountStatus,
    getCustomerInfoDetail, getSellerInfoDetail
}