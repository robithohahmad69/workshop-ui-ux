/* ============================================================
   SHEILAGANK – CSS Grid & Flexbox Layout
   modul4.js  |  Pure JavaScript – No Framework
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. HAMBURGER MENU (Mobile Navigation)
     ============================================================
     Fungsi: toggle menu navigasi di layar kecil.
     - Klik hamburger → tambah/hapus class "open" di nav & tombol
     - Klik link nav   → tutup menu otomatis
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const siteNav   = document.getElementById('site-nav');

  // Toggle buka/tutup menu
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    siteNav.classList.toggle('open');

    // Update aria-expanded untuk aksesibilitas
    const isOpen = siteNav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Tutup menu saat link diklik (pengalaman mobile yang baik)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      siteNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');

      // Update active link
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });


  /* ============================================================
     2. SCROLL REVEAL ANIMATION
     ============================================================
     Fungsi: elemen masuk dengan animasi saat di-scroll ke viewport.
     Menggunakan IntersectionObserver — lebih efisien dari addEventListener scroll.

     IntersectionObserver = API browser yang memantau kapan elemen
     masuk atau keluar dari area tampilan (viewport).
  ============================================================ */

  // Pilih elemen yang akan diberi animasi reveal
  const revealTargets = document.querySelectorAll(
    '.article-card, .widget, .featured-article, .section-label, .timeline-item'
  );

  // Tambahkan class 'reveal' ke setiap target
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  // Buat observer
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Elemen masuk viewport → tampilkan dengan animasi
          entry.target.classList.add('visible');
          // Hentikan observasi elemen ini (animasi hanya 1x)
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,               // Trigger saat 12% elemen terlihat
      rootMargin: '0px 0px -40px 0px' // Sedikit sebelum elemen benar-benar terlihat
    }
  );

  // Mulai observasi setiap elemen
  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ============================================================
     3. ROTATE LYRIC QUOTE
     ============================================================
     Fungsi: tombol "Lirik Berikutnya" mengganti kutipan lirik
     secara bergantian dari array daftar lirik.
  ============================================================ */

  // Daftar kutipan lirik SO7
  const lyrics = [
    {
      text: '"Lupakanlah saja diriku Bila itu bisa membuatmu kembali bersinar Dan berpijar seperti dulu kala Caci maki saja diriku Bila itu bisa membuatmu kembali bersinar Dan berpijar seperti dulu kala"',
      source: '— Dan, Album SO7 (1999)'
    },
    {
      text: '"Kupetik bintang untuk kau simpan Cahayanya tenang, berikan kau perlindungan"',
      source: '— Melompat Lebih Tinggi, 07 Des (2002)'
    },
    {
      text: '"Mungkin diriku masih ingin bersama kalian, Mungkin jiwaku masih haus sanjungan kalian"',
      source: '— Sebuah Kisah Klasik, Kisah Klasik (2000)'
    },
    {
      text: '"Slamat tidur kekasih gelapku oh Sephia..."',
      source: '— Sephia, Kisah Klasik (2000)'
    },
    {
      text: '"Kita adalah milik hari ini, bukan untuk selamanya..."',
      source: '— Kita, Album SO7 (1999)'
    }
  ];

  let currentLyricIndex = 0; // Indeks lirik yang sedang ditampilkan

  const lyricText   = document.getElementById('lyric-text');
  const lyricSource = document.getElementById('lyric-source');
  const btnNextLyric = document.getElementById('btn-next-lyric');

  btnNextLyric.addEventListener('click', function () {
    // Pindah ke lirik berikutnya, kembali ke awal jika sudah habis
    currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;

    // Efek fade: sembunyikan dulu, ganti teks, tampilkan lagi
    lyricText.style.opacity   = '0';
    lyricSource.style.opacity = '0';

    // Setelah 200ms (fade out), ganti teks dan fade in
    setTimeout(function () {
      lyricText.textContent   = lyrics[currentLyricIndex].text;
      lyricSource.textContent = lyrics[currentLyricIndex].source;

      lyricText.style.transition   = 'opacity 0.4s ease';
      lyricSource.style.transition = 'opacity 0.4s ease';
      lyricText.style.opacity      = '1';
      lyricSource.style.opacity    = '1';
    }, 200);
  });


  /* ============================================================
     4. TAG CLOUD — TOGGLE ACTIVE
     ============================================================
     Fungsi: klik tag untuk mengaktifkan/menonaktifkan filter topik.
     Tag yang aktif diberi style berbeda (class "active").
  ============================================================ */

  const tags = document.querySelectorAll('.tag');

  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      // Toggle class active pada tag yang diklik
      tag.classList.toggle('active');
    });
  });


  /* ============================================================
     5. FALLBACK GAMBAR
     ============================================================
     Fungsi: jika gambar gagal dimuat (broken link, dsb),
     tampilkan background placeholder agar tampilan tetap rapi.
  ============================================================ */

  const cardImages = document.querySelectorAll('.card-thumb img');

  cardImages.forEach(function (img) {
    img.addEventListener('error', function () {
      // Sembunyikan gambar yang gagal
      img.style.display = 'none';
      // Beri warna fallback pada container-nya
      img.parentElement.style.background = 'linear-gradient(135deg, #f8e8e8, #fff8e0)';
    });
  });


  /* ============================================================
     6. ARTICLE CARD — HOVER INFO (opsional interaksi kecil)
     ============================================================
     Fungsi: tampilkan console log info artikel saat diklik
     (simulasi navigasi ke halaman artikel).
  ============================================================ */

  const articleCards = document.querySelectorAll('.article-card');

  articleCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const title = card.querySelector('.card-title').textContent;
      console.log('📰 Membuka artikel:', title);
      // Di implementasi nyata: window.location.href = '/artikel/slug';
    });

    // Tambahkan cursor pointer supaya terasa clickable
    card.style.cursor = 'pointer';
  });


  /* ============================================================
     7. INISIALISASI — Jalankan saat halaman pertama kali dimuat
  ============================================================ */
  console.log('🎸 Sheilagank modul4.js loaded!');
  console.log('📐 Layout: CSS Grid (page-grid, articles-grid, footer-grid)');
  console.log('🔀 Flexbox: header-inner, logo, site-nav, sidebar, card-meta, dll.');

}); // end DOMContentLoaded