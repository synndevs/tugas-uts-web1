// ======================================
// SCRIPT UTAMA BUKUKITA
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    // FORMAT RUPIAH
    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(Number(angka) || 0);
    }


    // MENGAMBIL DATA USER LOGIN
    function getLoggedUser() {
        try {
            return JSON.parse(sessionStorage.getItem("bukuKitaUser"));
        } catch (error) {
            return null;
        }
    }


    // PROTEKSI HALAMAN
    if (
        document.body.dataset.protected === "true" &&
        !getLoggedUser()
    ) {
        window.location.href = "login.html";
        return;
    }


    // ======================================
    // MODAL
    // ======================================

    document.querySelectorAll("[data-modal]").forEach(function (button) {

        button.addEventListener("click", function () {

            var modal = document.getElementById(button.dataset.modal);

            if (modal) {
                modal.classList.add("show");
            }

        });

    });


    document.querySelectorAll(".modal-close").forEach(function (button) {

        button.addEventListener("click", function () {

            var modal = button.closest(".modal");

            modal.classList.remove("show");

        });

    });


    document.querySelectorAll(".modal").forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                modal.classList.remove("show");
            }

        });

    });


    // ======================================
    // LOGIN
    // ======================================

    var loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            var email = document.getElementById("email").value.trim().toLowerCase();

            var password = document.getElementById("password").value;

            var user = dataPengguna.find(function (item) {

                return (
                    item.email.toLowerCase() === email &&
                    item.password === password
                );

            });


            if (user) {

                sessionStorage.setItem(
                    "bukuKitaUser",
                    JSON.stringify({
                        nama: user.nama,
                        email: user.email,
                        role: user.role
                    })
                );

                alert("Login berhasil. Selamat datang, " + user.nama);

                window.location.href = "dashboard.html";

            } else {

                alert("Email atau password salah.");

            }

        });

    }


    // ======================================
    // LUPA PASSWORD
    // ======================================

    var forgotForm = document.getElementById("forgotForm");

    if (forgotForm) {

        forgotForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert("Fitur lupa password berhasil dijalankan sebagai simulasi.");

            document.getElementById("forgotModal").classList.remove("show");

            forgotForm.reset();

        });

    }


    // ======================================
    // DAFTAR AKUN
    // ======================================

    var registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            var nama = document.getElementById("registerName").value.trim();

            var email = document.getElementById("registerEmail").value.trim().toLowerCase();

            var password = document.getElementById("registerPassword").value;


            var emailAda = dataPengguna.some(function (user) {

                return user.email.toLowerCase() === email;

            });


            if (emailAda) {

                alert("Email sudah terdaftar.");

                return;

            }


            dataPengguna.push({

                id: Date.now(),

                nama: nama,

                email: email,

                password: password,

                role: "User"

            });


            alert("Pendaftaran berhasil. Silakan login.");

            document.getElementById("registerModal").classList.remove("show");

            registerForm.reset();

        });

    }


    // ======================================
    // LOGOUT
    // ======================================

    document.querySelectorAll("[data-logout]").forEach(function (button) {

        button.addEventListener("click", function () {

            var yakin = confirm("Apakah kamu yakin ingin keluar?");

            if (yakin) {

                sessionStorage.removeItem("bukuKitaUser");

                window.location.href = "login.html";

            }

        });

    });


    // ======================================
    // DASHBOARD
    // ======================================

    if (document.getElementById("greeting")) {

        var user = getLoggedUser();

        var jam = new Date().getHours();

        var sapaan = "Selamat malam";


        if (jam >= 4 && jam < 11) {
            sapaan = "Selamat pagi";
        } else if (jam >= 11 && jam < 15) {
            sapaan = "Selamat siang";
        } else if (jam >= 15 && jam < 18) {
            sapaan = "Selamat sore";
        }


        document.getElementById("greeting").textContent =
            sapaan + ", " + user.nama + "!";


        document.getElementById("welcomeName").textContent =
            "Selamat datang di aplikasi BukuKita.";


        document.getElementById("localDate").textContent =
            new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });


        var semuaPesanan = dataTracking.concat(dataPemesanan);


        document.getElementById("orderCount").textContent =
            semuaPesanan.length;


        var totalPesanan = semuaPesanan.reduce(function (total, pesanan) {

            return total + Number(pesanan.total || 0);

        }, 0);


        document.getElementById("orderValue").textContent =
            formatRupiah(totalPesanan);


        document.getElementById("bookCount").textContent =
            dataKatalogBuku.length;


        var reportTable = document.getElementById("reportTable");


        semuaPesanan.forEach(function (pesanan) {

            var row = document.createElement("tr");

            var data = [
                pesanan.noDO,
                pesanan.namaPemesan,
                pesanan.status || "Pesanan dibuat",
                formatRupiah(pesanan.total)
            ];


            data.forEach(function (value) {

                var cell = document.createElement("td");

                cell.textContent = value || "-";

                row.appendChild(cell);

            });


            reportTable.appendChild(row);

        });


        var historyTable = document.getElementById("historyTable");


        semuaPesanan.forEach(function (pesanan) {

            var row = document.createElement("tr");

            var data = [
                pesanan.tanggalKirim || pesanan.tanggal || "-",
                pesanan.noDO,
                pesanan.namaPemesan,
                pesanan.ekspedisi || "-",
                formatRupiah(pesanan.total)
            ];


            data.forEach(function (value) {

                var cell = document.createElement("td");

                cell.textContent = value || "-";

                row.appendChild(cell);

            });


            historyTable.appendChild(row);

        });

    }


    // ======================================
    // KATALOG BUKU
    // ======================================

    var bookTable = document.getElementById("bookTable");


    function renderBooks(keyword) {

        if (!bookTable) return;

        bookTable.innerHTML = "";

        keyword = (keyword || "").toLowerCase();


        var hasil = dataKatalogBuku.filter(function (book) {

            return (
                book.kode.toLowerCase().includes(keyword) ||
                book.judul.toLowerCase().includes(keyword)
            );

        });


        hasil.forEach(function (book) {

            var row = document.createElement("tr");


            var data = [
                book.kode,
                book.judul,
                book.edisi,
                book.stok,
                formatRupiah(book.harga)
            ];


            data.forEach(function (value) {

                var cell = document.createElement("td");

                cell.textContent = value;

                row.appendChild(cell);

            });


            var actionCell = document.createElement("td");

            var link = document.createElement("a");

            link.href = "checkout.html?kode=" + encodeURIComponent(book.kode);

            link.className = "table-action";

            link.textContent = "Pesan";

            actionCell.appendChild(link);

            row.appendChild(actionCell);

            bookTable.appendChild(row);

        });


        document.getElementById("bookTotal").textContent =
            hasil.length + " dari " + dataKatalogBuku.length + " buku";


        if (hasil.length === 0) {

            var row = document.createElement("tr");

            var cell = document.createElement("td");

            cell.colSpan = 6;

            cell.textContent = "Buku tidak ditemukan.";

            row.appendChild(cell);

            bookTable.appendChild(row);

        }

    }


    if (bookTable) {

        renderBooks("");

        document.getElementById("bookSearch").addEventListener("input", function (event) {

            renderBooks(event.target.value);

        });

    }


    // ======================================
    // TAMBAH BUKU
    // ======================================

    var addBookForm = document.getElementById("addBookForm");


    if (addBookForm) {

        addBookForm.addEventListener("submit", function (event) {

            event.preventDefault();


            var kode = document.getElementById("newCode").value.trim().toUpperCase();

            var judul = document.getElementById("newTitle").value.trim();

            var edisi = Number(document.getElementById("newEdition").value);

            var stok = Number(document.getElementById("newStock").value);

            var harga = Number(document.getElementById("newPrice").value);


            var kodeAda = dataKatalogBuku.some(function (book) {

                return book.kode === kode;

            });


            if (kodeAda) {

                alert("Kode buku sudah digunakan.");

                return;

            }


            dataKatalogBuku.push({

                kode: kode,

                judul: judul,

                edisi: edisi,

                stok: stok,

                harga: harga,

                gambar: ""

            });


            renderBooks(document.getElementById("bookSearch").value);

            addBookForm.reset();

            alert("Buku berhasil ditambahkan.");

        });

    }


    // ======================================
    // CHECKOUT
    // ======================================

    var orderBook = document.getElementById("orderBook");

    var orderQty = document.getElementById("orderQty");

    var orderTotal = document.getElementById("orderTotal");


    function populateBookOptions() {

        if (!orderBook) return;

        orderBook.innerHTML = '<option value="">-- Pilih Buku --</option>';


        dataKatalogBuku.forEach(function (book) {

            var option = document.createElement("option");

            option.value = book.kode;

            option.textContent =
                book.judul + " - " + formatRupiah(book.harga) +
                " (Stok: " + book.stok + ")";

            orderBook.appendChild(option);

        });


        var kodeURL = new URLSearchParams(window.location.search).get("kode");

        if (kodeURL) {

            orderBook.value = kodeURL;

        }

    }


    function calculateOrderTotal() {

        if (!orderBook || !orderQty || !orderTotal) return;

        var book = dataKatalogBuku.find(function (item) {

            return item.kode === orderBook.value;

        });


        var jumlah = Number(orderQty.value);

        var total = 0;


        if (book && jumlah > 0) {

            total = book.harga * jumlah;

        }


        orderTotal.value = formatRupiah(total);

    }


    function renderOrders() {

        var table = document.getElementById("checkoutTable");

        if (!table) return;

        table.innerHTML = "";


        dataPemesanan.forEach(function (order) {

            var row = document.createElement("tr");


            var data = [
                order.noDO,
                order.namaPemesan,
                order.judulBuku,
                order.jumlah,
                formatRupiah(order.total)
            ];


            data.forEach(function (value) {

                var cell = document.createElement("td");

                cell.textContent = value;

                row.appendChild(cell);

            });


            var actionCell = document.createElement("td");


            var deleteButton = document.createElement("button");

            deleteButton.type = "button";

            deleteButton.textContent = "Hapus";

            deleteButton.className = "table-action-button";


            deleteButton.addEventListener("click", function () {

                var yakin = confirm("Hapus pesanan ini?");

                if (!yakin) return;


                var book = dataKatalogBuku.find(function (item) {

                    return item.kode === order.kodeBuku;

                });


                if (book) {

                    book.stok += order.jumlah;

                }


                var index = dataPemesanan.findIndex(function (item) {

                    return item.noDO === order.noDO;

                });


                if (index !== -1) {

                    dataPemesanan.splice(index, 1);

                }


                populateBookOptions();

                renderOrders();

            });


            actionCell.appendChild(deleteButton);

            row.appendChild(actionCell);

            table.appendChild(row);

        });


        if (dataPemesanan.length === 0) {

            var row = document.createElement("tr");

            var cell = document.createElement("td");

            cell.colSpan = 6;

            cell.textContent = "Belum ada pesanan.";

            row.appendChild(cell);

            table.appendChild(row);

        }

    }


    if (orderBook) {

        populateBookOptions();

        calculateOrderTotal();

        renderOrders();


        orderBook.addEventListener("change", calculateOrderTotal);

        orderQty.addEventListener("input", calculateOrderTotal);


        document.getElementById("calculateTotal").addEventListener("click", calculateOrderTotal);

    }


    // SIMPAN PEMESANAN

    var checkoutForm = document.getElementById("checkoutForm");


    if (checkoutForm) {

        checkoutForm.addEventListener("submit", function (event) {

            event.preventDefault();


            var book = dataKatalogBuku.find(function (item) {

                return item.kode === orderBook.value;

            });


            var jumlah = Number(orderQty.value);


            if (!book) {

                alert("Silakan pilih buku.");

                return;

            }


            if (jumlah < 1 || !Number.isInteger(jumlah)) {

                alert("Jumlah buku tidak valid.");

                return;

            }


            if (jumlah > book.stok) {

                alert("Stok buku tidak mencukupi.");

                return;

            }


            var total = book.harga * jumlah;


            var pesananBaru = {

                noDO: "DO" + Date.now().toString().slice(-8),

                namaPemesan: document.getElementById("buyerName").value.trim(),

                email: document.getElementById("buyerEmail").value.trim(),

                telepon: document.getElementById("buyerPhone").value.trim(),

                alamat: document.getElementById("buyerAddress").value.trim(),

                kodeBuku: book.kode,

                judulBuku: book.judul,

                jumlah: jumlah,

                hargaSatuan: book.harga,

                total: total,

                ekspedisi: document.getElementById("shipping").value,

                jenisPaket: document.getElementById("packageType").value,

                pembayaran: document.getElementById("paymentMethod").value,

                status: "Pesanan dibuat",

                tanggal: new Date().toLocaleDateString("id-ID"),

                tanggalKirim: "-",

                perjalanan: []

            };


            dataPemesanan.push(pesananBaru);

            book.stok -= jumlah;


            renderOrders();

            populateBookOptions();


            alert(
                "Pemesanan berhasil disimpan!\n" +
                "Nomor DO: " + pesananBaru.noDO +
                "\nTotal: " + formatRupiah(total)
            );


            checkoutForm.reset();

            populateBookOptions();

            calculateOrderTotal();

        });

    }


    // ======================================
    // TRACKING PENGIRIMAN
    // ======================================

    var trackingForm = document.getElementById("trackingForm");


    if (trackingForm) {

        trackingForm.addEventListener("submit", function (event) {

            event.preventDefault();


            var nomorDO = document.getElementById("doNumber").value.trim().toUpperCase();

            var result = document.getElementById("trackingResult");


            var semuaTracking = dataTracking.concat(dataPemesanan);


            var pesanan = semuaTracking.find(function (item) {

                return String(item.noDO).toUpperCase() === nomorDO;

            });


            result.innerHTML = "";


            if (!pesanan) {

                result.innerHTML =
                    '<div class="alert-box error-box">' +
                    'Nomor DO tidak ditemukan.' +
                    '</div>';

                return;

            }


            var card = document.createElement("div");

            card.className = "tracking-card";


            var title = document.createElement("h2");

            title.textContent = "Detail Pengiriman";

            card.appendChild(title);


            var detail = [

                ["Nomor DO", pesanan.noDO],

                ["Nama Pemesan", pesanan.namaPemesan],

                ["Status Pengiriman", pesanan.status],

                ["Ekspedisi", pesanan.ekspedisi],

                ["Tanggal Kirim", pesanan.tanggalKirim],

                ["Jenis Paket", pesanan.jenisPaket],

                ["Total Pembayaran", formatRupiah(pesanan.total)]

            ];


            var list = document.createElement("dl");

            list.className = "detail-list";


            detail.forEach(function (item) {

                var dt = document.createElement("dt");

                dt.textContent = item[0];


                var dd = document.createElement("dd");

                dd.textContent = item[1] || "-";


                list.appendChild(dt);

                list.appendChild(dd);

            });


            card.appendChild(list);


            // RIWAYAT PERJALANAN

            if (pesanan.perjalanan && pesanan.perjalanan.length > 0) {

                var historyTitle = document.createElement("h3");

                historyTitle.textContent = "Riwayat Perjalanan";


                var historyList = document.createElement("ol");

                historyList.className = "journey-list";


                pesanan.perjalanan.forEach(function (step) {

                    var item = document.createElement("li");


                    var time = document.createElement("strong");

                    time.textContent = step.waktu;


                    var description = document.createElement("p");

                    description.textContent = step.keterangan;


                    item.appendChild(time);

                    item.appendChild(description);


                    historyList.appendChild(item);

                });


                card.appendChild(historyTitle);

                card.appendChild(historyList);

            }


            result.appendChild(card);

        });


        document.querySelectorAll("[data-fill-do]").forEach(function (button) {

            button.addEventListener("click", function () {

                document.getElementById("doNumber").value =
                    button.dataset.fillDo;

                trackingForm.requestSubmit();

            });

        });

    }

});