const testAPI = async (req, res) => {
    try {
        res.send('TEST API ECOMMERCE');
    } catch (error) {
        console.log(error);
        res.send('ERROR WITH TEST API ECOMMERCE !');
    }
}

module.exports = {
    testAPI
}
