import customerServices from '../services/customerServices';
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

const getCustomerInfoForOrder = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await customerServices.getCustomerInfoForOrder(+id);

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

const sendVertificatedCode = async (req, res) => {
    try {
        let data = req.body;

        OTP = OTPGenerator(OTP_LIMIT);

        await transporter.sendMail({
            from: '"FoxMart "', // sender address
            to: `${data.email}`, // list of receivers
            subject: "FoxMart Ecommerce Verification Code", // Subject line
            html: `
            <p font-size: 16px;">Hi,</p>
            <p font-size: 16px;">Here is the OTP code to verify your account: </p>
            <p><strong style="font-size: 20px">${OTP}</strong></p>
            <p font-size: 16px;">The code will expired in 10 minutes</p>`
        });

        return res.status(200).json({
            EC: 0,
            DT: '',
            EM: `Send vertification code to ${data.email} successfully !`
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

const handleCodeVertification = async (req, res) => {
    try {
        let { otp } = req.body;

        if (otp === OTP) {
            return res.status(200).json({
                EC: 0,
                DT: '',
                EM: `OTP is correct !`
            })
        } else {
            return res.status(400).json({
                EC: -1,
                DT: '',
                EM: `Incorrect OTP !`
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
    getCustomerInfoForOrder, sendVertificatedCode,
    handleCodeVertification
}