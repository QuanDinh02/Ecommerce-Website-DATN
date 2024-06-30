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

module.exports = {
    getAnalysisProduct, getAnalysisProductSearch, getDashboardData
}