# Rebuild Project MSIB dari Nol: Cerita di Balik BengkelHub

![Tampilan landing page BengkelHub](/img/blog/bengkelhub/mockup-landing.png)

Ini bukan cerita sukses yang rapi. Ini cerita tentang project yang berantakan, tim yang buyar, dan keputusan untuk mulai ulang setelah semuanya selesai.

---

## Awalnya: Project MORE di MSIB Semester 6

Waktu MSIB semester 6, saya ikut program Infinite Learning dengan penempatan di Kinema Systrans Multimedia. Projectnya: bikin aplikasi manajemen bengkel berbasis Android bernama MORE (Mobile Bengkel).

![Screenshot aplikasi MORE yang lama, atau commit history repo GitHub sebagai bukti visual](/img/blog/bengkelhub/gambar2-more-app.png)

Tim kami dibagi dua. Tim Android, yang saya masuk di dalamnya, pegang aplikasi mobile pakai Kotlin dan Jetpack Compose. Tim Web pegang backend pakai ExpressJS. Kedengarannya terstruktur. Kenyataannya tidak.

Tim Web tidak pernah benar-benar share progress ke kami. Tidak ada dokumentasi API, tidak ada update rutin, tidak ada komunikasi yang konsisten. Saya di sisi Android harus menebak-nebak struktur data, atau bikin workaround sendiri. Akhirnya sisi Android berjalan hampir sepenuhnya independen dengan Firebase sebagai backend sementara.

Belum lagi soal Kotlin dan Jetpack Compose yang waktu itu belum benar-benar saya kuasai. Saya belajar sambil build, dengan deadline yang terus jalan.

---

## Hari Presentasi

Di tengah pengerjaan, beberapa anggota tim mulai menghilang. Tidak ada kabar, tidak ada kontribusi. Yang tersisa jalan sebisanya.

Pas hari presentasi, fitur inti belum bisa didemoin dengan normal. Kami tetap maju. Menjelaskan apa yang ada, menutupi apa yang tidak ada. Presentasi selesai, nilai keluar, program berakhir.

Tapi ada yang mengganjal. Bukan soal nilainya. Idenya bagus. Masalah yang mau diselesaikan nyata. Aplikasi manajemen bengkel yang proper memang dibutuhkan, terutama untuk bengkel-bengkel kecil yang masih pakai buku catatan atau WhatsApp untuk catat servis.

Sayang kalau berhenti di situ.

---

## Keputusan untuk Rebuild

Setelah wisuda, di sela-sela cari kerja, saya putuskan untuk rebuild project ini dari nol. Bukan karena ada yang minta. Bukan karena ada tenggat waktu. Murni karena idenya belum selesai.

Kali ini saya yang pegang semuanya. Frontend dan backend. Tidak ada tim Web yang tidak komunikasi, tidak ada ketergantungan pada orang lain yang tiba-tiba menghilang.

---

## Kenapa Tidak Lanjut Pakai Stack Lama?

Pertanyaan pertama yang muncul: lanjut pakai Kotlin + Firebase, atau mulai dari stack yang berbeda?

Saya pilih mulai dari stack berbeda, dengan alasan yang cukup jelas:

**Firebase tidak cocok untuk multi-tenant.** Kalau tujuannya satu platform untuk banyak bengkel, saya butuh kontrol penuh atas isolasi data per bengkel. Firebase bisa, tapi modelnya tidak natural untuk use case ini.

**Saya mau platform, bukan aplikasi untuk satu bengkel.** MORE awalnya dirancang sebagai aplikasi mobile untuk satu bengkel saja. BengkelHub dirancang dari awal sebagai platform multi-tenant: satu sistem, banyak bengkel, dengan arsitektur yang benar-benar memisahkan data tiap tenant.

**Saya mau kuasai stack yang relevan untuk karir.** Kotlin dan Android development valid, tapi saya lebih tertarik ke arah Fullstack dan Backend. Ini kesempatan untuk build sesuatu yang nyata dengan tech stack yang ingin saya perdalam.

---

## Kenapa Go untuk Backend?

Ini yang sering ditanya. Kenapa tidak Node.js saja, yang lebih familiar?

Jujur, saya pertimbangkan Node.js dengan ExpressJS atau Hono. Saya sudah pernah pakai keduanya. Tapi ada beberapa alasan saya akhirnya pilih Go:

![Diagram arsitektur BengkelHub: Next.js frontend, Go Fiber backend, PostgreSQL, dan Asynq + Redis untuk background job](/img/blog/bengkelhub/gambar3-arsitektur.png)

**Performa untuk concurrent request.** Bengkel yang ramai bisa punya banyak booking masuk bersamaan. Go menangani concurrency dengan goroutine yang jauh lebih ringan dibanding thread Node.js.

**Background job yang bersih.** Saya butuh sistem notifikasi WhatsApp otomatis yang jalan di background, terpisah dari request utama, misalnya reminder booking terjadwal. Di Go, saya pakai Asynq dengan Redis sebagai message queue. Worker-nya jalan sebagai proses terpisah, bukan numpang di event loop yang sama.

**Belajar sesuatu yang baru.** Ini valid juga sebagai alasan. Build project nyata adalah cara terbaik untuk belajar bahasa baru.

Backend akhirnya pakai Go dengan Fiber sebagai framework, GORM untuk ORM, PostgreSQL, dan Asynq + Redis untuk background job. Frontend-nya Next.js, murni konsumsi REST API ke backend, tidak pegang database sama sekali.

---

## Arsitektur Multi-Tenant

Ini salah satu keputusan desain yang paling berpengaruh di BengkelHub.

![Diagram arsitektur multi-tenant BengkelHub: satu instance melayani banyak bengkel, data terisolasi per workshop_id](/img/blog/bengkelhub/gambar4-multitenant.png)

Multi-tenant artinya satu instance aplikasi melayani banyak bengkel sekaligus, tapi data tiap bengkel terisolasi penuh. Pelanggan bengkel A tidak bisa lihat data bengkel B, meskipun mereka pakai sistem yang sama.

Implementasinya di BengkelHub cukup straightforward: setiap entitas data (pelanggan, kendaraan, servis, invoice) punya `workshop_id`. Setiap request dari operator selalu divalidasi terhadap kepemilikan workshop itu, bukan sekadar dicek apakah dia operator atau bukan. Kalau `workshop_id` di data yang diminta tidak cocok dengan workshop milik operator yang login, request ditolak.

Auth-nya sendiri saya bikin satu sistem JWT yang sama untuk operator maupun pelanggan, cuma dibedakan lewat field role di dalam token. Jadi bukan dua sistem login yang berjalan paralel, tapi satu alur otentikasi yang sama, dengan pengecekan role dan kepemilikan workshop di setiap endpoint yang butuh.

Ini yang membedakan BengkelHub dari aplikasi bengkel biasa. Satu deployment, banyak bengkel, data yang benar-benar terpisah.

---

## Claude Code sebagai Pair Programmer

Satu hal yang benar-benar mengubah kecepatan saya build adalah Claude Code.

Ini bukan soal Claude yang nulis kode untuk saya. Lebih ke arah punya teman diskusi yang selalu ada. Waktu saya stuck di logika auth JWT, saya bisa diskusikan alurnya dulu sebelum nulis satu baris pun. Waktu ada bug di pencocokan data kendaraan antara booking online dan walk-in, saya bisa jelaskan problemnya dan iterasi solusinya bareng, sampai ketemu akar masalahnya.

Kecepatan build saya naik signifikan dibanding kalau harus bolak-balik Stack Overflow atau dokumentasi sendirian.

---

## Hasil Sekarang

BengkelHub sekarang masih dalam pengembangan aktif, sebagai platform multi-tenant manajemen bengkel dengan dua sisi:

{{GALLERY:/img/blog/bengkelhub/gambar5-hasil.png,/img/blog/bengkelhub/gambar5-hasil-2.png,/img/blog/bengkelhub/gambar5-hasil-3.png, /img/blog/bengkelhub/gambar5-hasil-4.png}}

**Operator bengkel** punya dashboard untuk kelola pelanggan dan kendaraan, proses servis dari keluhan sampai selesai, generate invoice otomatis dengan kalkulasi pajak dan diskon, catat pembayaran (Cash, Transfer, atau QRIS), dan terima booking dari pelanggan.

**Pelanggan** bisa booking online atau datang langsung (walk-in), cari bengkel terdekat lewat geolocation, bayar online via Midtrans, dan dapat notifikasi WhatsApp otomatis di tiap tahap penting: booking dikonfirmasi, servis selesai, invoice terbit.

Masih banyak yang belum sempurna, dan belum saya deploy buat dipakai bengkel beneran. Tapi ini sudah jauh lebih baik dari demo setengah jadi dua tahun lalu.

---

Di Part 2, saya cerita soal tantangan teknis yang lebih spesifik: kenapa pencocokan kendaraan berdasarkan plat nomor saja itu berbahaya dan hampir bikin riwayat servis satu customer nyasar ke customer lain, kenapa validasi nomor HP yang kelihatannya sepele ternyata bisa bikin semua orang gagal daftar, dan bagaimana background job dengan Asynq bekerja di balik notifikasi WhatsApp.

_(Part 2 ada di bagian "Tulisan Terkait" di bawah.)_
