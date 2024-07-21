const connection = require('../config/database')
// const moment = require('moment');
const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = parseFloat(angka);
    }
    return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

module.exports = {
    getTotalPelanggan: async (req, res) => {
        const sql = "SELECT COUNT(*) as total FROM pelanggan";

        try {
            const totalPelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "success to get total pelanggan", 
                data: totalPelanggan
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error
            })
        }
    }, 
    getTotalPakaian: async (req, res) => {
        const sql = "SELECT COUNT(*) as total FROM pakaian";
        
        try {
            const totalPelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                message: "success to get total pakaian",
                data: totalPelanggan
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error
            })
        }
    },
    getTotalTransaksi: async (req, res) => {
        const sql = "SELECT COUNT(*) as total FROM transaksi";

        try {
            const totalPelanggan = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                message: "success to get total transaksi",
                data: totalPelanggan
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error
            })
        }
    },
    getTotalHargaTransaksi: async (req, res) => {
        const sql = "SELECT SUM(harga_transaksi) as totalHarga FROM transaksi";

        try {
            const totalHargaTransaksi = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            const data = formatRupiah(totalHargaTransaksi[0].totalHarga)

            return res.status(200).json({
                message: "success to get sum transaksi",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                error: error
            });
        }
    }, 
    getStatusCount: async (req, res) => {
        const sql = `
            SELECT 
                status_transaksi, 
                COUNT(*) as count 
            FROM transaksi 
            GROUP BY status_transaksi
        `;

        try {
            const statusCount = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            return res.status(200).json({
                message: "success to get status count",
                data: statusCount
            });
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                error: error
            });
        }
    },
    getTotalHargaTransaksiBulanIni: async (req, res) => {
        const sql = `
            SELECT SUM(harga_transaksi) as totalHarga 
            FROM transaksi 
            WHERE YEAR(tanggal_masuk) = YEAR(CURDATE()) 
            AND MONTH(tanggal_masuk) = MONTH(CURDATE())
        `;

        try {
            const totalHargaTransaksiBulanIni = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            const data = formatRupiah(totalHargaTransaksiBulanIni[0].totalHarga)

            return res.status(200).json({
                message: "success to get total harga transaksi bulan ini",
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                message: "internal server error",
                error: error
            });
        }
    },
    getSumTransaksiPerBulan: async (req, res) => {
        const sql = `
            SELECT 
                YEAR(tanggal_masuk) as year, 
                MONTH(tanggal_masuk) as month, 
                SUM(harga_transaksi) as totalHarga 
            FROM transaksi 
            GROUP BY YEAR(tanggal_masuk), MONTH(tanggal_masuk)
            ORDER BY YEAR(tanggal_masuk), MONTH(tanggal_masuk)
        `;

        try {
            const sumTransaksiPerBulan = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            return res.status(200).json({
                message: "success to get sum transaksi per bulan",
                data: sumTransaksiPerBulan
            });
        } catch (error) {

            return res.status(500).json({
                message: "internal server error",
                error: error
            });
        }
    }
}
