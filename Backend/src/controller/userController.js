import LoginRegisterService from '../services/LoginRegisterService';

const handleUserLogin = async (req, res) => {
    try {
        let data = req.body;

        let result = await LoginRegisterService.userLogin(data);
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
        res.clearCookie("jwt");
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

module.exports = {
    handleUserLogin, handleUserRegister, handleUserLogout, handleFetchUserAccount
}