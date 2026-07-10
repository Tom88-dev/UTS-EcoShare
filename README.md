# 🌱 Eco-Share (Backend API)

## Penjelasan
Eco-Share Backend API adalah layanan server RESTful yang mengelola logika bisnis, autentikasi pengguna, dan penyimpanan data untuk platform penyewaan barang. Sistem ini memastikan keamanan data dan kelancaran alur transaksi antara pemilik barang dan penyewa.

## Stack / Teknis
* **Bahasa Pemrograman:** JavaScript (Node.js)
* **Framework:** Express.js
* **Database:** MySQL 
* **Keamanan/Autentikasi:** JWT (JSON Web Token)

## Flow Aplikasi
1. **Autentikasi:** Frontend mengirimkan kredensial login, dan Backend memvalidasinya lalu mengembalikan token otorisasi (JWT).
2. **Proses Request:** Frontend mengirimkan *request* HTTP (seperti mengambil katalog atau membuat pesanan) dengan menyertakan token otorisasi.
3. **Database & Respons:** Middleware Backend memvalidasi *role* pengguna (Owner/Renter), melakukan operasi CRUD ke database sesuai *request*, lalu mengembalikan data/status dalam format JSON ke Frontend.