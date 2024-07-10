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
    }, 
    inputPelanggan: async (req, res) => {
        const { nama_pelanggan, tlp_pelanggan, alamat_pelanggan } = req.body; 
        const sql = "INSERT INTO pelanggan (nama_pelanggan, tlp_pelanggan, alamat_pelanggan) VALUES (?, ?, ?)"

        try {
            const pelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, [nama_pelanggan, tlp_pelanggan, alamat_pelanggan], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "success to add data pelanggan", 
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
    updatePelanggan: async (req, res) => {
        const id = req.params.id; 
        const { nama_pelanggan, tlp_pelanggan, alamat_pelanggan } = req.body; 
        const sql = "UPDATE pelanggan SET nama_pelanggan = ?, tlp_pelanggan = ?, alamat_pelanggan = ? WHERE id_pelanggan = ?"

        try {
            const pelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, [nama_pelanggan, tlp_pelanggan, alamat_pelanggan, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "sucess to update data", 
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
    deletePelanggan: async (req, res) => {
        const id = req.params.id; 
        const sql = "DELETE FROM pelanggan WHERE id_pelanggan = ?";

        try {
            const pelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                status: true,
                message: "sucess to delete data",
                data: pelanggan
            });
        } catch (error) {
            console.error("Error fetching pelanggan:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}