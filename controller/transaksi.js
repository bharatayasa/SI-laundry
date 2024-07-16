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
    getAllTransaksi: async (req, res) => {
        const sql = `
                    SELECT 
                        t.*, 
                        p.nama_pelanggan,
                        (t.berat_transaksi * h.harga_perkilo) AS transaksi_harga 
                    FROM transaksi t
                    JOIN harga h ON t.id_harga = h.id_harga
                    JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
                `;

        try {
            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            const data = transaksi.map(t => ({
                id_transaksi: t.id_transaksi,
                id_pakaian : t.id_pakaian,
                nama_pelanggan: t.nama_pelanggan,
                tanggal_masuk: moment(t.tanggal_masuk).format('DD MMMM YYYY'),
                berat_transaksi: t.berat_transaksi,
                tanggal_selesai: moment(t.tanggal_selesai).format('DD MMMM YYYY'),
                status_transaksi: t.status_transaksi,
                transaksi_harga: formatRupiah(t.transaksi_harga)
            }));

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
                data: data
            });
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    getTransaksiById: async (req, res) => {
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

            const transaksiData = transaksi[0]; 

            return res.status(200).json({
                success: true,
                message: "Success to get data",
                data: transaksiData
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
        const { id_harga = 1, id_pakaian, id_pelanggan, tanggal_masuk, berat_transaksi, tanggal_selesai, status_transaksi } = req.body;
        
        const harga = id_harga;
    
        if (!id_pakaian || !id_pelanggan || !tanggal_masuk || !berat_transaksi || !tanggal_selesai || !status_transaksi) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }
    
        try {
            const hargaQuery = "SELECT harga_perkilo FROM harga WHERE id_harga = ?";
            const hargaResult = await new Promise((resolve, reject) => {
                connection.query(hargaQuery, [harga], (error, results) => {
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
    
            const sql = `INSERT INTO transaksi (id_harga, id_pakaian, id_pelanggan, tanggal_masuk, harga_transaksi, berat_transaksi, tanggal_selesai, status_transaksi, transaksi_harga) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, [harga, id_pakaian, id_pelanggan, tanggal_masuk, transaksi_harga, berat_transaksi, tanggal_selesai, status_transaksi, transaksi_harga], (error, result) => {
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
                    id_pakaian,
                    id_pelanggan,
                    tanggal_masuk,
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
        const { id_transaksi, id_harga, id_pakaian, id_pelanggan, tanggal_masuk, berat_transaksi, tanggal_selesai, status_transaksi } = req.body;

        if (!id_transaksi || !id_harga || !id_pakaian || !id_pelanggan || !tanggal_masuk || !berat_transaksi || !tanggal_selesai || !status_transaksi) {
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
                        SET id_harga = ?, id_pakaian = ?, id_pelanggan = ?, tanggal_masuk = ?, berat_transaksi = ?, tanggal_selesai = ?, status_transaksi = ?, transaksi_harga = ? WHERE id_transaksi = ?`;

            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, [id_harga, id_pakaian, id_pelanggan, tanggal_masuk, berat_transaksi, tanggal_selesai, status_transaksi, transaksi_harga, id], (error, result) => {
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

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide id_transaksi'
            });
        }

        const sql = `
            SELECT 
                t.*, 
                h.harga_perkilo, 
                p.nama_pelanggan, 
                (t.berat_transaksi * h.harga_perkilo) AS transaksi_harga 
            FROM 
                transaksi t 
            JOIN 
                harga h ON t.id_harga = h.id_harga 
            JOIN 
                pelanggan p ON t.id_pelanggan = p.id_pelanggan 
            WHERE 
                t.id_transaksi = ?
        `;

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

            if (transaksiResult.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No transaksi found with the provided id_transaksi'
                });
            }

            const transaksi = transaksiResult[0];

            const doc = new PDFDocument({ margin: 50 });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=invoice_${id}_${transaksi.nama_pelanggan}_${moment(transaksi.tanggal_selesai).format('YYYYMMDD')}.pdf`);

            doc.pipe(res);

            doc.fontSize(20).text('Laundry Service Invoice', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text('Laundry Service Company', { align: 'center' });
            doc.text('Jl. Example No.123, Kota Example', { align: 'center' });
            doc.text('Phone: (021) 12345678', { align: 'center' });
            doc.moveDown();

            doc.fontSize(12).text(`Invoice ID: ${id}`, { align: 'left' });
            doc.text(`Nama Pelanggan: ${transaksi.nama_pelanggan}`, { align: 'left' });
            doc.text(`Tanggal Masuk: ${moment(transaksi.tanggal_masuk).format('DD MMMM YYYY')}`, { align: 'left' });
            doc.text(`Tanggal Selesai: ${moment(transaksi.tanggal_selesai).format('DD MMMM YYYY')}`, { align: 'left' });
            doc.moveDown();

            doc.fontSize(12).text('Rincian Transaksi:', { align: 'left' });
            doc.moveDown();

            const tableTop = 250;
            const itemMargin = 20;
            let y = tableTop;

            const table = [
                ['Deskripsi', 'Detail'],
                ['Harga 1 kg:', formatRupiah(transaksi.harga_perkilo)],
                ['Berat Transaksi (kg):', `${transaksi.berat_transaksi} kg`],
                ['Total Harga:', formatRupiah(transaksi.transaksi_harga)],
                ['Status:', transaksi.status_transaksi],
            ];

            doc.fontSize(10).text(table[0][0], 50, y);
            doc.text(table[0][1], 300, y);

            y += itemMargin;

            for (let i = 1; i < table.length; i++) {
                doc.fontSize(10).text(table[i][0], 50, y);
                doc.text(table[i][1], 300, y);
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
