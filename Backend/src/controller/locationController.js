import locationServices from '../services/locationServices';

const getAllProvinces = async (req, res) => {
    try {
        let result = await locationServices.getAllProvinces();

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

const getDistrictsByProvince = async (req, res) => {
    try {
        let { province_code } = req.params;
        let result = await locationServices.getDistrictsByProvince(province_code);

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

const getWardsByDistrict = async (req, res) => {
    try {
        let { district_code } = req.params;
        let result = await locationServices.getWardsByDistrict(district_code);

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
    getAllProvinces, getDistrictsByProvince, getWardsByDistrict
}