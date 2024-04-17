import apiServices from '../services/apiServices';
import LoginRegisterStaffServices from '../services/LoginRegisterStaffServices';
import LoginRegisterCustomerServices from '../services/LoginRegisterCustomerServices';

const testAPI = async (req, res) => {
    try {
        let result = await apiServices.testAPI();
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

const handleStaffLogin = async (req, res) => {

    try {
        if (!req.body.username || !req.body.password) {
            return res.status(200).json({
                EC: -1,
                DT: '',
                EM: "Missing some parameters !"
            })
        }

        let result = await LoginRegisterStaffServices.userLogin(req.body);
        if (result) {
            if (result.DT && result.DT.accessToken) {
                res.cookie("jwt", result.DT.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 })
            }
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
            EM: "Error from server !"
        })
    }

}

const handleStaffLogout = async (req, res) => {
    try {

        res.clearCookie("jwt");
        return res.status(200).json({
            EC: 0,
            DT: {},
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

const handleFetchAccount = async (req, res) => {
    return res.status(200).json({
        EC: 0,
        DT: req.user,
        EM: 'Valid account !'
    })
}

const handleCustomerLogin = async (req, res) => {

    try {
        if (!req.body.username || !req.body.password) {
            return res.status(200).json({
                EC: -1,
                DT: '',
                EM: "Missing some parameters !"
            })
        }

        let result = await LoginRegisterCustomerServices.customerLogin(req.body);
        if (result) {
            if (result.DT && result.DT.accessToken) {
                res.cookie("jwt", result.DT.accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 })
            }
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
            EM: "Error from server !"
        })
    }

}

const handleCustomerLogout = async (req, res) => {
    try {

        res.clearCookie("jwt");
        return res.status(200).json({
            EC: 0,
            DT: {},
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

module.exports = {
    testAPI, handleStaffLogin,
    handleStaffLogout,
    handleCustomerLogin, handleCustomerLogout, handleFetchAccount
}
