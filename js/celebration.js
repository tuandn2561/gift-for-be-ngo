/**
 * Celebration Interactive Experiences:
 * 1. Birthday Cake & Candle Blowing with Smoke & Fireworks Explosion
 * 2. Mystery Gift Box & Heartfelt Typed Letter
 * 3. Wish Star Launcher
 * 4. High Performance Canvas Fireworks & Confetti
 */

class CelebrationSystem {
  constructor() {
    this.canvas = document.getElementById('fireworks-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.isBlowing = false;
    this.hasBlown = false;

    this.modalCake = document.getElementById('modal-cake');
    this.modalLetter = document.getElementById('modal-letter');
    this.modalWish = document.getElementById('modal-wish');

    this.candle = document.getElementById('cake-candle');
    this.btnBlow = document.getElementById('btn-blow-candle');
    this.cakeStatus = document.getElementById('cake-status-text');

    this.initCanvas();
    this.initCake();
    this.initLetter();
    this.initWish();
    this.animateParticles();
  }

  initCanvas() {
    if (!this.canvas) return;
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  initCake() {
    if (this.btnBlow) {
      this.btnBlow.addEventListener('click', () => this.blowCandle());
    }
    if (this.candle) {
      this.candle.addEventListener('click', () => this.blowCandle());
    }
  }

  blowCandle() {
    if (this.hasBlown) {
      // Re-light candle
      this.candle.classList.remove('blown-out');
      this.hasBlown = false;
      if (this.btnBlow) this.btnBlow.textContent = '🎂 Thổi Nến Ước Nguyện';
      if (this.cakeStatus) this.cakeStatus.textContent = 'Hãy nhắm mắt, ước một điều ước thật đẹp rồi nhấn Thổi Nến nha!';
      return;
    }

    if (window.birthdayAudio) {
      window.birthdayAudio.playBlowCandleSound();
      setTimeout(() => {
        window.birthdayAudio.playChimeSound();
      }, 400);
    }

    if (this.candle) this.candle.classList.add('blown-out');
    this.hasBlown = true;

    if (this.cakeStatus) {
      this.cakeStatus.innerHTML = '🎉 <strong style="color: #ff70a6;">Điều ước đã được gửi đến vũ trụ!</strong> Chúc mọi điều ước của Bé Hạt Ngô thành hiện thực! ✨';
    }
    if (this.btnBlow) this.btnBlow.textContent = '✨ Thắp lại nến';

    // Trigger explosive celebratory fireworks!
    this.triggerGrandFireworks();
  }

  triggerGrandFireworks() {
    const colors = ['#ff70a6', '#38b6ff', '#38b000', '#ffd166', '#ff9ebb', '#cbf3f0'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.45;

    // Launch multiple bursts
    for (let b = 0; b < 6; b++) {
      setTimeout(() => {
        const x = centerX + (Math.random() - 0.5) * (window.innerWidth * 0.7);
        const y = centerY + (Math.random() - 0.5) * 200;
        this.createExplosion(x, y, colors[b % colors.length]);
      }, b * 220);
    }
  }

  createExplosion(x, y, color) {
    const count = 65;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2.5 + Math.random() * 6;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5),
        vy: Math.sin(angle) * speed + (Math.random() - 0.5),
        color: color,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.015,
        size: 3 + Math.random() * 3,
        shape: Math.random() > 0.4 ? 'circle' : 'heart'
      });
    }
  }

  animateParticles() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw tiny heart
        this.ctx.font = `${Math.floor(p.size * 3)}px sans-serif`;
        this.ctx.fillText('❤️', p.x, p.y);
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animateParticles());
  }

  // Typewriter Letter
  initLetter() {
    this.letterTyped = false;
    this.fullText = `Gửi Bé Hạt Ngô - Ngô Thị Ngọc Trinh thân thương! 🌽✨\n\nChúc mừng sinh nhật em! 🎂🎉\n\nChúc em bước sang tuổi mới luôn giữ trọn nụ cười rạng rỡ, ngày càng xinh đẹp, nhiều sức khỏe và tràn ngập niềm vui. Chúc cho mọi dự định, ước mơ và công việc của em đều thuận buồm xuôi gió, gặt hái được thật nhiều thành công rực rỡ!\n\nCảm ơn em vì đã luôn là một người em siêu dễ thương, đáng mến và mang lại thật nhiều năng lượng tích cực, ấm áp cho mọi người xung quanh.\n\nHy vọng món quà nhỏ này sẽ mang đến cho em một ngày sinh nhật thật đáng nhớ, ngọt ngào và ngập tràn hạnh phúc nha! 💖🌸🍀`;
  }

  openLetter() {
    if (this.modalLetter) {
      this.modalLetter.classList.add('active');
      if (window.birthdayAudio) window.birthdayAudio.playChimeSound();

      const textEl = document.getElementById('typewriter-letter-content');
      if (textEl && !this.letterTyped) {
        textEl.textContent = '';
        let i = 0;
        const speed = 22;
        const type = () => {
          if (i < this.fullText.length) {
            textEl.textContent += this.fullText.charAt(i);
            i++;
            setTimeout(type, speed);
          } else {
            this.letterTyped = true;
          }
        };
        type();
      }
    }
  }

  // Wish Star System
  initWish() {
    const btnSubmit = document.getElementById('btn-submit-wish');
    const input = document.getElementById('wish-input-field');
    const stream = document.getElementById('wishes-stream');

    if (btnSubmit && input) {
      btnSubmit.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        if (window.birthdayAudio) window.birthdayAudio.playPopSound();

        const bubble = document.createElement('div');
        bubble.className = 'wish-bubble';
        bubble.innerHTML = `<strong>✨ Lời chúc:</strong> ${this.escapeHtml(text)}`;
        if (stream) {
          stream.prepend(bubble);
        }

        input.value = '';

        // Spawn a flying star in the sky
        this.spawnFlyingWishStar(text);
      });
    }
  }

  spawnFlyingWishStar(text) {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.bottom = '120px';
    star.style.left = `${Math.random() * (window.innerWidth - 100) + 50}px`;
    star.style.fontSize = '24px';
    star.style.zIndex = '35';
    star.style.pointerEvents = 'none';
    star.textContent = '🌟';
    star.style.transition = 'all 3s cubic-bezier(0.25, 1, 0.5, 1)';

    document.body.appendChild(star);

    setTimeout(() => {
      star.style.transform = `translateY(-${window.innerHeight * 0.7}px) scale(1.6)`;
      star.style.opacity = '0';
    }, 50);

    setTimeout(() => star.remove(), 3200);
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  openCake() {
    if (this.modalCake) {
      this.modalCake.classList.add('active');
      if (window.birthdayAudio) window.birthdayAudio.playChimeSound();
    }
  }

  openWishModal() {
    if (this.modalWish) {
      this.modalWish.classList.add('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.celebration = new CelebrationSystem();
});
