import searchServices from '../services/searchServices';

const customerSearchRecord = async (req, res) => {
    try {
        let { content } = req.body;
        let { user } = req;

        let session_id = user.session ? user.session.id : null;

        let result = await searchServices.customerSearchRecord(session_id, content);
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
    customerSearchRecord
}