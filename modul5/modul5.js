/* ============================================================
   modul5.js — JavaScript Sheilagank Fan Website
   
   Hampir identik dengan modul4.js!
   Perbedaannya hanya di bagian console.log terakhir
   yang menjelaskan Bootstrap digunakan sebagai framework.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. HAMBURGER MENU (Mobile Navigation)
     Sama persis dengan modul4.js — Bootstrap tidak kita pakai
     untuk hamburger ini karena kita buat sendiri seperti modul4.
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const siteNav   = document.getElementById('site-nav');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    siteNav.classList.toggle('open');

    const isOpen = siteNav.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      siteNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');

      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });


  /* ============================================================
     2. SCROLL REVEAL ANIMATION
     Sama persis dengan modul4.js
  ============================================================ */
  const revealTargets = document.querySelectorAll(
    '.article-card, .widget, .featured-article, .section-label, .timeline-item'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ============================================================
     3. ROTATE LYRIC QUOTE
     Sama persis dengan modul4.js
  ============================================================ */
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

  let currentLyricIndex = 0;

  const lyricText    = document.getElementById('lyric-text');
  const lyricSource  = document.getElementById('lyric-source');
  const btnNextLyric = document.getElementById('btn-next-lyric');

  btnNextLyric.addEventListener('click', function () {
    currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;

    lyricText.style.opacity   = '0';
    lyricSource.style.opacity = '0';

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
     Sama persis dengan modul4.js
  ============================================================ */
  const tags = document.querySelectorAll('.tag');

  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      tag.classList.toggle('active');
    });
  });


  /* ============================================================
     5. FALLBACK GAMBAR
     Sama persis dengan modul4.js
  ============================================================ */
  const cardImages = document.querySelectorAll('.card-thumb img');

  cardImages.forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      img.parentElement.style.background = 'linear-gradient(135deg, #f8e8e8, #fff8e0)';
    });
  });


  /* ============================================================
     6. ARTICLE CARD — CLICK
     Sama persis dengan modul4.js
  ============================================================ */
  const articleCards = document.querySelectorAll('.article-card');

  articleCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const title = card.querySelector('.card-title').textContent;
      console.log('📰 Membuka artikel:', title);
    });

    card.style.cursor = 'pointer';
  });


  /* ============================================================
     7. INISIALISASI
     Perbedaan dari modul4: penjelasan Bootstrap di console.log
  ============================================================ */
  console.log('🎸 Sheilagank modul5.js loaded!');
  console.log('📦 Framework: Bootstrap 5 (CSS Framework)');
  console.log('🔀 Bootstrap handle: Grid kolom (col-lg-8/4, col-md-6), d-flex, gap, justify-content');
  console.log('✏️  modul5.css handle: warna brand, komponen kustom, override Bootstrap');

}); // end DOMContentLoaded