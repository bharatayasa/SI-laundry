const connection = require('../config/database')
const PDFDocument = require('pdfkit');
const moment = require('moment');

const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = parseFloat(angka);
    }
    return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

module.exports = {
    getAllTransaction: async (req, res) => {
        const sql = "SELECT t.*, (t.berat_transaksi * h.harga_perkilo) AS transaksi_harga FROM transaksi t JOIN harga h ON t.id_harga = h.id_harga WHERE id_transaksi = ?"

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
        const sql = "SELECT t.*, (t.berat_transaksi * h.harga_perkilo) AS transaksi_harga FROM transaksi t JOIN harga h ON t.id_harga = h.id_harga WHERE id_transaksi = ?"

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
    }, 
    generateTransaksiPDF: async (req, res) => {
        const id = req.params.id;
        const sql = "SELECT t.*, (t.berat_transaksi * h.harga_perkilo) AS transaksi_harga FROM transaksi t JOIN harga h ON t.id_harga = h.id_harga WHERE t.id_transaksi = ?";
        const sqlHarga = "SELECT * FROM harga";

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide id_transaksi'
            });
        }

        try {
            const transaksiResult = await new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, results) => {
                    if (error) {
                        console.error("Error fetching transaksi:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            const harga = await new Promise((resolve, reject) => {
                connection.query(sqlHarga, (error, results) => {
                    if (error) {
                        console.error("Error fetching harga:", error);
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (transaksiResult.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No transaksi found with the provided id_transaksi'
                });
            }

            if (harga.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No harga found'
                });
            }

            const transaksi = transaksiResult[0];
            const hargaKiloan = harga[0];

            const doc = new PDFDocument();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=transaksi_${id}.pdf`);

            doc.pipe(res);

            doc.fontSize(20).text(`Invoice`, {
                align: 'center'
            });

            doc.moveDown();

            const table = [
                ['Nama Pelanggan:', transaksi.pelanggan_transaksi],
                ['Tanggal Masuk:', moment(transaksi.tanggal_masuk).format('ddd - MMM - DD - YYYY')],
                ['Tanggal Selesai:', moment(transaksi.tanggal_selesai).format('ddd - MMM - DD - YYYY')],
                [''],
                ['Berat Transaksi (kg):', `${transaksi.berat_transaksi} kg`],
                ['Harga 1 Kilo:', formatRupiah(hargaKiloan.harga_perkilo)],
                ['Total Harga:', formatRupiah(transaksi.transaksi_harga)],
                ['Status:', transaksi.status_transaksi],
                [''],
            ];

            const tableTop = 150;
            const itemMargin = 30;
            let y = tableTop;

            doc.fontSize(12).text(table[0][0], 50, y);
            doc.fontSize(12).text(table[0][1], 300, y);

            y += itemMargin;

            for (let i = 1; i < table.length; i++) {
                doc.fontSize(10).text(table[i][0], 50, y);
                doc.fontSize(10).text(table[i][1], 300, y);
                y += itemMargin;
            }

            doc.end();

        } catch (error) {
            console.error("Error generating PDF:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
