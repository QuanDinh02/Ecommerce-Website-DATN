import LoginRegisterService from '../services/LoginRegisterService';
import accountServices from '../services/accountServices';
import dotenv from 'dotenv';
import OTPGenerator from '../utils/OTPGenerator';
import nodemailer from "nodemailer";
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
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

const handleUserLogin = async (req, res) => {
    try {
        let data = req.body;

        let result = await LoginRegisterService.userLogin(data);
        if (result) {
            if (result.DT && result.DT.accessToken) {

                res.cookie("jwt", result.DT.accessToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_ACCESS_TOKEN, sameSite: 'none', secure: true })
                res.cookie("rjwt", result.DT.refreshToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_REFRESH_TOKEN, sameSite: 'none', secure: true })
            }
            return res.status(200).json({
                EC: result.EC,
                DT: "",
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

const handleSystemUserLogin = async (req, res) => {
    try {
        let data = req.body;

        let result = await LoginRegisterService.userSystemLogin(data);
        if (result) {
            if (result.DT && result.DT.accessToken) {
                res.cookie("jwtsys", result.DT.accessToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_ACCESS_TOKEN, sameSite: 'none', secure: true })
                res.cookie("rjwtsys", result.DT.refreshToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_REFRESH_TOKEN, sameSite: 'none', secure: true })
            }
            return res.status(200).json({
                EC: result.EC,
                DT: "",
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

const handleUserRegister = async (req, res) => {
    try {
        let data = req.body;

        let result = await LoginRegisterService.userRegister(data);
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

const handleUserLogout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie("rjwt", { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(200).json({
            EC: 0,
            DT: "",
            EM: 'Đăng xuất thành công !'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            DT: '',
            EM: "Error from server !"
        })
    }
}

const handleSystemUserLogout = async (req, res) => {
    try {
        res.clearCookie("jwtsys", { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie("rjwtsys", { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(200).json({
            EC: 0,
            DT: "",
            EM: 'Đăng xuất thành công !'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            DT: '',
            EM: "Error from server !"
        })
    }
}

const handleFetchUserAccount = async (req, res) => {
    return res.status(200).json({
        EC: 0,
        DT: req.user,
        EM: 'Valid account !'
    })
}

const handleChangeUserPassword = async (req, res) => {
    try {
        let { password, id } = req.body;

        let result = await accountServices.updateUserPassword(password, id);
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

const checkCustomerEmailExist = async (req, res) => {
    try {
        let { email } = req.query;

        let result = await LoginRegisterService.checkCustomerEmailExist(email);
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

const checkEmailWebsiteUserExist = async (req, res) => {
    try {
        let { email } = req.query;

        let result = await LoginRegisterService.checkEmailWebsiteUserExist(email);
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

const checkSellerEmailExist = async (req, res) => {
    try {
        let { email } = req.query;

        let result = await LoginRegisterService.checkSellerEmailExist(email);
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

const sendVertificationCode = async (req, res) => {
    try {
        let data = req.body;

        OTP = OTPGenerator(OTP_LIMIT);

        const filePath = path.join(__dirname, '../templates/user_otp_change_password.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            email: data.email,
            otp: OTP
        };

        const htmlToSend = template(replacements);

        transporter.sendMail({
            from: `FoxMart 🦊 <${process.env.EMAIL_USERNAME}>`, // sender address
            to: `${data.email}`, // list of receivers
            subject: "FoxMart Ecommerce Verification Code", // Subject line
            html: htmlToSend
        });

        let result = await LoginRegisterService.handleCreateVertificationCode({
            code: OTP,
            email: data.email
        });

        if (result && result.EC === 0) {
            return res.status(200).json({
                EC: 0,
                DT: '',
                EM: `Send OTP code successfully !`
            });
        } else {
            return res.status(200).json({
                EC: -1,
                DT: '',
                EM: `Send OTP failed !`
            });
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

        let result = await LoginRegisterService.handleOTPVertification(data);

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

const handleUserChangePassword = async (req, res) => {
    try {
        let data = req.body;

        let result = await LoginRegisterService.userChangePassword(data);

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
    handleUserLogin, handleUserRegister, handleUserLogout, handleFetchUserAccount,
    handleChangeUserPassword, checkCustomerEmailExist, checkSellerEmailExist, handleSystemUserLogin,
    handleSystemUserLogout, checkEmailWebsiteUserExist, sendVertificationCode, handleCodeVertification,
    handleUserChangePassword
}