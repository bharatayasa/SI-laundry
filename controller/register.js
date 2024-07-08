const bcrypt = require('bcrypt');
const connection = require('../config/database');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        try {
            const checkUserSql = "SELECT * FROM admin WHERE username = ?";
            const existingUser = await new Promise((resolve, reject) => {
                connection.query(checkUserSql, [username], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (existingUser.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already exists'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
            
            connection.query(sql, [username, hashedPassword], (error, result) => {
                if (error) {
                    console.error("Error registering user:", error);
                    return res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'User registered successfully'
                });
            });
        } catch (error) {
            console.error("Error hashing password:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};
