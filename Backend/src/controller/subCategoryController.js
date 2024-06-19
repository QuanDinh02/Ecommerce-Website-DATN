import subCategoryServices from '../services/subCategoryServices';

const getSubCategoryByCategory = async (req, res) => {
    try {
        let { id } = req.query
        let result = await subCategoryServices.getSubCategoryByCategory(+id);
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

const getRecommendSubCategory = async (req, res) => {
    try {
        let data = req.body
        let result = await subCategoryServices.getRecommendSubCategory(data);
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

const getSubCategoryInfo = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await subCategoryServices.getSubCategoryInfo(+id);
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
    getSubCategoryByCategory, getSubCategoryInfo, getRecommendSubCategory
}