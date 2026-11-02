# BUKUKITA - Aplikasi Pemesanan Buku Online
**Nama:** Fachmi Amrullah  
**NIM:** (312510246)  
**Kelas:** I251B  
**Mata Kuliah:** Pemrograman Web  
**Jenis Tugas:** TUGAS UTS

---


## Deskripsi Proyek

BukuKita merupakan aplikasi pemesanan buku online berbasis website yang dibuat menggunakan HTML, CSS, dan JavaScript. Aplikasi ini dirancang untuk memudahkan pengguna dalam melihat katalog buku, mengetahui informasi stok, melakukan pemesanan, serta melacak status pengiriman buku.
Proyek ini dibuat sebagai latihan pengembangan aplikasi web dengan menerapkan dasar-dasar HTML, CSS, JavaScript, manipulasi DOM, event listener, dan pengelolaan data menggunakan JavaScript.

## Fitur Aplikasi

1. **Login**
   - Pengguna dapat masuk menggunakan email dan password.
   - Terdapat fitur pendaftaran akun.
   - Terdapat fitur simulasi lupa password.

2. **Dashboard**
   - Menampilkan sapaan pengguna.
   - Menampilkan ringkasan jumlah pesanan.
   - Menampilkan total nilai pemesanan.
   - Menampilkan laporan dan riwayat transaksi.

3. **Katalog Buku**
   - Menampilkan daftar buku.
   - Menampilkan kode, judul, edisi, stok, dan harga buku.
   - Mencari buku berdasarkan kode atau judul.
   - Menambahkan data buku baru.

4. **Pemesanan Buku**
   - Memilih buku yang tersedia.
   - Menentukan jumlah buku.
   - Mengisi informasi pemesan.
   - Memilih ekspedisi dan jenis paket.
   - Memilih metode pembayaran.
   - Menghitung total pembayaran.
   - Menyimpan data pemesanan.

5. **Tracking Pengiriman**
   - Mencari pesanan menggunakan nomor Delivery Order (DO).
   - Menampilkan informasi pesanan.
   - Menampilkan status dan riwayat perjalanan pengiriman.

## Teknologi yang Digunakan

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Session Storage
- Visual Studio Code
- Live Server

## Struktur Folder

```text
BUKUKITA/
│
├── login.html
├── dashboard.html
├── stok.html
├── checkout.html
├── tracking.html
│
├── css/
│   └── style.css
│
└── js/
    ├── data.js
    └── script.js
```

## Cara Menjalankan Aplikasi

1. Download atau clone repository BukuKita.
2. Buka folder proyek menggunakan Visual Studio Code.
3. Pastikan seluruh file dan folder sudah sesuai dengan struktur proyek.
4. Install ekstensi Live Server jika belum tersedia.
5. Klik kanan pada file `login.html`.
6. Pilih **Open with Live Server**.
7. Aplikasi akan terbuka melalui browser.

## Akun Demo

Gunakan akun berikut untuk mencoba aplikasi:

| Email | Password | Role |
|---|---|---|
| rina@gmail.com | rina123 | User |
| agus@gmail.com | agus123 | User |
| siti@gmail.com | siti123 | Admin |

## Contoh Nomor Tracking

| Nomor DO | Nama Pemesan | Status |
|---|---|---|
| 20230012 | Rina Wulandari | Dalam Perjalanan |
| 20230013 | Agus Pranoto | Selesai |

## Catatan

Aplikasi BukuKita masih menggunakan data simulasi yang disimpan dalam JavaScript dan Session Storage.

Aplikasi ini belum menggunakan database maupun backend. Oleh karena itu, perubahan data katalog, akun baru, dan pesanan baru belum tersimpan secara permanen setelah halaman dimuat ulang.

## Tujuan Pengembangan

Proyek ini bertujuan untuk menerapkan pengetahuan dasar pengembangan web, khususnya penggunaan HTML untuk struktur halaman, CSS untuk tampilan antarmuka, serta JavaScript untuk mengatur interaksi dan proses aplikasi.

## Pengembang

**Nama:** Fachmi Amrullah  
**Program Studi:** Teknik Informatika  
**Universitas:** Universitas Pelita Bangsa
