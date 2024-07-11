const { Sequelize } = require('sequelize');
const fs = require("fs");

const sequelize = new Sequelize('ecommerce', 'avnadmin', 'AVNS_SQHY8Ivz7J5kp9ElUF2', {
    host: 'mysql-ecommerce-nhut0789541410-f8ba.e.aivencloud.com',
    dialect: 'mysql',
    port: 27163,
    logging: false,
    define: {
        freezeTableName: true
    },
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(__dirname + '/ca.pem')
        }
    }
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connection;