const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config(); 

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});
function connectDatabase() {
    connection.connect((err) => {
        if (err) {
        console.error('Error connecting to database:', err);
        setTimeout(connectDatabase, 2000);
        } else {
        console.log('Connected to database');
        }
    });

    connection.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
        connectDatabase(); 
        } else {
        throw err;
        }
    });
}

connectDatabase();
module.exports = connection; 