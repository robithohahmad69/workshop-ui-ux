

/* ============================================================
   1. HAMBURGER MENU (Mobile Navigation)
   ============================================================ */
   document.addEventListener('DOMContentLoaded', function () {
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
}

hamburger.addEventListener('click', toggleMenu);

// Tutup menu saat link diklik (mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
});


/* ============================================================
   2. ACTIVE NAV LINK (Highlight saat scroll ke section)
   ============================================================ */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);


/* ============================================================
   3. HEADER SCROLLED STATE
   Tambah class 'scrolled' saat user scroll ke bawah
   ============================================================ */
const header = document.getElementById('header');

function updateHeaderStyle() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeaderStyle);


/* ============================================================
   4. SCROLL REVEAL ANIMATION
   Elemen muncul dengan animasi saat di-scroll ke
   ============================================================ */

// Daftar elemen yang akan diberi efek reveal
const revealTargets = document.querySelectorAll(
  '.about-card, .song-card, .album-card, .section-header, .about-story, .form-wrapper'
);

// Tambahkan class 'reveal' ke setiap elemen target
revealTargets.forEach(el => el.classList.add('reveal'));

// Buat IntersectionObserver untuk memantau kapan elemen masuk viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');   // Trigger animasi
        revealObserver.unobserve(entry.target);  // Hentikan observasi (1x)
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealTargets.forEach(el => revealObserver.observe(el));


/* ============================================================
   5. FALLBACK GAMBAR ALBUM
   Jika gambar Wikipedia gagal dimuat, tampilkan placeholder
   ============================================================ */

// Tangani error loading gambar cover album
const albumCovers = document.querySelectorAll('.album-cover img, .song-thumb img');
albumCovers.forEach(img => {
  img.addEventListener('error', function () {
    // Tandai parent container dengan class no-img (CSS akan handle tampilan)
    this.parentElement.classList.add('no-img');
    this.style.display = 'none';

    // Jika ada elemen fallback vinyl, tampilkan
    const fallback = this.parentElement.querySelector('.album-vinyl-fallback');
    if (fallback) fallback.style.display = 'flex';
  });
});


/* ============================================================
   6. FORM HANDLING
   ============================================================ */
const form       = document.getElementById('sheilagankForm');
const formResult = document.getElementById('formResult');
const submitBtn  = document.getElementById('submitBtn');

// --- Fungsi: Tampilkan error pada field tertentu ---
function showError(inputId, errorId, message) {
  document.getElementById(inputId).classList.add('invalid');
  document.getElementById(errorId).textContent = message;
}

// --- Fungsi: Reset semua pesan error ---
function clearErrors() {
  form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('invalid'));
  form.querySelectorAll('.error-msg').forEach(el => (el.textContent = ''));
}

// --- Fungsi: Validasi semua field ---
// Mengembalikan true jika semua valid
function validateForm(name, song, album, message) {
  let isValid = true;
  clearErrors(); // Reset dulu sebelum validasi ulang

  if (!name.trim()) {
    showError('inputName', 'errorName', 'Nama tidak boleh kosong.');
    isValid = false;
  }
  if (!song.trim()) {
    showError('inputSong', 'errorSong', 'Lagu favorit tidak boleh kosong.');
    isValid = false;
  }
  if (!album.trim()) {
    showError('inputAlbum', 'errorAlbum', 'Album favorit tidak boleh kosong.');
    isValid = false;
  }
  if (!message.trim()) {
    showError('inputMessage', 'errorMessage', 'Pesan tidak boleh kosong.');
    isValid = false;
  }

  return isValid;
}

// --- Fungsi: Escape HTML (mencegah XSS) ---
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// --- Fungsi: Tampilkan hasil submit ---
function displayResult(name, song, album, message) {
  formResult.innerHTML = `
    <p class="result-heading">🎵 &nbsp;Terima kasih sudah bergabung, Sheilagank!</p>
    <p class="result-text">
      Halo <strong>${escapeHtml(name)}</strong>!
      Lagu SO7 favoritmu adalah <strong>"${escapeHtml(song)}"</strong>
      dan album favoritmu adalah <strong>"${escapeHtml(album)}"</strong>.
      <br><br>
      <strong>Pesanmu:</strong><br>
      ${escapeHtml(message)}
    </p>
  `;

  formResult.classList.remove('hidden');

  // Scroll ke hasil
  setTimeout(() => {
    formResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// --- Event: Submit Form ---
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Cegah reload halaman

  // Ambil nilai dari setiap input
  const name    = document.getElementById('inputName').value;
  const song    = document.getElementById('inputSong').value;
  const album   = document.getElementById('inputAlbum').value;
  const message = document.getElementById('inputMessage').value;

  // Validasi – hentikan jika tidak valid
  if (!validateForm(name, song, album, message)) return;

  // Simulasi loading (tombol disabled sementara)
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Mengirim... 🎵';

  setTimeout(() => {
    displayResult(name, song, album, message);
    form.reset();                    // Kosongkan semua field
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Kirim ke Sheilagank 🎵';
    console.log('✅ Form submitted:', { name, song, album, message });
  }, 800);
});


/* ============================================================
   7. REAL-TIME VALIDASI
   Hapus pesan error saat user mulai mengetik
   ============================================================ */
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', function () {
    this.classList.remove('invalid');
    const errorId = 'error' + this.id.replace('input', '');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = '';
  });
});


/* ============================================================
   8. SMOOTH SCROLL untuk ANCHOR LINK
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const offsetTop = targetEl.offsetTop - header.offsetHeight;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});


/* ============================================================
   9. INISIALISASI
   ============================================================ */
updateActiveNav();
updateHeaderStyle();

console.log('🎵 Sheilagank script loaded! Salam SO7!');
   });