import LoginRegisterService from '../services/LoginRegisterService';

const handleUserLogin = async (req, res) => {
    try {
        let data = req.body;

        let result = await LoginRegisterService.userLogin(data);
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

module.exports = {
    handleUserLogin, handleUserRegister
}