# Di Balik Layar Skripsi: Membangun Chatbot Pengenalan Makanan Khas Indonesia dengan MobileNetV2

![Tampilan web Chatbot](/img/blog/food/food.png)

Skripsi saya berjudul _Implementasi Transfer Learning MobileNetV2 pada Chatbot Klasifikasi dan Pengenalan Makanan Khas Indonesia Berbahasa Inggris_, sidang pada 20 September 2025. Di paper, semuanya kelihatan rapi: latar belakang, rumusan masalah, metode, hasil, kesimpulan. Tapi seperti kebanyakan skripsi, ada banyak proses coba-salah yang tidak masuk ke dokumen formal. Tulisan ini isinya itu, tantangan yang saya hadapi dan keterbatasan yang masih ada.

---

## Masalah yang Ingin Diselesaikan

Wisatawan asing sering kesulitan mengenali makanan khas Indonesia. Bukan cuma soal nama, tapi juga bahan, rasa, dan konteks budaya di baliknya. Informasi yang tersedia pun jarang ada dalam bahasa Inggris yang mudah dipahami. Dari situ saya berpikir, kalau ada sistem yang bisa mengenali makanan dari foto lalu menjelaskannya secara interaktif, itu bisa membantu banyak orang.

Solusinya: bangun model klasifikasi citra dengan CNN, transfer learning dari MobileNetV2, lalu integrasikan ke chatbot berbahasa Inggris.

## Tantangan #1: Dataset yang Tidak Seimbang

Dataset yang saya kumpulkan awalnya terdiri dari 22 kelas makanan, masing-masing 150 citra, total 3.300 gambar. Tapi setelah dievaluasi, distribusinya tidak serapi itu. Beberapa kelas seperti ayam goreng dan bakso punya lebih dari 100 citra, sementara kelas lain seperti batagor dan gado-gado cuma punya sedikit.

Ketidakseimbangan ini berdampak langsung. Model jadi lebih akurat pada kelas dengan data banyak, tapi kurang optimal di kelas dengan data terbatas. Akhirnya saya turunkan ke 20 kelas dengan sekitar 150 citra per kelas untuk menjaga dataset tetap relatif seimbang, meski ukurannya jadi lebih kecil dari rencana awal.

## Tantangan #2: Overfitting yang Susah Dihindari

Dengan dataset sekecil itu, overfitting jadi masalah yang cukup berat. Selama training, akurasi training terus naik sampai 83%, tapi akurasi validasi stagnan di kisaran 79%. Loss training terus menurun, sementara validation loss relatif lebih tinggi. Tanda klasik overfitting: model menghafal data training, tapi kurang bisa generalisasi ke data baru.

Beberapa langkah yang saya ambil untuk menekan ini:

- **Dropout rate 0,5** di layer dense, supaya model tidak terlalu bergantung pada kombinasi neuron tertentu
- **Regularisasi L2** untuk menahan bobot model agar tidak tumbuh terlalu besar
- **Learning rate kecil (1e-4)**, karena sebagian besar bobot MobileNetV2 sudah terlatih dan saya tidak mau mengganggunya dengan perubahan yang terlalu agresif
- **Feature extraction**, bukan full fine-tuning, jadi dari total 2,42 juta parameter, cuma sekitar 166 ribu (6,8%) yang trainable, sisanya (93,2%) dibekukan dari bobot pretrained

Langkah-langkah ini membantu, tapi tidak sepenuhnya menghilangkan gap antara training dan validation accuracy. Ini jadi salah satu keterbatasan yang saya akui terbuka di kesimpulan.

## Tantangan #3: Makanan yang Mirip Secara Visual

Ini yang paling menarik menurut saya. Model paling sering keliru bukan karena arsitekturnya jelek, tapi karena beberapa makanan memang mirip secara visual.

Contoh nyata dari hasil uji coba:

- **Mie ayam terdeteksi sebagai mie goreng**, karena saya tidak punya dataset khusus untuk mie ayam, jadi CNN mengklasifikasikannya ke kategori paling mirip
- **Gudeg salah dikenali sebagai rendang**, karena warna dominan cokelat gelap dan tekstur keduanya mirip
- Faktor pencahayaan, sudut pengambilan gambar, dan variasi cara penyajian juga memperbesar peluang kesalahan

Dari confusion matrix, mayoritas kelas seperti bubur, sate, dan soto teridentifikasi dengan baik (precision dan recall di atas 0,9). Tapi kelas dengan data terbatas atau kemiripan visual tinggi, seperti gudeg dan nasi padang, jadi sumber kesalahan utama. Akurasi keseluruhan model ada di angka 80%, dengan macro avg F1-score 77% dan weighted avg F1-score 80%.

## Keterbatasan yang Masih Ada

Ada beberapa hal yang saya sadari belum sempurna, dan sengaja saya tuliskan terbuka di bagian kesimpulan skripsi:

1. **Dataset relatif kecil.** 3.000 gambar untuk 20 kelas (sekitar 150 gambar per kelas) tidak sepenuhnya mewakili variasi visual tiap kelas.
2. **Tidak ada augmentasi data tingkat lanjut.** Dataset juga tidak diperluas dari sumber yang lebih beragam.
3. **Fine-tuning terbatas.** Saya tidak membandingkan MobileNetV2 dengan arsitektur lain seperti EfficientNet atau ResNet, padahal dari penelitian terdahulu yang saya kaji, EfficientNet bisa mencapai akurasi di atas 96% meski dengan biaya komputasi lebih tinggi.
4. **Model murni berbasis citra.** Tidak ada feature fusion dengan metadata (misalnya bahan utama atau deskripsi makanan), dan tidak ada anotasi bounding box untuk membantu model fokus ke bagian penting dari objek makanan.
5. **Evaluasi per-class belum mendalam.** Saya belum menganalisis secara rinci pola kesalahan tiap kelas satu per satu.

## Kenapa Saya Tuliskan Ini Secara Terbuka

Salah satu pelajaran terbesar dari skripsi ini bukan soal MobileNetV2 atau CRISP-DM, tapi soal realita bahwa model yang bagus di atas kertas belum tentu langsung generalisasi baik ke dunia nyata. Dataset kecil, kelas yang mirip secara visual, dan waktu yang terbatas untuk eksperimen itu semua hal yang biasa terjadi di riset skala skripsi, dan menuliskannya secara jujur menurut saya lebih berguna daripada menutupinya.

Kalau kamu mau coba chatbot-nya langsung, aplikasinya sudah live di [chatbot-food-tourism.streamlit.app](https://chatbot-food-tourism.streamlit.app/).

---

_Skripsi: Implementasi Transfer Learning MobileNetV2 pada Chatbot Klasifikasi dan Pengenalan Makanan Khas Indonesia Berbahasa Inggris. Naufal Andresya Kholish, Fakultas Teknologi Industri, Universitas Gunadarma, 2025._
