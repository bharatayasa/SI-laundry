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
    }, 
    getPakaianById: async (req, res) => {
        const id = req.params.id; 
        const sql = "SELECT * FROM pakaian WHERE id_pakaian = ?"; 

        try {
            const pakaian = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error); 
                    }
                    resolve(result); 
                })
            })

            return res.status(200).json({
                status: true,
                message: "sucess to get data by id", 
                data: pakaian
            })
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }, 
    addPakaian: async (req, res) => {
        const { transaksi_pakaian, jenis_pakaian, jumlah_pakaian } = req.body;

        if (!transaksi_pakaian || !jenis_pakaian || !jumlah_pakaian) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const sql = "INSERT INTO pakaian (transaksi_pakaian, jenis_pakaian, jumlah_pakaian) VALUES (?, ?, ?)";

        try {
            const pakaian = await new Promise((resolve, reject) => {
                connection.query(sql, [transaksi_pakaian, jenis_pakaian, jumlah_pakaian], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                success: true,
                message: "Successfully added pakaian data",
                data: pakaian
            });
        } catch (error) {
            console.error("Error adding pakaian:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }, 
    updatePakaian: async (req, res) => {
        const id = req.params.id
        const { transaksi_pakaian, jenis_pakaian, jumlah_pakaian } = req.body;

        if (!transaksi_pakaian || !jenis_pakaian || !jumlah_pakaian) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const sql = "UPDATE pakaian SET transaksi_pakaian = ?, jenis_pakaian = ?, jumlah_pakaian = ? WHERE id_pakaian = ?";

        try {
            const pakaian = await new Promise((resolve, reject) => {
                connection.query(sql, [transaksi_pakaian, jenis_pakaian, jumlah_pakaian, id], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            if (pakaian.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Pakaian not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successfully updated pakaian data",
                data: pakaian
            });
        } catch (error) {
            console.error("Error updating pakaian:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }, 
    deletePakaian: async (req, res) => {
        const id = req.params.id;

        const sql = "DELETE FROM pakaian WHERE id_pakaian = ?";

        try {
            const pakaian = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            if (pakaian.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Pakaian not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successfully deleted pakaian data",
                data: pakaian
            });
        } catch (error) {
            console.error("Error deleting pakaian:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}