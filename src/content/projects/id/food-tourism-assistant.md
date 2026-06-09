# Overview

Food Tourism Assistant Indonesia adalah aplikasi berbasis Streamlit yang membantu turis asing menjelajahi kuliner Indonesia melalui AI. Pengguna cukup upload foto makanan, dan sistem akan mengidentifikasi hidangan tersebut sekaligus memberikan penjelasan lengkap tentang bahan, profil rasa, dan konteks budaya di baliknya.

# The Problem

Wisatawan asing sering kesulitan memahami makanan Indonesia  nama yang asing, bahan yang tidak familiar, dan cara makan yang berbeda. App ini hadir sebagai "culinary guide" personal yang bisa diakses kapan saja.

# Tech Stack

- **Language**: Python
- **Framework**: Streamlit
- **ML Model**: TensorFlow Lite (TFLite) untuk image classification
- **Data**: NumPy + curated JSON database untuk food knowledge base
- **Deployment**: Streamlit Community Cloud

# How It Works

1. Pengguna upload foto makanan
2. Model TFLite mengklasifikasi gambar dan mengidentifikasi jenis makanan
3. Sistem mencari data dari JSON database yang berisi info lengkap tiap hidangan
4. Chatbot interaktif menjelaskan bahan-bahan, profil rasa, dan konteks budaya

# Key Features

- Image recognition menggunakan model TFLite yang di-optimize untuk mobile/edge
- Knowledge base berisi informasi kuliner Indonesia yang dikurasi
- Antarmuka chatbot interaktif untuk tanya-jawab lanjutan
- Deployment gratis via Streamlit Community Cloud

# What I Learned

Project ini mengajarkan saya workflow end-to-end machine learning  dari training, optimasi model ke TFLite, sampai integrasi ke aplikasi web. Juga belajar pentingnya **knowledge base yang terstruktur** sebagai backbone chatbot, bukan hanya mengandalkan model bahasa mentah.
