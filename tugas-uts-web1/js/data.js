// ======================================
// DATA PENGGUNA
// ======================================

var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User"
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User"
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin"
    }
];


// ======================================
// DATA KATALOG BUKU
// ======================================

var dataKatalogBuku = [
    {
        kode: "ASIP4301",
        judul: "Pengantar Ilmu Komunikasi",
        edisi: 2,
        stok: 548,
        harga: 180000,
        gambar: "img/pengantar_komunikasi.jpg"
    },
    {
        kode: "EKMA4002",
        judul: "Manajemen Keuangan",
        edisi: 3,
        stok: 392,
        harga: 220000,
        gambar: "img/manajemen_keuangan.jpg"
    },
    {
        kode: "EKMA4310",
        judul: "Kepemimpinan",
        edisi: 1,
        stok: 278,
        harga: 150000,
        gambar: "img/kepemimpinan.jpg"
    },
    {
        kode: "BIOL4211",
        judul: "Mikrobiologi Dasar",
        edisi: 2,
        stok: 165,
        harga: 200000,
        gambar: "img/mikrobiologi.jpg"
    },
    {
        kode: "PAUD4401",
        judul: "Perkembangan Anak Usia Dini",
        edisi: 4,
        stok: 204,
        harga: 250000,
        gambar: "img/paud_perkembangan.jpeg"
    }
];


// ======================================
// DATA TRACKING PENGIRIMAN
// ======================================

var dataTracking = [
    {
        noDO: "20230012",
        namaPemesan: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        jenisPaket: "Reguler",
        total: 180000,

        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN."
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN."
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan."
            }
        ]
    },

    {
        noDO: "20230013",
        namaPemesan: "Agus Pranoto",
        status: "Selesai",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        jenisPaket: "Reguler",
        total: 220000,

        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN."
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN."
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung."
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG."
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi."
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto."
            }
        ]
    }
];


// ======================================
// DATA PEMESANAN BARU
// ======================================

var dataPemesanan = [];