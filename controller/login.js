const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/database');
const dotenv = require('dotenv')
dotenv.config();

const jwtSecret = process.env.JWT_SECRET

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        try {
            const sql = "SELECT * FROM admin WHERE username = ?";
            connection.query(sql, [username], async (error, results) => {
                if (error) {
                    console.error("Error fetching user:", error);
                    return res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    });
                }

                if (results.length === 0) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid username or password'
                    });
                }

                const user = results[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid username or password'
                    });
                }

                const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    token
                });
            });
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
