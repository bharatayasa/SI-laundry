const express = require('express');
const router = express.Router();
const AccessToken = require('../middleware/auth');

const register = require('../controller/register'); 
router.post('/register', register.register);

const login = require('../controller/login'); 
router.post('/login', login.login);

const transaction = require('../controller/transaksi');
router.get('/transaksi', AccessToken, transaction.getAllTransaction);
router.get('/transaksi/:id', AccessToken, transaction.getAllTransactionById);

const harga = require('../controller/harga');
router.get('/harga', AccessToken, harga.getAllHarga);
router.put('/harga/:id', AccessToken, harga.editHarga);

const pakaian = require('../controller/pakaian');
router.get('/pakaian', AccessToken, pakaian.getAllPakaian);

const pelanggan = require('../controller/pelanggan');
router.get('/pelanggan', AccessToken, pelanggan.getAllPelanggan)

module.exports = router;
