# Lumora – Halaman Sign In

Proyek HTML5 + CSS3 murni (tanpa framework) untuk halaman masuk (Sign In),
dilengkapi JavaScript eksternal untuk simulasi proses sign in di sisi klien.

## Struktur Direktori

```
project-login/
├── index.html            # Halaman Sign In
├── dashboard.html         # Halaman setelah berhasil masuk
├── css/
│   ├── style.css          # Style utama (token, layout, komponen form)
│   └── dashboard.css      # Style khusus halaman dashboard
├── js/
│   ├── script.js           # Logika form Sign In (validasi + demo auth)
│   └── dashboard.js        # Guard akses + Sign Out pada dashboard
├── assets/
│   ├── images/             # logo.png, illustration.jpg
│   └── icons/               # google.svg
└── README.md
```

Semua CSS dan JS ditulis secara **eksternal** (tidak ada `style=""` inline
maupun `<script>` inline berisi logika), sesuai ketentuan.

## Akun Demo

Karena ini proyek statis tanpa backend/database sungguhan, kredensial
berikut dipakai untuk mencoba alur Sign In (tersimpan otomatis di
`localStorage` saat halaman pertama kali dibuka):

| Email              | Username | Password   |
|--------------------|----------|------------|
| demo@lumora.com    | demo     | Lumora123  |

> Catatan: ini hanya simulasi untuk keperluan belajar/demo. Jangan jadikan
> pola ini untuk menyimpan password sungguhan — autentikasi production
> wajib divalidasi di server.

## Menjalankan di Server Lokal (Visual Studio Code)

Buka folder `project-login` di VS Code, lalu pilih salah satu cara berikut:

**Opsi A — Ekstensi Live Server (disarankan)**
1. Pasang ekstensi **Live Server** (oleh Ritwick Dey) dari Extensions Marketplace.
2. Klik kanan `index.html` → **Open with Live Server**.
3. Browser otomatis terbuka di `http://127.0.0.1:5500/index.html`.

**Opsi B — Python (tanpa instal ekstensi)**
```bash
cd project-login
python -m http.server 5500
```
Lalu buka `http://localhost:5500` di browser.

**Opsi C — Node.js**
```bash
cd project-login
npx serve .
```

## Menghubungkan ke GitHub

Jalankan perintah berikut di terminal VS Code, di dalam folder `project-login`:

```bash
git init
git add .
git commit -m "Initial commit: Lumora sign in page"
git branch -M main
git remote add origin https://github.com/<username>/<nama-repo>.git
git push -u origin main
```

Ganti `<username>` dan `<nama-repo>` sesuai repository GitHub yang sudah dibuat.
Setelah repo terhubung, perubahan berikutnya cukup:

```bash
git add .
git commit -m "pesan commit"
git push
```

## Catatan Aksesibilitas (WCAG 2.2)

File `index.html` sudah menyertakan sejumlah penerapan WCAG 2.2 (skip link,
focus visible, label eksplisit, target sentuh ≥44px, dukungan
`prefers-reduced-motion` dan `forced-colors`) — lihat komentar di dalam
`index.html` dan `css/style.css` untuk detail tiap poin.
