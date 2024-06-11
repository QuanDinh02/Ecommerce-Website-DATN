import sellerServices from '../services/sellerServices';

const getProductPagination = async (req, res) => {
    try {

        let { limit, page } = req.query;
        let { user } = req;

        let result = await sellerServices.getProductPagination(+user.seller_id, +limit, +page);
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

const createNewProduct = async (req, res) => {
    try {

        let { name, summary, quantity, currentPrice, price, sub_category_id} = req.body;
        let { user } = req;

        let data = {
            name: name,
            summary: summary,
            seller_id: +user.seller_id,
            quantity: +quantity,
            currentPrice: +currentPrice,
            price: +price,
            sub_category_id: +sub_category_id,
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                EC: -1,
                DT: "",
                EM: "No file image is uploaded"
            })
        }
        else {
            let result = await sellerServices.createNewProduct(data, req.files.image);
            return res.status(200).json({
                EC: result.EC,
                DT: result.DT,
                EM: result.EM
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

const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await sellerServices.deleteProduct(id);
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

const getCategoryList = async (req, res) => {
    try {
        let result = await sellerServices.getAllCategories();
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

const getSubCategoryList = async (req, res) => {
    try {
        let { category_id } = req.params;

        let result = await sellerServices.getSubCategoriesByCategory(category_id);
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
    getProductPagination, createNewProduct, deleteProduct, getCategoryList, getSubCategoryList
}