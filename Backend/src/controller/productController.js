import productServices from '../services/productServices';

const getProductDetail = async (req, res) => {
    try {

        let { id } = req.query;

        let result = await productServices.getProductDetail(+id);
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

const handleGetProductsImage = async (req, res) => {
    try {

        let data = req.body;

        let result = await productServices.getProductsImage(data);
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

const handleUpdateProductImage = async (req, res) => {
    try {
        if (req.file) {
            const encoded = req.file.buffer.toString('base64')

            let data = {
                ...req.body, image: encoded
            }

            let result = await productServices.putUpdateProductImage(data);

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

const handleGetSearchProducts = async (req, res) => {
    try {
        let { name } = req.query;

        let result = await productServices.getSearchProducts(name);

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

const handleGetSearchProductsWithPagination = async (req, res) => {
    try {

        let { content, limit, page } = req.query;

        let result = await productServices.getSearchProductsWithPagination(content, +limit, +page);

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

const getProductReviews = async (req, res) => {
    try {

        let { id, limit, page } = req.query;

        let result = await productServices.getProductReviews(+id, +limit, +page);
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
    getProductsByCategory, getProductsBySubCategory,
    handleUpdateProductImage, handleGetSearchProducts,
    getProductDetail, getProductReviews, handleGetProductsImage, handleGetSearchProductsWithPagination
}