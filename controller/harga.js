const connection = require('../config/database')

module.exports = {
    getAllHarga: async(req, res) => { 
        const sql = "SELECT * FROM harga"

        try {
            const harga = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            if (harga.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'harga not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: "Success to get data",
                data: harga
            })
        } catch (error) {
            console.error("Error hashing password:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }, 
    editHarga: async (req, res) => {
        const id = req.params.id;
        const { harga_perkilo } = req.body;
        const sql = "UPDATE harga SET harga_perkilo = ? WHERE id_harga = ?";
        
        try {
            const harga = await new Promise((resolve, reject) => {
                connection.query(sql, [harga_perkilo, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            return res.status(201).json({
                success: true,
                message: "Success to edit data",
                data: harga
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