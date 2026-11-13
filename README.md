# Kelas 5.1 Website 🩵

Website resmi Kelas 5.1 — **One Class, One Story, Nineteen Memories**.

Desain aesthetic: baby blue, putih, navy. Responsive, mobile-friendly, lightweight, dengan animasi lembut.

## Fitur Utama

- **Home**: Welcome hero, live clock, countdown, random quote, mini announcement, animasi awan & bintang
- **20 Anggota**: Kartu profil lengkap (nama, nickname, absen, motto, hobi, makanan/minuman favorit, warna, fun fact, cita-cita, quote, favorite moment). Search + filter absen. Modal detail.
- **Jadwal Pelajaran**: Senin–Jumat sesuai data
- **Jadwal Piket**: Senin–Jumat dengan nama anggota
- **Class Memories**: Polaroid gallery, timeline, tabs
- **Birthday Corner**: Daftar ulang tahun + pengingat dekat
- **Mood of The Class**: Pilih emoji mood (tersimpan di localStorage)
- **Who Am I?**: Game tebak teman dari petunjuk
- **Class Bingo**: Bingo kebiasaan kelas
- **Digital Guestbook**: Tinggalkan pesan (localStorage)
- **Jar of Memories**: Pesan kenangan acak
- **Musik Latar**: Player play/pause + mute. Lagu di-loop. Tombol ENTER CLASS jika autoplay diblokir browser.
- Loading screen, scroll progress, back-to-top, sidebar, bottom nav (mobile), text size control, surprise me, greeting otomatis.

## Struktur File

```
class51-website/
├── index.html
├── css/style.css
├── js/app.js
├── data/members.json
├── assets/          ← taruh favicon, og-image, atau audio di sini
└── README.md
```

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub (misalnya `class51` atau `kelas-5-1`).
2. Upload semua isi folder ini ke root repository (atau ke folder docs).
3. Di Settings → Pages → Source: pilih branch `main` (atau `master`) dan folder `/ (root)`.
4. Tunggu beberapa menit, website akan live di `https://username.github.io/repo-name/`.

### Catatan Audio ("Kita" — Sheila On 7)

Karena hak cipta, file audio resmi **tidak disertakan**.

Cara menambahkan:
1. Siapkan file MP3 yang legal (misalnya kamu beli/unduh resmi lalu convert, atau gunakan versi yang diizinkan).
2. Letakkan di `assets/kita.mp3`.
3. Di `index.html`, ganti `src` pada tag `<audio>`:

```html
<source src="assets/kita.mp3" type="audio/mpeg" />
```

Saat ini menggunakan track demo royalty-free agar player berfungsi. Ganti dengan file resmi sebelum publish publik jika memungkinkan.

### Favicon & OG Image

Favicon sudah pakai emoji SVG data-URI (🩵).  
Untuk OG image yang lebih bagus, buat gambar 1200×630 lalu update meta `og:image` di `index.html`.

### Data Anggota

Semua data profil ada di `data/members.json`.  
Nama, nickname, email diambil dari Google Sheet yang diberikan.  
Data lain (hobi, motto, dll) dibuat contoh agar website langsung hidup — silakan edit sesuai kenyataan anggota.

Wali kelas ditampilkan sebagai contoh (Bu Aisyah yang suka kuning). Ganti sesuai data asli.

## Teknologi

- Pure HTML + CSS + Vanilla JS
- Tidak ada framework berat → cepat & ringan
- LocalStorage untuk guestbook & mood
- Responsive (mobile-first) + bottom navigation

## Customization Cepat

- Warna: edit CSS variables di `:root` (`css/style.css`)
- Quote kelas: array `quotes` di `js/app.js`
- Countdown target: ubah tanggal di fungsi `updateCountdown`
- Announcement: edit HTML di bagian `#announcement`

---

Dibuat dengan 🩵 untuk Kelas 5.1  
*One Class, One Story, Nineteen Memories*
