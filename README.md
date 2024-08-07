# Express.js Laundry backend

## Deskripsi

Proyek ini adalah API backend yang dibangun menggunakan Express.js. API ini mencakup berbagai fitur seperti pendaftaran pengguna, login, manajemen transaksi, manajemen pakaian, manajemen harga, manajemen pelanggan, dan dashboard metrics.

## Struktur Proyek

- **routes/index.js**: Menyediakan semua rute untuk API, termasuk rute untuk pendaftaran, login, transaksi, harga, pakaian, pelanggan, dan dashboard metrics.
- **middleware/auth.js**: Middleware untuk autentikasi dan otorisasi token akses.
- **controller/register.js**: Mengelola pendaftaran pengguna dan perubahan kata sandi.
- **controller/login.js**: Mengelola proses login pengguna.
- **controller/transaksi.js**: Mengelola operasi CRUD untuk transaksi.
- **controller/harga.js**: Mengelola operasi CRUD untuk harga.
- **controller/pakaian.js**: Mengelola operasi CRUD untuk pakaian.
- **controller/pelanggan.js**: Mengelola operasi CRUD untuk pelanggan.
- **controller/dashboard.js**: Menyediakan berbagai metrik untuk dashboard.

## Rute API

### Pendaftaran dan Login

- `POST /register`: Mendaftarkan pengguna baru.
- `PUT /change/password`: Mengubah kata sandi pengguna yang sudah ada.
- `POST /login`: Melakukan login dan mendapatkan token akses.

### Transaksi

- `GET /transaksi`: Mengambil semua transaksi.
- `GET /transaksi/:id`: Mengambil transaksi berdasarkan ID.
- `POST /transaksi`: Menambahkan transaksi baru.
- `PUT /transaksi/:id`: Memperbarui transaksi berdasarkan ID.
- `DELETE /transaksi/:id`: Menghapus transaksi berdasarkan ID.
- `GET /transaksi/pdf/:id`: Menghasilkan PDF untuk transaksi berdasarkan ID.

### Harga

- `GET /harga`: Mengambil semua harga.
- `PUT /harga/:id`: Memperbarui harga berdasarkan ID.

### Pakaian

- `GET /pakaian`: Mengambil semua pakaian.
- `GET /pakaian/:id`: Mengambil pakaian berdasarkan ID.
- `POST /pakaian`: Menambahkan pakaian baru.
- `PUT /pakaian/:id`: Memperbarui pakaian berdasarkan ID.
- `DELETE /pakaian/:id`: Menghapus pakaian berdasarkan ID.

### Pelanggan

- `GET /pelanggan`: Mengambil semua pelanggan.
- `GET /pelanggan/:id`: Mengambil pelanggan berdasarkan ID.
- `POST /pelanggan`: Menambahkan pelanggan baru.
- `PUT /pelanggan/:id`: Memperbarui pelanggan berdasarkan ID.
- `DELETE /pelanggan/:id`: Menghapus pelanggan berdasarkan ID.

### Dashboard

- `GET /total/pelanggan`: Mengambil jumlah total pelanggan.
- `GET /total/pakaian`: Mengambil jumlah total pakaian.
- `GET /total/transaksi`: Mengambil jumlah total transaksi.
- `GET /sum/transaksi`: Mengambil jumlah total harga transaksi.
- `GET /sum/transaksi/bulan`: Mengambil jumlah total harga transaksi bulan ini.
- `GET /status/count`: Mengambil jumlah status.
- `GET /sum/transaksi/hari`: Mengambil jumlah total transaksi hari ini.
- `GET /sum/setiap/bulan`: Mengambil jumlah total transaksi per bulan.

## Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/username/repository.git
