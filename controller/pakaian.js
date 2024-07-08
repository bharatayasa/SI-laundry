const connection = require('../config/database')

module.exports = {
    getAllPakaian: async (req, res) => {
        const sql = "SELECT * FROM pakaian"
        
        try {
            const pakaian = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })
            
            if (pakaian.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'harga not found'
                });
            }
            
            return res.status(202).json({
                success: true,
                message: "Success to get data",
                data: pakaian
            })
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}