# Lex Tributaria Indonesia — Artikel Ilmiah & Blog Akademik Hukum Perpajakan

**Penulis:** Revandino Afgan Alexa (Program Studi Ilmu Hukum, Universitas Sebelas Maret)

Paket situs web statis siap *deploy* ke **Vercel (`vercel.app`)**.

## Struktur Folder
```text
artikel-hukum-perpajakan/
├── index.html      # Halaman utama artikel ilmiah dengan identitas penulis lengkap
├── style.css       # Stylesheet editorial akademik responsif (Light/Dark & Print)
├── script.js       # Fitur interaktif (ScrollSpy TOC, progress bar, pengatur font, sitasi)
├── vercel.json     # Konfigurasi routing & header keamanan Vercel
└── README.md       # Panduan deployment
```

## Cara Upload / Hosting ke Vercel
1. **Ekstrak** file ZIP ini ke dalam satu folder (`artikel-hukum-perpajakan`).
2. **Metode A — Melalui GitHub (Direkomendasikan):**
   - Buat repositori baru di GitHub dan unggah seluruh isi folder (`index.html`, `style.css`, `script.js`, `vercel.json`).
   - Buka [vercel.com](https://vercel.com), klik **Add New Project**, pilih repositori tersebut, biarkan pengaturan *Framework Preset* di **Other**, lalu klik **Deploy**.
3. **Metode B — Melalui Vercel CLI (Langsung dari Terminal/VS Code):**
   - Buka terminal di dalam folder hasil ekstrak.
   - Jalankan perintah `npx vercel --prod` dan ikuti petunjuk login hingga URL `.vercel.app` aktif.
