const testAPI = async () => {
    try {
        return {
            EC: 0,
            DT: [],
            EM: 'Success connection !'
        }
    } catch (error) {
        console.log(error);
        return {
            EC: -2,
            DT: [],
            EM: 'Something is wrong on services !', 
        }
    }
}

exports = { testAPI }