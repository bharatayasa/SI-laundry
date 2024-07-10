const connection = require('../config/database')

module.exports = {
    getAllTransaction: async (req, res) => {
        const sql = `
            SELECT t.*, (t.berat_transaksi * h.harga_perkilo) AS transaksi_harga FROM transaksi t JOIN harga h ON t.id_harga = h.id_harga`;

        try {
            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            if (transaksi.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Data not found",
                    data: transaksi
                });
            }

            return res.status(200).json({
                success: true,
                message: "Success to get data",
                data: transaksi
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    getAllTransactionById: async (req, res) => {
        const id = req.params.id
        const sql = "SELECT * FROM transaksi WHERE id_transaksi = ?"

        try {
            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            if (transaksi.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: "data not found",
                    data: transaksi
                })
            }

            return res.status(200).json({
                success: true,
                message: "Success to get data",
                data: transaksi
            })
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }, 
    addTransaksi: async (req, res) => {
        const { id_harga, id_pakaian, id_pelanggan, tanggal_masuk, pelanggan_transaksi, berat_transaksi, tanggal_selesai, status_transaksi } = req.body;

        if (!id_harga || !id_pakaian || !id_pelanggan || !tanggal_masuk || !pelanggan_transaksi || !berat_transaksi || !tanggal_selesai || !status_transaksi) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        try {
            const hargaQuery = "SELECT harga_perkilo FROM harga WHERE id_harga = ?";
            const hargaResult = await new Promise((resolve, reject) => {
                connection.query(hargaQuery, [id_harga], (error, results) => {
                    if (error) {
                        console.error("Error fetching harga:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (hargaResult.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No harga found with the provided id_harga'
                });
            }

            const harga_perkilo = hargaResult[0].harga_perkilo;
            const transaksi_harga = berat_transaksi * harga_perkilo;

            const sql = `INSERT INTO transaksi (id_harga, id_pakaian, id_pelanggan, tanggal_masuk, pelanggan_transaksi, harga_transaksi, berat_transaksi, tanggal_selesai, status_transaksi, transaksi_harga) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, [id_harga, id_pakaian, id_pelanggan, tanggal_masuk, pelanggan_transaksi, transaksi_harga, berat_transaksi, tanggal_selesai, status_transaksi, transaksi_harga], (error, result) => {
                    if (error) {
                        console.error("Error inserting transaksi:", error);
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(201).json({
                success: true,
                message: 'Transaksi added successfully',
                data: {
                    id_transaksi: transaksi.insertId,
                    id_harga,
                    id_pakaian,
                    id_pelanggan,
                    tanggal_masuk,
                    pelanggan_transaksi,
                    berat_transaksi,
                    tanggal_selesai,
                    status_transaksi,
                    transaksi_harga
                }
            });
        } catch (error) {
            console.error("Error adding transaksi:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }, 
    updateTransaksi: async (req, res) => {
        const id = req.params.id
        const { id_transaksi, id_harga, id_pakaian, id_pelanggan, tanggal_masuk, pelanggan_transaksi, berat_transaksi, tanggal_selesai, status_transaksi } = req.body;

        if (!id_transaksi || !id_harga || !id_pakaian || !id_pelanggan || !tanggal_masuk || !pelanggan_transaksi || !berat_transaksi || !tanggal_selesai || !status_transaksi) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        try {
            const hargaQuery = "SELECT harga_perkilo FROM harga WHERE id_harga = ?";
            const hargaResult = await new Promise((resolve, reject) => {
                connection.query(hargaQuery, [id_harga], (error, results) => {
                    if (error) {
                        console.error("Error fetching harga:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (hargaResult.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No harga found with the provided id_harga'
                });
            }

            const harga_perkilo = hargaResult[0].harga_perkilo;
            const transaksi_harga = berat_transaksi * harga_perkilo;

            const sql = `UPDATE transaksi 
                        SET id_harga = ?, id_pakaian = ?, id_pelanggan = ?, tanggal_masuk = ?, pelanggan_transaksi = ?, berat_transaksi = ?, tanggal_selesai = ?, status_transaksi = ?, transaksi_harga = ? WHERE id_transaksi = ?`;

            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, [id_harga, id_pakaian, id_pelanggan, tanggal_masuk, pelanggan_transaksi, berat_transaksi, tanggal_selesai, status_transaksi, transaksi_harga, id], (error, result) => {
                    if (error) {
                        console.error("Error updating transaksi:", error);
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            if (transaksi.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No transaksi found with the provided id_transaksi'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Transaksi updated successfully',
                data: {
                    id_transaksi,
                    id_harga,
                    id_pakaian,
                    id_pelanggan,
                    tanggal_masuk,
                    pelanggan_transaksi,
                    berat_transaksi,
                    tanggal_selesai,
                    status_transaksi,
                    transaksi_harga
                }
            });
        } catch (error) {
            console.error("Error updating transaksi:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }, 
    deleteTransaksi: async (req, res) => {
        const id = req.params.id; 
        const sql = "DELETE FROM transaksi WHERE id_transaksi = ?"; 
        
        try {
            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result); 
                })
            })

            return res.status(200).json({
                status: true,
                message: "transaction deleted", 
                data: transaksi
            })
        } catch (error) {
            console.error("Error updating transaksi:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
