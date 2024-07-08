const connection = require('../config/database')

module.exports = {
    getAllPelanggan: async (req, res) => {
        const sql = "SELECT * FROM pelanggan"
        
        try {
            const pelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })
            
            if (pelanggan.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'pelanggan not found'
                });
            }
            
            return res.status(200).json({
                success: true,
                message: "Success to get data",
                data: pelanggan
            })
        } catch (error) {
            console.error("Error fetching pelanggan:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}