# WebSMS Telegram Bot

Ini adalah bot Telegram sederhana yang dibangun dengan Node.js menggunakan pustaka `node-telegram-bot-api` dan Axios untuk membuat permintaan API ke WebSMS. Bot ini memungkinkan pengguna mengirim pesan SMS dengan berinteraksi melalui obrolan Telegram.

![Gambar](https://hosting.rasitechchannel.my.id/sc/file_135.jpg)

## Instalasi

### Node.js

1. **Windows:**

   - Unduh dan instal Node.js dari [situs resmi Node.js](https://nodejs.org/).
   - Ikuti panduan instalasi yang disediakan pada instalator.

2. **Linux (menggunakan NVM):**

   - Unduh dan instal NVM (Node Version Manager) dengan menjalankan perintah berikut:

     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
     ```

     atau

     ```bash
     wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
     ```

   - Tutup dan buka kembali terminal atau jalankan perintah:

     ```bash
     source ~/.bashrc
     ```

   - Instal versi Node.js yang diinginkan dengan NVM:

     ```bash
     nvm install node
     ```

   - Atur versi Node.js yang diinstal sebagai default:

     ```bash
     nvm alias default node
     ```

### Projek Bot

1. **Klon repositori:**

   ```bash
   git clone https://github.com/rasitechchannel/RasiTechSMSBot.git
   ```

2. **Instal dependensi:**

   ```bash
   cd RasiTechSMSBot
   npm install
   ```

3. **Konfigurasi Token Bot Telegram:**

   Buka file `index.js` dan gantilah placeholder `YOUR_BOT_TOKEN` dengan Token Bot Telegram Anda yang sebenarnya.

   ```javascript
   const token = 'YOUR_BOT_TOKEN';
   ```

4. **Konfigurasi Token WebSMS:**

   - Buka [websms.co.id](https://websms.co.id).
   - Login atau register akun.
   - Masuk ke menu "Dokumentasi API".
   - Anda akan menemukan TOKEN API di sana. Gantilah placeholder `YOUR_WEBSMS_TOKEN` dengan token API WebSMS Anda yang sebenarnya.

   ```javascript
   const TOKEN_KAMU = 'YOUR_WEBSMS_TOKEN';
   ```

5. **Jalankan Bot:**

   ```bash
   node index.js
   ```

   Bot Anda seharusnya sekarang berjalan dan siap menerima perintah.

## Penggunaan

1. Mulai bot dengan mengirimkan perintah `/start` di obrolan Telegram Anda.

2. Gunakan perintah `/addsaldo` untuk menambahkan saldo secara manual ke pengguna tertentu.

   ```
   /addsaldo USERID SALDO
   ```

3. Gunakan perintah `/send` untuk memulai proses pengiriman SMS.

4. Ikuti petunjuk untuk memasukkan nomor penerima dan pesan.

5. Konfirmasikan pesan dengan mengklik tombol "Kirim".

## Catatan

- Pastikan Node.js terinstal di mesin Anda sebelum menjalankan bot.
- Untuk Linux, pastikan Anda telah menginstal NVM dan menggunakan versi Node.js yang sesuai.

## About
Script ini 100% dibuat oleh RasiTech jadi jangan lupa untuk mencantumkan nama creator pada bot anda.

Share hasil bot anda pada komentar postingan telegram ini
https://t.me/RasiTechChannel1/6606
