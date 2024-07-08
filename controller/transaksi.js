const connection = require('../config/database')

module.exports = {
    getAllTransaction: async (req, res) => {
        const sql = "SELECT * FROM transaksi";

        try {
            const transaksi = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

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
    // todo, lanjutkan
    insertTransaction: async (req, res) => {

    }
}
