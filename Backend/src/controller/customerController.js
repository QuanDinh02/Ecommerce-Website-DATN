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

const getCustomerInfo = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await customerServices.getCustomerInfo(+id);

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

const getAllCustomerAddress = async (req, res) => {
    try {
        let { user } = req;
        let result = await customerServices.getCustomerAddresses(+user.customer_id);

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

const createNewCustomerAddress = async (req, res) => {
    try {
        let { user } = req;
        let data = req.body;

        let new_data = {
            ...data,
            customerID: +user.customer_id
        }

        let result = await customerServices.createNewCustomerAddress(new_data);

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

const updateCustomerAddress = async (req, res) => {
    try {
        let data = req.body;

        let new_data = {
            ...data
        }

        let result = await customerServices.updateCustomerAddress(new_data);

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

const deleteCustomerAddress = async (req, res) => {
    try {
        let { id } = req.params;

        let result = await customerServices.deleteCustomerAddress(+id);

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

const updateCustomerDefaultAddress = async (req, res) => {
    try {
        let { user } = req;
        let { id } = req.body;

        let result = await customerServices.updateCustomerDefaultAddress(+id, +user.customer_id);

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

const updateCustomerInfo = async (req, res) => {
    try {
        let data = req.body;
        let result = await customerServices.updateCustomerInfo(data);

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

const changeCustomerPassword = async (req, res) => {
    try {
        let { old_password, new_password } = req.body;
        let { user } = req;

        let data = {
            id: user.customer_id,
            old: old_password,
            new: new_password
        }

        let result = await customerServices.changeCustomerPassword(data);

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
            let result = await customerServices.handleCreateVertificationCode({
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

        let result = await customerServices.handleOTPVertification(data);

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

const handleCheckNewCustomer = async (req, res) => {
    try {
        let { id } = req.query;
        let result = await customerServices.handleCheckNewUser(+id);

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

const handleRemoveCheckNewCustomer = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await customerServices.removeNewCustomer(+id);

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

const trainingNewCustomer = async (req, res) => {
    try {
        let { data, customer_id } = req.body;
        let { user } = req;

        let session_id = user.session ? user.session.id : null;

        let result = await customerServices.trainingNewCustomer(session_id, data, customer_id);
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
    sendVertificatedCode,
    handleCodeVertification, getCustomerInfo, updateCustomerInfo,
    changeCustomerPassword, getAllCustomerAddress, updateCustomerDefaultAddress,
    createNewCustomerAddress, deleteCustomerAddress, updateCustomerAddress,
    handleCheckNewCustomer, handleRemoveCheckNewCustomer, trainingNewCustomer
}