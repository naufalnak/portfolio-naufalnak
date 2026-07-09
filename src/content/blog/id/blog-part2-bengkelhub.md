# Tiga Bug yang Hampir Lolos ke Production: Cerita Teknis di Balik BengkelHub

> 📸 **[GAMBAR 1: Screenshot kode atau terminal — bisa diagram alur convert booking jadi Service]**

Di _Part 1_, saya cerita soal kenapa BengkelHub lahir dari rebuild project MSIB yang berantakan, dan kenapa saya pilih Go, Fiber, dan arsitektur multi-tenant buat versi barunya.

Part ini lebih teknis. Tiga bug yang kelihatannya kecil di awal, tapi kalau kelewatan, bisa berujung ke masalah yang jauh lebih serius: riwayat servis yang nyasar ke orang lain, semua orang gagal daftar akun, dan notifikasi WhatsApp yang diam-diam gagal terkirim tanpa ada yang tahu kenapa.

---

## Bug #1: Pencocokan Plat Nomor Doang Itu Berbahaya

BengkelHub punya dua jalur customer masuk: booking online lewat aplikasi, dan walk-in yang datang langsung ke bengkel. Dua-duanya harus berujung jadi data yang sama: satu `Customer`, satu `Vehicle`, satu `Service`.

> 📸 **[GAMBAR 2: Screenshot halaman "Proses jadi Servis" atau diagram alur booking → Customer/Vehicle/Service]**

Waktu saya bikin fitur "Proses jadi Servis" (konversi booking online jadi record servis internal), logikanya kelihatan sederhana: cari kendaraan berdasarkan plat nomor di workshop itu. Kalau sudah ada, pakai yang lama. Kalau belum, bikin baru.

```go
vehicle, err := s.vehicleRepo.FindByPlateNumber(workshopID, plateNumber)
```

Kelihatan masuk akal. Plat nomor itu identitas unik kendaraan, kan? Masalahnya baru ketahuan pas testing pakai data dummy: saya bikin booking baru dengan plat yang _kebetulan_ sama dengan kendaraan yang sudah terdaftar punya customer lain di data seed. Begitu saya klik "Proses jadi Servis", sistem nemuin kendaraan yang sudah ada itu, dan langsung nyambungin service baru ini ke situ.

Hasilnya: Service dan Invoice yang baru dibuat itu tercatat atas nama **customer yang salah**. Bukan orang yang beneran booking, tapi pemilik lama kendaraan dengan plat yang sama.

Ini bukan cuma bug tampilan. Ini kebocoran data antar customer. Kalau ini kejadian beneran (dua orang beda kebetulan input plat yang sama, entah salah ketik atau memang mobil pindah tangan), riwayat servis satu orang bisa numpang ke akun orang lain yang gak ada hubungannya sama sekali.

Fix-nya: pencocokan kendaraan sekarang di-scope ke **kombinasi plat DAN customer**, bukan plat doang.

```go
vehicle, err := s.vehicleRepo.FindByCustomerAndPlate(workshopID, customer.ID, plateNumber)
```

Konsekuensinya, sekarang mungkin ada dua record kendaraan dengan plat yang sama tapi customer beda, kalau kebetulan bentrok. Saya pilih ini sebagai trade-off yang sengaja: lebih baik ada sedikit duplikat data yang bisa digabung manual belakangan, daripada riwayat servis diam-diam nyasar ke orang yang gak terkait.

---

## Bug #2: Validasi Nomor HP yang Nyaris Bikin Semua Orang Gagal Daftar

Filosofi BengkelHub sederhana: customer isi data sendiri lewat booking, operator tinggal proses. Supaya ini beneran jalan, nomor HP customer wajib ada, karena dipakai buat kirim notifikasi WhatsApp dan buat konversi booking jadi servis.

> 📸 **[GAMBAR 3: Screenshot form register atau error validasi nomor HP]**

Saya ubah validasi backend dari opsional jadi wajib:

```go
Phone string `json:"phone" validate:"required,e164"`
```

`e164` itu format standar internasional buat nomor telepon, contohnya `+6281234567890`. Begitu saya terapkan validasi ini, saya iseng cek lagi form register di frontend. Ternyata form-nya cuma validasi panjang minimal karakter, tanpa transform apa pun, dan langsung kirim nomor mentah kayak `081234567890` ke backend.

Nomor format `08xxx` itu **bukan** format `e164` (yang wajib diawali `+`). Artinya, kalau validasi ini benar-benar diterapkan tanpa perbaikan di frontend, **semua orang yang daftar pakai format nomor HP normal ala Indonesia bakal ditolak backend**. Bug ini sebenarnya sudah ada sejak awal (waktu validasinya masih opsional, cuma gak kelihatan karena nomor kosong pun lolos), dan baru nongol jelas begitu saya perketat validasinya.

Fix-nya ada di dua sisi. Tambah fungsi normalisasi di frontend sebelum data dikirim:

```typescript
export function toE164(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("62")) return "+" + digits;
  if (digits.startsWith("0")) return "+62" + digits.slice(1);
  return "+62" + digits;
}
```

Dan pastikan validasi backend tetap ketat, supaya kalau suatu saat ada yang akses API langsung tanpa lewat form, data yang masuk tetap konsisten.

Pelajarannya: validasi yang "benar" secara teknis di satu sisi (backend) bisa diam-diam merusak semuanya kalau sisi lain (frontend) gak dicek ulang bareng. Baru ketahuan karena saya sengaja nyoba testing ulang pakai data yang realistis, bukan cuma percaya form-nya "pasti udah bener".

Tapi cerita ini belum selesai di situ. BengkelHub punya dua form registrasi: satu buat operator bengkel, satu lagi buat pelanggan. Waktu saya bikin fix normalisasi nomor HP ini, saya terapkan ke dua-duanya. Atau begitu saya kira.

Beberapa waktu kemudian, pas saya cek ulang project-nya langsung (bukan cuma percaya catatan perubahan sebelumnya), ternyata fix itu cuma benar-benar nempel di form registrasi pelanggan. Form registrasi operator masih versi lama: kirim nomor HP mentah tanpa normalisasi sama sekali. Selama itu, siapa pun yang coba daftar jadi operator bengkel pakai nomor format biasa bakal ditolak backend, sementara pelanggan yang daftar baik-baik saja.

Bug yang sama, fix yang sama, tapi ketempel cuma di setengah tempat yang seharusnya. Ini pengingat kalau "sudah saya perbaiki" itu klaim yang perlu diverifikasi ulang ke kode yang beneran jalan, bukan cuma diasumsikan ikut menyebar ke semua tempat yang mestinya kena.

---

## Bug #3: Kesalahan Baca Response Fonnte yang Bikin Error-nya Kelihatan Kosong

Notifikasi WhatsApp di BengkelHub jalan lewat Fonnte, dan buat reminder booking yang terjadwal, saya pakai Asynq (Redis-backed job queue) supaya prosesnya jalan di background, terpisah dari request utama.

> 📸 **[GAMBAR 4: Diagram Asynq worker — enqueue task → Redis → worker terpisah → Fonnte API]**

Cara kerjanya kira-kira begini: begitu ada booking baru, saya enqueue task ke Asynq dengan waktu eksekusi terjadwal (misal, sehari sebelum jadwal servis). Worker Asynq jalan sebagai proses terpisah, ambil task dari Redis begitu waktunya tiba, dan baru dari situ manggil Fonnte buat kirim WhatsApp. Kalau gagal, Asynq otomatis retry sesuai konfigurasi, tanpa saya perlu bikin sendiri logika retry-nya.

Yang menarik justru bukan soal Asynq-nya, tapi soal integrasi ke Fonnte. Waktu saya bikin fitur kirim invoice manual lewat WhatsApp (bukan reminder terjadwal, tapi tombol yang di-klik operator), sempat muncul error seperti ini:

```
failed to send WA message: Fonnte error:
```

Perhatikan, gak ada pesan setelah "Fonnte error:". Kosong. Saya awalnya kira ini bug di kode saya sendiri, ternyata setelah saya cek ulang, struct response saya baca field `message` dari response Fonnte:

```go
type sendResponse struct {
    Status  bool   `json:"status"`
    Message string `json:"message"`
}
```

Padahal Fonnte, kalau gagal, balikin field bernama `reason`, bukan `message`. Jadi field `Message` di struct saya selalu kosong, dan errornya kelihatan seperti tidak ada informasi sama sekali, padahal Fonnte sebenarnya sudah kasih tahu alasannya.

Fix-nya:

```go
type sendResponse struct {
    Status  bool   `json:"status"`
    Reason  string `json:"reason"`
    Message string `json:"message"` // jaga-jaga kalau versi lain pakai field ini
}
```

Setelah diperbaiki, error yang muncul jadi jelas, misalnya `request invalid on disconnected device`, yang ternyata memang masalah di luar kode: device WhatsApp yang terhubung ke akun Fonnte saya lagi disconnect, dan perlu di-scan ulang QR-nya.

Pelajarannya di sini sederhana tapi sering kelewat: kalau integrasi ke API pihak ketiga kelihatan "gagal tanpa alasan", cek dulu apakah kita beneran baca field response yang benar, sebelum buru-buru curiga ke kode sendiri.

---

## Penutup

Tiga bug ini kelihatannya kecil kalau dibaca satu-satu. Tapi masing-masing punya konsekuensi yang gak main-main kalau lolos ke production: data customer yang saling ketuker, seluruh sistem registrasi yang diam-diam rusak (dan cuma separuh kepasang pas diperbaiki), dan notifikasi yang gagal terkirim tanpa ada yang sadar kenapa.

Semua ini ketemu justru karena saya sengaja luangkan waktu buat testing ulang dengan skenario yang realistis, dan yang lebih penting lagi: verifikasi langsung ke kode yang beneran jalan, bukan cuma percaya catatan "sudah diperbaiki" dari sesi kerja sebelumnya. Diskusi bareng Claude Code buat nelusurin akar masalah satu-satu ini yang bikin prosesnya jauh lebih cepat dibanding saya harus debug sendirian, tapi verifikasi akhir tetap saya yang pegang.

BengkelHub masih dalam pengembangan aktif. Masih ada roadmap yang panjang, termasuk versi Android buat pelanggan dan operator. Tapi setidaknya sekarang saya lebih yakin fondasinya cukup kokoh buat dibangun lebih jauh.

_(Part 1 ada di bagian "Tulisan Terkait" di bawah.)_
