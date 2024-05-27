import sessionServices from '../services/sessionServices';

const handleSavingSessionActivity = async (req, res) => {
    try {
        let { product_id, type } = req.body;
        let { user } = req;
        
        let session_id = user.session ? user.session.id : null;

        let result = await sessionServices.createSessionActivity(session_id, product_id, type);

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
    handleSavingSessionActivity
}