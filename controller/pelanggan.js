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
    }, 
    getPelangganById: async (req, res) => {
        const id = req.params.id; 
        const sql = "SELECT * FROM pelanggan WHERE id_pelanggan = ?"
        
        try {
            const pelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            if (pelanggan.length == 0) {
                return res.status(404).json({
                    status: false, 
                    message: "data not found", 
                    data: pelanggan
                })
            }

            return res.status(200).json({
                status: true, 
                message: "succes to get data pelanggan by id", 
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