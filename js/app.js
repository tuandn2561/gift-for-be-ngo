/**
 * Main Application Orchestrator
 * Theme Management (Day/Night), Night Starfield & Fireflies, Dock Navigation
 */

class BirthdayApp {
  constructor() {
    this.theme = localStorage.getItem('theme_preference') || 'day';
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.btnRainToggle = document.getElementById('btn-rain-toggle');
    this.starCanvas = document.getElementById('star-canvas');
    this.starCtx = this.starCanvas ? this.starCanvas.getContext('2d') : null;
    this.stars = [];
    this.fireflies = [];

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.initThemeToggle();
    this.initRainToggle();
    this.initDockButtons();
    this.initFlyingCreatures();
    this.initStarfield();
    this.animateSkyCanvas();
  }

  initFlyingCreatures() {
    const creatures = document.querySelectorAll('.creature');
    const emojis = ['✨', '💖', '🌸', '🍯', '🌷', '🌟', '🍀'];

    creatures.forEach(creature => {
      const handleClick = (e) => {
        if (window.birthdayAudio) {
          window.birthdayAudio.playPopSound();
        }

        // Particle sparkle burst at creature position
        const rect = creature.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 7; i++) {
          const spark = document.createElement('div');
          spark.className = 'heart-particle';
          spark.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          spark.style.position = 'fixed';
          spark.style.left = `${centerX}px`;
          spark.style.top = `${centerY}px`;
          spark.style.zIndex = '60';
          spark.style.pointerEvents = 'none';

          const tx = (Math.random() - 0.5) * 160;
          spark.style.setProperty('--tx', `${tx}px`);
          spark.style.fontSize = `${18 + Math.random() * 14}px`;

          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 1600);
        }

        // Add transient spin class to inner SVG without overriding creature keyframe
        const svg = creature.querySelector('.creature-svg');
        if (svg) {
          svg.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
          svg.style.transform = 'scale(1.4) rotate(360deg)';
          setTimeout(() => {
            if (svg) svg.style.transform = '';
          }, 450);
        }
      };

      creature.addEventListener('click', handleClick);
      creature.addEventListener('touchstart', handleClick, { passive: true });
    });
  }

  initThemeToggle() {
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => {
        const nextTheme = this.theme === 'day' ? 'night' : 'day';
        this.applyTheme(nextTheme);
        if (window.birthdayAudio) window.birthdayAudio.playPopSound();
      });
    }
  }

  applyTheme(theme) {
    this.theme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme_preference', theme);

    if (this.btnThemeToggle) {
      const icon = this.btnThemeToggle.querySelector('.theme-icon');
      const tooltip = this.btnThemeToggle.querySelector('.tooltip');
      if (icon) {
        icon.textContent = theme === 'day' ? '🌙' : '☀️';
      }
      if (tooltip) {
        tooltip.textContent = theme === 'day' ? 'Đổi sang Bầu Trời Đêm' : 'Đổi sang Ban Ngày Rạng Rỡ';
      }
    }
  }

  initRainToggle() {
    if (this.btnRainToggle) {
      this.btnRainToggle.addEventListener('click', () => {
        if (!window.rainMemories) return;
        window.rainMemories.isPaused = !window.rainMemories.isPaused;
        const icon = this.btnRainToggle.querySelector('.rain-icon');
        const tooltip = this.btnRainToggle.querySelector('.tooltip');

        if (window.rainMemories.isPaused) {
          if (icon) icon.textContent = '⏸️';
          if (tooltip) tooltip.textContent = 'Tiếp tục Mưa Kỷ Niệm';
        } else {
          if (icon) icon.textContent = '🌧️';
          if (tooltip) tooltip.textContent = 'Tạm dừng Mưa Kỷ Niệm';
        }
        if (window.birthdayAudio) window.birthdayAudio.playPopSound();
      });
    }
  }

  initDockButtons() {
    // Dock Button: Album
    const btnAlbum = document.getElementById('dock-btn-album');
    if (btnAlbum) {
      btnAlbum.addEventListener('click', () => {
        if (window.rainMemories) window.rainMemories.openAlbum();
      });
    }

    // Dock Button: Cake
    const btnCake = document.getElementById('dock-btn-cake');
    if (btnCake) {
      btnCake.addEventListener('click', () => {
        if (window.celebration) window.celebration.openCake();
      });
    }

    // Dock Button: Letter
    const btnLetter = document.getElementById('dock-btn-letter');
    if (btnLetter) {
      btnLetter.addEventListener('click', () => {
        if (window.celebration) window.celebration.openLetter();
      });
    }

    // Dock Button: Wish
    const btnWish = document.getElementById('dock-btn-wish');
    if (btnWish) {
      btnWish.addEventListener('click', () => {
        if (window.celebration) window.celebration.openWishModal();
      });
    }
  }

  // Starfield & Fireflies for Night Mode
  initStarfield() {
    if (!this.starCanvas) return;

    const resize = () => {
      this.starCanvas.width = window.innerWidth;
      this.starCanvas.height = window.innerHeight;
      this.generateStars();
      this.generateFireflies();
    };

    resize();
    window.addEventListener('resize', resize);
  }

  generateStars() {
    this.stars = [];
    const count = Math.floor(window.innerWidth * 0.12); // ~120 stars for desktop
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.starCanvas.width,
        y: Math.random() * (this.starCanvas.height * 0.75),
        radius: 0.6 + Math.random() * 1.6,
        alpha: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }

  generateFireflies() {
    this.fireflies = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      this.fireflies.push({
        x: Math.random() * this.starCanvas.width,
        y: this.starCanvas.height * 0.6 + Math.random() * (this.starCanvas.height * 0.35),
        radius: 2 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: 0.3 + Math.random() * 0.7,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  animateSkyCanvas() {
    if (!this.starCtx) return;
    this.starCtx.clearRect(0, 0, this.starCanvas.width, this.starCanvas.height);

    const now = performance.now() * 0.001;

    // Draw Stars (Active in Night mode)
    if (this.theme === 'night') {
      this.starCtx.fillStyle = '#ffffff';
      this.stars.forEach(star => {
        const flicker = Math.sin(now * star.twinkleSpeed * 60 + star.twinkleOffset);
        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + flicker * 0.35));
        this.starCtx.globalAlpha = currentAlpha;
        this.starCtx.beginPath();
        this.starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.starCtx.fill();
      });

      // Draw Fireflies wandering around grass/corn
      this.fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;

        // Bounce within bounds
        if (f.x < 0 || f.x > this.starCanvas.width) f.vx *= -1;
        if (f.y < this.starCanvas.height * 0.5 || f.y > this.starCanvas.height) f.vy *= -1;

        const glowAlpha = Math.abs(Math.sin(now * f.pulseSpeed * 60)) * 0.8 + 0.2;
        this.starCtx.save();
        this.starCtx.shadowBlur = 12;
        this.starCtx.shadowColor = '#ffd166';
        this.starCtx.fillStyle = `rgba(255, 230, 109, ${glowAlpha})`;
        this.starCtx.beginPath();
        this.starCtx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        this.starCtx.fill();
        this.starCtx.restore();
      });
    }

    requestAnimationFrame(() => this.animateSkyCanvas());
  }
}

// Instantiate Main App
document.addEventListener('DOMContentLoaded', () => {
  window.app = new BirthdayApp();
});
