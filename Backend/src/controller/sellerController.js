import sellerServices from '../services/sellerServices';
import OTPGenerator from '../utils/OTPGenerator';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

let OTP;
const OTP_LIMIT = 6;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

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

        let { name, summary, quantity, currentPrice, price, sub_category_id } = req.body;
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

const updateProduct = async (req, res) => {
    try {

        let { id, name, summary, quantity, currentPrice, price, sub_category_id } = req.body;
        let { user } = req;

        let data = {
            id: id,
            name: name,
            summary: summary,
            seller_id: +user.seller_id,
            quantity: +quantity,
            currentPrice: +currentPrice,
            price: +price,
            sub_category_id: +sub_category_id,
        }

        let result = await sellerServices.updateProduct(data);
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

const sendVertificatedCode = async (req, res) => {
    try {
        let data = req.body;

        OTP = OTPGenerator(OTP_LIMIT);

        let email_res = await transporter.sendMail({
            from: '"FoxMart "', // sender address
            to: `${data.email}`, // list of receivers
            subject: "FoxMart Ecommerce Verification Code", // Subject line
            html: `
            <p font-size: 16px;">Hi,</p>
            <p font-size: 16px;">Here is the OTP code to verify your account: </p>
            <p><strong style="font-size: 20px">${OTP}</strong></p>
            <p font-size: 16px;">The code will expired in 10 minutes</p>`
        });

        if (email_res) {
            let result = await sellerServices.handleCreateVertificationCode({
                code: OTP,
                email: data.email
            });

            if (result && result.EC === 0) {
                return res.status(200).json({
                    EC: 0,
                    DT: '',
                    EM: `Send OTP code successfully !`
                });
            }
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

const handleCodeVertification = async (req, res) => {
    try {
        let data = req.body;

        let result = await sellerServices.handleOTPVertification(data);

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
            EC: -1,
            DT: '',
            EM: "error from server !"
        })
    }
}

const getSellerInfo = async (req, res) => {
    try {
        let { user } = req;
        let result = await sellerServices.getSellerInfo(+user.seller_id);

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

const updateSellerInfo = async (req, res) => {
    try {
        let { user } = req;

        let data = {
            ...req.body, id: +user.seller_id
        }

        let result = await sellerServices.updateSellerInfo(data);

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
            EC: -1,
            DT: '',
            EM: "error from server !"
        })
    }
}

module.exports = {
    getProductPagination, createNewProduct, deleteProduct, getCategoryList, getSubCategoryList,
    updateProduct, sendVertificatedCode, handleCodeVertification, getSellerInfo, updateSellerInfo
}