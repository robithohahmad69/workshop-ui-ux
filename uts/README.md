# 🌹 ROSÉ - Park Chaeyoung Official Fan Website 🌹

**The Golden Voice of BLACKPINK**

A modern, minimalist fan website for ROSÉ (Park Chaeyoung), the main vocalist of BLACKPINK. Built with pure HTML, CSS, and JavaScript featuring a clean black/white design aesthetic.

## ✨ Features

- 🎨 **Minimalist Design** - Clean black/white aesthetic with subtle rose gold accents
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Fade-in effects and smooth scrolling
- 🎵 **Solo Discography** - Showcase of ROSÉ's solo music releases
- 📸 **Gallery Section** - Beautiful photo gallery layout
- 🔗 **Social Media Links** - Connect with ROSÉ on all platforms
- 📊 **Performance Optimized** - Fast loading with throttled events
- ♿ **Accessible** - Keyboard navigation and semantic HTML
- 🔍 **SEO Friendly** - Proper meta tags and structure

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)

### Installation

1. **Navigate to the project directory**
   ```bash
   cd "C:\laragon\www\workshop Ui\uts"
   ```

2. **Start a local web server**
   ```bash
   # Using Python
   python -m http.server 8000

   # Using PHP
   php -S localhost:8000

   # Using Node.js (npx)
   npx serve
   ```

3. **Visit the site**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
uts/
│
├── index.html          # Main HTML file (semantic, accessible)
├── styles.css          # Main stylesheet (minimalist, responsive)
├── main.js             # JavaScript (clean, documented)
├── package.json        # Project metadata
├── README.md           # This file
│
└── images/             # Image assets (to be added)
    ├── hero-rose.jpg
    ├── about-rose.jpg
    ├── music-r.jpg
    ├── music-rosie.jpg
    └── gallery/        # Photo gallery images
```

## 🎨 Design Philosophy

### Color Palette

- **Black** (#000000) - Primary color
- **White** (#FFFFFF) - Background
- **Grays** (#f5f5f5 to #171717) - Subtle variations
- **Rose Gold** (#b76e79) - Accent color (subtle)

### Typography

- **Font Family**: Roboto
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- **Clean, minimalist, highly readable**

### Layout Principles

- **Generous whitespace** for breathing room
- **Grid-based layouts** for consistency
- **Mobile-first responsive design**
- **Sharp edges** (no border-radius) for minimalist look

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Variables)
- **JavaScript (ES6+)** - Modern syntax and APIs
- **Google Fonts** - Roboto font family

## ⚡ Performance Features

- **CSS Variables** - Easy theming and consistent styling
- **Intersection Observer** - Efficient scroll animations
- **Throttled Events** - Optimized scroll handlers
- **Debounced Resize** - Smooth window resizing
- **Minimal Dependencies** - Pure vanilla JavaScript

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Proper heading hierarchy
- Alt text for images
- Reduced motion support

## 📝 Code Quality

- **Clean Code** - Well-documented, readable code
- **DRY Principle** - Reusable components and utilities
- **Separation of Concerns** - HTML, CSS, and JS in separate files
- **Component-Based** - Modular CSS architecture
- **Comments** - Comprehensive code documentation

## 🎨 Customization Guide

### Update Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --color-accent: #b76e79;  /* Rose gold accent */
  /* ... more variables */
}
```

### Add Images

Replace placeholder divs with actual images:

```html
<!-- Before -->
<div class="image-placeholder">
  <span>ROSÉ</span>
</div>

<!-- After -->
<img src="images/hero-rose.jpg" alt="ROSÉ - Park Chaeyoung">
```

### Update Content

Edit HTML content directly in `index.html`:

- **About section**: Update in `<section id="about">`
- **Music section**: Update in `<section id="music">`
- **Gallery**: Update in `<section id="gallery">`
- **Social links**: Update in `<section id="contact">`

## 📊 Sections Overview

### Hero Section
- Full-screen introduction
- Name and title display
- Call-to-action buttons

### About Section
- Biography and background
- Career highlights
- Statistics and achievements

### Music Section
- Solo discography showcase
- Album artwork display
- Track listings

### Gallery Section
- Photo gallery grid
- Performance moments
- Fashion highlights

### Contact Section
- Social media links
- Platform icons
- Direct connections

## 🐛 Troubleshooting

### Images not loading
- Check file paths in HTML
- Ensure image files exist in the `images/` folder
- Verify file extensions match (.jpg, .png, etc.)

### Styles not applying
- Clear browser cache (Ctrl+F5)
- Check CSS file is linked correctly in HTML
- Verify no CSS syntax errors in DevTools

### JavaScript not working
- Check browser console for errors
- Ensure main.js is loaded after HTML content
- Verify JavaScript is enabled in browser

## 🚀 Deployment

### Static Hosting Options

Deploy to any static hosting service:

- **Netlify**: Drag and drop the `uts` folder
- **Vercel**: Import from Git or drag and drop
- **GitHub Pages**: Push to GitHub and enable Pages
- **Surge.sh**: `surge uts`
- **Firebase Hosting**: `firebase deploy`

### Before Deploying

1. Replace all placeholder images with actual photos
2. Optimize images (compress, use WebP)
3. Test all features and links
4. Check mobile responsiveness
5. Verify meta tags and SEO

## 📄 License

This is a fan-made project and is not officially affiliated with ROSÉ, YG Entertainment, or BLACKPINK.

## 🙏 Credits

- **ROSÉ** - The inspiration and reason for this project
- **YG Entertainment** - ROSÉ's agency
- **BLACKPINK** - The group that started it all
- **BLINK** - The amazing fan community

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact the project maintainer

---

**Made with 🌹 by a BLINK for BLINKs**

*The Golden Voice — Always & Forever*

---

## 🔄 Version History

### v1.0.0 (Current) - ROSÉ Edition
- ✨ Complete redesign from BLACKPINK to ROSÉ solo
- 🎨 Minimalist black/white aesthetic
- 📱 Fully responsive design
- ⚡ Performance optimizations
- ♿ Accessibility improvements
- 🎵 Solo discography showcase
- 📸 Gallery section
- 🔗 Social media integration

---

**Last Updated**: April 2026
**Status**: Production Ready ✅
**Theme**: ROSÉ Solo Artist Website
