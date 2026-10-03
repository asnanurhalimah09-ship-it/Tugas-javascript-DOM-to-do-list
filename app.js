console.log("Bismillah Ya Allah");

// Aktivitas 1 DOM SELECTION / SELEKSI ELEMENT
// Kenapa kita harus seleksi? Karena kita "menangkap" atau ambil id/class
// Mengambil element HTML tersebut lalu disimpan di variabel JS

// 1. Mengambil element input dan tombol tambah
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");

// 2. Mengambil element daftar tugas dan pesan kosong
const daftarTugas = document.getElementById("daftar-tugas");
const pesanKosong = document.getElementById("pesan-kosong");

// 3. Mengambil element angka statistik
const jumlahTotal = document.getElementById("jumlah-total");
const jumlahSelesai = document.getElementById("jumlah-selesai");
const jumlahBelum = document.getElementById("jumlah-belum");

// Aktivitas 2 : Variabel penampung angka statistik
// *let* digunakan untuk nilai variabel yang akan berubah-ubah (counting)
let totalTugas = 0;
let totalSelesai = 0;

// Aktivitas 3 : Fungsi update angka statistik & pesan status
function perbaruiStatistik() {
    // belum selesai = total dikurangi selesai
    const totalBelum = totalTugas - totalSelesai;

    // .innerText = mengganti teks angka yang tampil di layar
    jumlahTotal.innerText = totalTugas;
    jumlahSelesai.innerText = totalSelesai;
    jumlahBelum.innerText = totalBelum;

    // Conditional statement : apakah daftar tugas kosong / 0?
    if (totalTugas === 0) {
        // Jika 0: hapus class "hidden" supaya teks "Belum ada tugas" muncul
        pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0: tambahkan class "hidden" agar teks tersembunyi
        pesanKosong.classList.add("hidden");
    }
}

// Aktivitas 4 : Fungsi utama logika tambah tugas baru
function tambahTugas() {
    // 4.1 inputTugas.value untuk mengambil teks yang diketik user
    // trim() = menghapus spasi di awal dan di akhir
    const isiTeks = inputTugas.value.trim();

    // 4.2 Validasi input: jika kosong maka tampilkan alert (pop up)
    if (isiTeks === "") {
        alert("Tugas tidak boleh kosong! Ketik dulu ya.");
        return;
    }

    // 4.3 document.createElement("li") --> membuat elemen baru di memori
    const liBaru = document.createElement("li");
    liBaru.className = "task-item"; // menambahkan class pada tag li

    // 4.4 .innerHTML = mengisi struktur di dalam <li> dengan teks tugas dan tombol hapus
    // Tanda backtick (`)
    liBaru.innerHTML = `<span class="task-teks">${isiTeks}</span> <button class="btn btn-hapus">Hapus</button>`;

    // 4.5 liBaru.querySelector(".nama-class") = mengambil elemen khusus yang ada di li
    const teksTugas = liBaru.querySelector(".task-teks");
    const btnHapus = liBaru.querySelector(".btn-hapus");

    // 4.6 variabel penanda status tugas ini (false = belum selesai)
    let selesai = false;

    // 4.7 Event Listener klik teks tugas: tandai selesai / batal selesai
    teksTugas.addEventListener("click", function() {
        if (selesai === false) {
            // jika belum selesai: tambah class "completed" (teks dicoret)
            liBaru.classList.add("completed");
            totalSelesai++;
            selesai = true;
        } else {
            // jika sudah selesai: hapus class "completed"
            liBaru.classList.remove("completed");
            totalSelesai--;
            selesai = false;
        }
        perbaruiStatistik(); // panggil fungsi untuk update angka di layar
        console.log(`DOM Status tugas "${isiTeks}" diubah`);
    });

    // 4.8 Event Listener tombol hapus pada tugas dinamis
    btnHapus.addEventListener("click", function() {
        liBaru.remove(); // menghapus elemen list dari layar HTML
        totalTugas--; // totalTugas dikurangi 1

        // jika tugas yang dihapus berstatus selesai, totalSelesai ikut dikurangi
        if (selesai === true) {
            totalSelesai--;
        }

        perbaruiStatistik();
        console.log(`DOM Tugas "${isiTeks}" dihapus`);
    });

    // 4.9 appendChild = memasukkan elemen li ke dalam wadah <ul id="daftar-tugas">
    daftarTugas.appendChild(liBaru);

    // 4.10 Mengosongkan kembali isi kolom input supaya bisa diketik lagi
    inputTugas.value = "";

    // 4.11 totalTugas++ artinya tambah total tugas 1, lalu update angka ke layar
    totalTugas++;
    perbaruiStatistik();

    console.log(`DOM Tugas baru ditambahkan: ${isiTeks}`);
}

// Langkah 5 : Event Listener klik tombol "+ Tambah"
// ketika tombol di klik oleh user, maka jalankan fungsi tambahTugas()
btnTambah.addEventListener("click", function() {
    tambahTugas();
});

// Langkah 6 : Event Listener keyboard "Enter" pada kolom input
// ketika user mengetik di kolom input dan melepas tombol keyboard (Event keyup)
inputTugas.addEventListener("keyup", function(event) {
    // periksa apakah tombol keyboard yang dilepas user adalah Enter?
    if (event.key === "Enter") {
        tambahTugas(); // jika ya, jalankan fungsi tambahTugas()
    }
});

// Tampilkan angka statistik awal (semua 0) dan pesan kosong saat halaman dibuka
perbaruiStatistik();