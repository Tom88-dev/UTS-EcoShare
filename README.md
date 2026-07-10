# 🌱 Eco-Share - Backend API

Ini adalah *repository* backend untuk aplikasi **Eco-Share**, sebuah platform penyewaan barang yang menggunakan arsitektur RESTful API. Backend ini bertugas mengelola logika bisnis, autentikasi pengguna, penyimpanan data katalog barang, serta alur transaksi penyewaan.

## ✨ Fitur Utama
* **Autentikasi & Otorisasi:** Sistem akses yang aman dengan pembagian peran/role secara tegas antara Pemilik Barang (*OWNER*) dan Penyewa (*RENTER*).
* **Manajemen Barang (CRUD):** Endpoint API untuk mengambil daftar barang, serta menambah, mengubah, dan menghapus barang (khusus Owner).
* **Manajemen Transaksi:** Endpoint API untuk memproses pesanan penyewaan baru dan mengubah status transaksi (*Pending, Approved, Rejected*).
* **Proteksi Route:** Pengamanan *endpoint* menggunakan otorisasi token agar data tidak bisa diakses oleh pihak yang tidak berwenang.

## 🛠️ Teknologi yang Digunakan
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MySQL / PostgreSQL / MongoDB *(Catatan: Hapus yang tidak sesuai)*
* **Keamanan:** CORS & JWT / LocalStorage Auth handling

## 🚀 Cara Menjalankan Proyek (Backend)

1. Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) dan database yang sesuai sudah berjalan.
2. Clone *repository* ini.
3. Buka terminal dan masuk ke folder proyek, lalu jalankan perintah berikut untuk menginstal seluruh dependensi:
   ```bash
   npm install