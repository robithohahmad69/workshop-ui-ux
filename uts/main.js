/* =====================================================
   ROSÉ - Park Chaeyoung Official Fan Website
   Main JavaScript - Production Ready
   ===================================================== */

// ─────────────────────────────────────────────────────
// NAVIGATION TOGGLE (Mobile)
// ─────────────────────────────────────────────────────

/**
 * Toggle navigation menu for mobile
 */
function toggleNavbar() {
  const navbarMenu = document.querySelector('.navbar-menu');
  if (navbarMenu) {
    navbarMenu.classList.toggle('active');
  }
}

// Close menu when link is clicked
document.addEventListener('DOMContentLoaded', () => {
  const navbarLinks = document.querySelectorAll('.navbar-link');
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navbarMenu = document.querySelector('.navbar-menu');
      if (navbarMenu && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
      }
    });
  });
});

// ─────────────────────────────────────────────────────
// SMOOTH SCROLL FOR ANCHOR LINKS
// ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if href is only "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for navbar
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ─────────────────────────────────────────────────────
// ACTIVE NAVIGATION LINK UPDATE
// ─────────────────────────────────────────────────────

/**
 * Update active state on navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;

    if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
      currentSection = section.getAttribute('id');
    }
  });

  navbarLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');

    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Throttle function for scroll events
function throttle(func, delay) {
  let timeoutId;
  let lastRan;

  return function(...args) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if ((Date.now() - lastRan) >= delay) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
}

// Attach scroll event listener with throttle
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// ─────────────────────────────────────────────────────
// INTERSECTION OBSERVER FOR ANIMATIONS
// ─────────────────────────────────────────────────────

/**
 * Setup intersection observer for fade-in animations with hierarchy
 */
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    '.music-card, .social-card, .gallery-item'
  );

  // Convert to array and sort by DOM position (top to bottom)
  const sortedElements = Array.from(animatedElements).sort((a, b) => {
    const aPosition = a.getBoundingClientRect().top + window.scrollY;
    const bPosition = b.getBoundingClientRect().top + window.scrollY;
    return aPosition - bPosition;
  });

  // Assign hierarchy levels
  sortedElements.forEach((el, index) => {
    el.dataset.animIndex = index;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('fade-animated')) {
        const elementIndex = parseInt(entry.target.dataset.animIndex);

        entry.target.classList.add('fade-animated');

        // Add staggered delay based on hierarchy
        const delay = elementIndex * 100; // 100ms delay per element

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sortedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────────────
// TYPING ANIMATION ON SCROLL
// ─────────────────────────────────────────────────────

/**
 * Setup typing animation for text elements on scroll
 * Simplified and more reliable approach
 */
function setupTypingAnimation() {
  const typingElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-title, .music-title, .social-title'
  );

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('typing-animated')) {
        entry.target.classList.add('typing-animated');

        const text = entry.target.textContent.trim();
        const target = entry.target;

        // Simple fade-in animation instead of complex typing
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';

        setTimeout(() => {
          target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }, 100);

        typingObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  typingElements.forEach(el => {
    typingObserver.observe(el);
  });
}

// Run when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  setupIntersectionObserver();
  setupTypingAnimation();
  setupHeroAnimation();
  setupLightbox();

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.hero-title-line, .hero-subtitle, .hero-description, .hero-actions').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });

    document.querySelectorAll('.section-title, .section-subtitle, .about-title, .music-title, .social-title').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }
});

// ─────────────────────────────────────────────────────
// LIGHTBOX GALLERY FUNCTIONALITY
// ─────────────────────────────────────────────────────

/**
 * Setup lightbox functionality for gallery images
 */
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  // Check if lightbox elements exist
  if (!lightbox || !lightboxImg || !closeBtn) {
    console.log('Lightbox elements not found');
    return;
  }

  console.log('Setting up lightbox...');

  // Get all gallery images
  const galleryImages = document.querySelectorAll('.gallery-img');
  console.log('Found gallery images:', galleryImages.length);

  if (galleryImages.length === 0) {
    console.log('No gallery images found');
    return;
  }

  galleryImages.forEach((img, index) => {
    console.log(`Setting up gallery image ${index}:`, img.alt);

    // Make parent clickable
    const galleryItem = img.closest('.gallery-item');
    if (galleryItem) {
      galleryItem.style.cursor = 'pointer';
      galleryItem.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Gallery item clicked:', index, img.alt);

        lightbox.classList.add('active');
        lightboxImg.src = img.src;

        // Get caption from alt text
        const caption = img.alt || `Gallery Image ${index + 1}`;
        lightboxCaption.textContent = caption;

        console.log('Lightbox opened with:', caption);

        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
      });
    }
  });

  // Close lightbox when clicking close button
  closeBtn.addEventListener('click', function() {
    console.log('Closing lightbox (close button)');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      console.log('Closing lightbox (outside click)');
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300);
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      console.log('Closing lightbox (Escape key)');
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300);
    }
  });

  console.log('Lightbox setup complete');
}

// ─────────────────────────────────────────────────────
// HERO SECTION HIERARCHY ANIMATION
// ─────────────────────────────────────────────────────

/**
 * Setup sequential animation for hero section elements
 * Simplified approach for better reliability
 */
function setupHeroAnimation() {
  const heroElements = document.querySelectorAll(
    '.hero-title-line, .hero-subtitle, .hero-description, .hero-actions'
  );

  // Animate hero elements in sequence
  heroElements.forEach((element, index) => {
    const delay = index * 200;

    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  });
}

// ─────────────────────────────────────────────────────
// PERFORMANCE OPTIMIZATION
// ─────────────────────────────────────────────────────

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize resize events
const handleResize = debounce(() => {
  // Reset any size-dependent calculations
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    // Force reflow to ensure navbar height is updated
    void navbar.offsetHeight;
  }
}, 250);

window.addEventListener('resize', handleResize);

// ─────────────────────────────────────────────────────
// CONSOLE MESSAGE
// ─────────────────────────────────────────────────────

console.log('%c🌹 ROSÉ - Park Chaeyoung Official Fan Website 🌹', 'color: #9A1829; font-size: 24px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);');
console.log('%cLoos Normal Medium Typography • UI/UX Optimized Design', 'color: #888; font-size: 13px; font-weight: 500;');
console.log('%cThe Golden Voice of BLACKPINK', 'color: #666; font-size: 12px;');
console.log('%c🖼️ Lightbox Gallery • Spotify Integration • Smooth Animations', 'color: #9A1829; font-size: 11px;');
console.log('%c♿ Accessibility First • Performance Optimized • Bug Fixes', 'color: #666; font-size: 10px;');
