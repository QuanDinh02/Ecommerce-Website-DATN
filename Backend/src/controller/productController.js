import productServices from '../services/productServices';
import sellerServices from '../services/sellerServices';
import productTrackingService from '../services/productTrackingServices';

const getProductDetail = async (req, res) => {
    try {

        let { id } = req.query;

        productTrackingService.updateProductView(id);

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

const getProductDetailShopInfo = async (req, res) => {
    try {

        let { id } = req.query;

        let result = await productServices.getProductDetailShopInfo(+id);
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

const getHistoryProductsSwiper = async (req, res) => {
    try {

        let data = req.body;
        let result = await productServices.getProductsHistorySwiper(data);
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

const getProductsHistory = async (req, res) => {
    try {

        let { limit, page, data } = req.body;
        let result = await productServices.getProductsHistory(+limit, +page, data);
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

        let { id, limit, page, rating } = req.query;

        let result = await productServices.getProductsByCategory(+id, +limit, +page, +rating);
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

const getProductsByShopCategory = async (req, res) => {
    try {

        let { category_id, shop_id, limit, page } = req.query;

        let result = await productServices.getProductsByShopCategory(+category_id, +shop_id, +limit, +page);
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

const getShopCategories = async (req, res) => {
    try {

        let { shop_id } = req.query;

        let result = await sellerServices.getShopCategory(+shop_id);

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

const getShopInfo = async (req, res) => {
    try {

        let { id } = req.query;

        let result = await productServices.getShopInfo(+id);
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

        let { id, limit, page, rating } = req.query;

        let result = await productServices.getProductsBySubCategory(+id, +limit, +page, +rating);
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

        let { content, limit, page, rating } = req.query;

        let result = await productServices.getSearchProductsWithPagination(content, +limit, +page, +rating);

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

const updateProductRecommendClick = (req, res) => {
    try {
        let { id } = req.body;

        productTrackingService.updateProductRecommendClick(+id);

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
    getProductDetail, getProductReviews, handleGetSearchProductsWithPagination,
    getProductsHistory, getHistoryProductsSwiper, getProductDetailShopInfo,
    getProductsByShopCategory, getShopCategories, getShopInfo, updateProductRecommendClick
}