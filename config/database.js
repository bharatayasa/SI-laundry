const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    connectTimeout  : 10000
});

connection.connect((error) => {
    if (error) {
        console.log("failed connecting to database mysql");
        console.log(error);
    } else {
        console.log("connected to database mysql");
    }
});

module.exports = connection;
