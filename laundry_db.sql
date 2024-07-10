-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 10 Jul 2024 pada 05.24
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laundry_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin1', 'password1'),
(2, 'admin2', 'password2'),
(3, 'admin3', 'password3'),
(4, 'admin4', 'password4'),
(5, 'admin5', 'password5'),
(6, 'admin6', 'password6'),
(7, 'admin7', 'password7'),
(8, 'admin8', 'password8'),
(9, 'admin9', 'password9'),
(10, 'admin10', 'password10'),
(11, 'admin', '$2b$10$4vUiAIUCakJQmaDkLrfjzOgUJT1YNCxHABgGv5FXjtn/rxs9HSdte');

-- --------------------------------------------------------

--
-- Struktur dari tabel `harga`
--

CREATE TABLE `harga` (
  `id_harga` int(11) NOT NULL,
  `harga_perkilo` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `harga`
--

INSERT INTO `harga` (`id_harga`, `harga_perkilo`) VALUES
(1, 10000.00),
(2, 12000.00),
(3, 12345.00),
(4, 13000.00),
(5, 10500.00),
(6, 11500.00),
(7, 12500.00),
(8, 14000.00),
(9, 14500.00),
(10, 13500.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pakaian`
--

CREATE TABLE `pakaian` (
  `id_pakaian` int(11) NOT NULL,
  `transaksi_pakaian` varchar(100) DEFAULT NULL,
  `jenis_pakaian` varchar(50) DEFAULT NULL,
  `jumlah_pakaian` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pakaian`
--

INSERT INTO `pakaian` (`id_pakaian`, `transaksi_pakaian`, `jenis_pakaian`, `jumlah_pakaian`) VALUES
(1, 'Transaksi 1', 'Kemeja', 5),
(2, 'Transaksi 2', 'Celana', 3),
(3, 'Transaksi 3', 'Jaket', 2),
(4, 'Transaksi 4', 'Gaun', 4),
(5, 'Transaksi 5', 'Rok', 6),
(6, 'Transaksi 6', 'Pakaian Dalam', 10),
(7, 'Transaksi 7', 'Kaos', 8),
(8, 'Transaksi 8', 'Jas', 1),
(9, 'Transaksi 9', 'Sweater', 7),
(10, 'Transaksi 10', 'Blazer', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama_pelanggan` varchar(100) NOT NULL,
  `tlp_pelanggan` varchar(15) DEFAULT NULL,
  `alamat_pelanggan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama_pelanggan`, `tlp_pelanggan`, `alamat_pelanggan`) VALUES
(1, 'John Doe', '081234567890', 'Jl. Mawar No. 1'),
(2, 'Jane Smith', '081234567891', 'Jl. Melati No. 2'),
(3, 'Robert Johnson', '081234567892', 'Jl. Anggrek No. 3'),
(4, 'Michael Brown', '081234567893', 'Jl. Kamboja No. 4'),
(5, 'Emily Davis', '081234567894', 'Jl. Sakura No. 5'),
(6, 'Linda Miller', '081234567895', 'Jl. Teratai No. 6'),
(7, 'James Wilson', '081234567896', 'Jl. Kenanga No. 7'),
(8, 'Barbara Moore', '081234567897', 'Jl. Dahlia No. 8'),
(9, 'Richard Taylor', '081234567898', 'Jl. Bougenville No. 9'),
(10, 'Susan Anderson', '081234567899', 'Jl. Lili No. 10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_harga` int(11) DEFAULT NULL,
  `id_pakaian` int(11) DEFAULT NULL,
  `id_pelanggan` int(11) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `pelanggan_transaksi` varchar(100) DEFAULT NULL,
  `harga_transaksi` decimal(10,2) DEFAULT NULL,
  `berat_transaksi` decimal(10,2) DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `status_transaksi` varchar(50) DEFAULT NULL,
  `transaksi_harga` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_harga`, `id_pakaian`, `id_pelanggan`, `tanggal_masuk`, `pelanggan_transaksi`, `harga_transaksi`, `berat_transaksi`, `tanggal_selesai`, `status_transaksi`, `transaksi_harga`) VALUES
(1, 1, 1, 1, '2024-01-01', 'John Doe', 50000.00, 5.00, '2024-01-02', 'Selesai', NULL),
(2, 2, 2, 2, '2024-01-02', 'Jane Smith', 36000.00, 3.00, '2024-01-03', 'Selesai', NULL),
(3, 3, 3, 3, '2024-01-03', 'Robert Johnson', 22000.00, 2.00, '2024-01-04', 'Selesai', NULL),
(4, 4, 4, 4, '2024-01-04', 'Michael Brown', 52000.00, 4.00, '2024-01-05', 'Selesai', NULL),
(5, 5, 5, 5, '2024-01-05', 'Emily Davis', 63000.00, 6.00, '2024-01-06', 'Selesai', NULL),
(6, 6, 6, 6, '2024-01-06', 'Linda Miller', 100000.00, 10.00, '2024-01-07', 'Selesai', NULL),
(7, 7, 7, 7, '2024-01-07', 'James Wilson', 88000.00, 8.00, '2024-01-08', 'Selesai', NULL),
(8, 8, 8, 8, '2024-01-08', 'Barbara Moore', 14000.00, 1.00, '2024-01-09', 'Selesai', NULL),
(9, 9, 9, 9, '2024-01-09', 'Richard Taylor', 77000.00, 7.00, '2024-01-10', 'Selesai', NULL),
(10, 10, 10, 10, '2024-01-10', 'Susan Anderson', 27000.00, 2.00, '2024-01-11', 'Selesai', NULL),
(11, 1, 1, 1, '2024-07-07', NULL, NULL, 5.50, '2024-07-10', 'pending', 55000.00),
(12, 1, 1, 1, '2024-07-07', NULL, NULL, 10.00, '2024-07-10', 'pending', 100000.00),
(13, 1, 1, 1, '2024-07-07', NULL, NULL, 10.00, '2024-07-10', 'pending', 100000.00);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `harga`
--
ALTER TABLE `harga`
  ADD PRIMARY KEY (`id_harga`);

--
-- Indeks untuk tabel `pakaian`
--
ALTER TABLE `pakaian`
  ADD PRIMARY KEY (`id_pakaian`);

--
-- Indeks untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_harga` (`id_harga`),
  ADD KEY `id_pakaian` (`id_pakaian`),
  ADD KEY `id_pelanggan` (`id_pelanggan`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `harga`
--
ALTER TABLE `harga`
  MODIFY `id_harga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `pakaian`
--
ALTER TABLE `pakaian`
  MODIFY `id_pakaian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_harga`) REFERENCES `harga` (`id_harga`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_pakaian`) REFERENCES `pakaian` (`id_pakaian`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
