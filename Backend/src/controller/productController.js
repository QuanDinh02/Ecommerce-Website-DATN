import productServices from '../services/productServices';

const getProductsByCategory = async (req, res) => {
    try {

        let { id, limit, page } = req.query;

        let result = await productServices.getProductsByCategory(+id, +limit, +page);
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

const getProductsBySubCategory = async (req, res) => {
    try {

        let { id, limit, page } = req.query;

        let result = await productServices.getProductsBySubCategory(+id, +limit, +page);
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
    getProductsByCategory, getProductsBySubCategory
}