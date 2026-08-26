/**
 * Interactive Corn Mascot: "Bé Hạt Ngô" (Bé Bắp)
 * 3D Physics Swaying, 3D Mouse Parallax Tracking, Hover Effects & Speech Bubbles
 */

class CornMascot {
  constructor() {
    this.wrapper = document.getElementById('corn-mascot');
    this.svg = document.getElementById('corn-plant-svg');
    this.bubble = document.getElementById('corn-speech-bubble');
    this.burstContainer = document.getElementById('mascot-burst-container');

    this.wishes = [
      "Bé Bắp chúc mừng sinh nhật chị Ngọc Trinh siêu cute! 🌽🎂✨",
      "Chúc chị Ngọc Trinh luôn luôn xinh tươi rực rỡ, cười tươi như hoa! 🌸☀️",
      "Tuổi mới thật nhiều may mắn, sự nghiệp thăng hoa, việc gì cũng xuất sắc! 🚀💛",
      "Chúc chị luôn hạnh phúc, bình an và được yêu thương ngập tràn! 💖🎁",
      "Chúc chị Ngọc Trinh tiền đầy túi, tình đầy tim, niềm vui nhân đôi mỗi ngày! 💰🥰",
      "Cảm ơn chị Ngọc Trinh vì đã luôn là một người chị tuyệt vời và đáng mến! 🌿✨",
      "Chạm vào các giọt mưa trên trời để cùng ngắm lại kỷ niệm ngọt ngào nha chị! 🌧️📸",
      "Chị Ngọc Trinh ơi, đừng quên thổi nến ước nguyện và mở bức thư bí mật nha! 🎂🕯️",
      "Chúc chị Ngọc Trinh vạn sự như ý, tỷ sự như mơ, mãi mãi toả sáng! 🎉👑"
    ];

    this.currentWishIdx = 0;
    this.bubbleTimeout = null;
    this.isAutoSpeaking = true;

    // 3D Parallax & Sway Physics State
    this.targetRotY = 0;
    this.targetRotX = 0;
    this.currentRotY = 0;
    this.currentRotX = 0;
    this.isHovered = false;
    this.hoverSparkleInterval = null;

    this.init();
  }

  init() {
    if (!this.wrapper) return;

    // Interaction click events
    this.wrapper.addEventListener('click', (e) => this.handleClick(e));
    this.wrapper.addEventListener('touchstart', (e) => this.handleClick(e), { passive: true });

    // Hover mouse enter/leave for 3D glow & sparkles
    this.wrapper.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.startHoverSparkles();
    });

    this.wrapper.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.targetRotY = 0;
      this.targetRotX = 0;
      this.stopHoverSparkles();
    });

    // 3D Mouse Movement Tracking
    window.addEventListener('mousemove', (e) => {
      if (this.isHovered) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      this.targetRotY = x * 10;
      this.targetRotX = -y * 8;
    }, { passive: true });

    // Start 60fps 3D Physics Loop
    this.animate3DPhysics();

    // Auto-speech cycle every 8 seconds
    setInterval(() => {
      if (!this.isHovered && !document.hidden) {
        this.speakNextWish();
      }
    }, 9000);
  }

  animate3DPhysics() {
    const time = performance.now() * 0.002;
    // Natural gentle breeze 3D sway oscillation
    const breezeSwayZ = Math.sin(time * 1.5) * 3;
    const breezeSwayY = Math.cos(time * 1.2) * 2;

    // Smooth Lerp (Linear Interpolation)
    this.currentRotY += (this.targetRotY + breezeSwayY - this.currentRotY) * 0.08;
    this.currentRotX += (this.targetRotX - this.currentRotX) * 0.08;

    if (this.svg) {
      const hoverZ = this.isHovered ? 30 : 0;
      const hoverScale = this.isHovered ? 1.06 : 1.0;

      this.svg.style.transformOrigin = '50% 100%';
      this.svg.style.transform = `
        perspective(900px)
        rotateX(${this.currentRotX}deg)
        rotateY(${this.currentRotY}deg)
        rotateZ(${breezeSwayZ}deg)
        translateZ(${hoverZ}px)
        scale(${hoverScale})
      `;
    }

    requestAnimationFrame(() => this.animate3DPhysics());
  }

  startHoverSparkles() {
    if (this.hoverSparkleInterval) clearInterval(this.hoverSparkleInterval);
    this.hoverSparkleInterval = setInterval(() => {
      if (this.isHovered && this.burstContainer) {
        const el = document.createElement('div');
        el.className = 'heart-particle';
        el.textContent = ['✨', '🌟', '💖', '🍀', '🌸'][Math.floor(Math.random() * 5)];
        const tx = (Math.random() - 0.5) * 200;
        el.style.setProperty('--tx', `${tx}px`);
        el.style.fontSize = `${16 + Math.random() * 14}px`;
        this.burstContainer.appendChild(el);
        setTimeout(() => el.remove(), 1600);
      }
    }, 350);
  }

  stopHoverSparkles() {
    if (this.hoverSparkleInterval) {
      clearInterval(this.hoverSparkleInterval);
      this.hoverSparkleInterval = null;
    }
  }

  handleClick(e) {
    // Play Pop Sound
    if (window.birthdayAudio) {
      window.birthdayAudio.playPopSound();
    }

    // Spawn Heart Particle Burst
    this.createHeartBurst(e);

    // Trigger immediate speech bubble rotation
    this.speakNextWish();

    // 3D Bounce Animation
    if (this.svg) {
      this.svg.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.svg.style.transform += ' translateZ(50px) scale(1.12)';
      setTimeout(() => {
        if (this.svg) this.svg.style.transition = '';
      }, 200);
    }
  }

  speakNextWish() {
    if (!this.bubble) return;

    this.bubble.classList.remove('active');
    
    setTimeout(() => {
      this.bubble.textContent = this.wishes[this.currentWishIdx];
      this.currentWishIdx = (this.currentWishIdx + 1) % this.wishes.length;
      this.bubble.classList.add('active');

      if (this.bubbleTimeout) clearTimeout(this.bubbleTimeout);
      this.bubbleTimeout = setTimeout(() => {
        this.bubble.classList.remove('active');
      }, 5500);
    }, 250);
  }

  createHeartBurst(e) {
    if (!this.burstContainer) return;

    const emojis = ['🌽', '💖', '✨', '🌸', '💛', '🎉', '🌟'];
    const count = 8;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'heart-particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const tx = (Math.random() - 0.5) * 220;
      el.style.setProperty('--tx', `${tx}px`);
      el.style.fontSize = `${20 + Math.random() * 18}px`;

      this.burstContainer.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 1800);
    }
  }
}

/**
 * Interactive Baby Bean Companion: "Bé Hạt Đậu Nho Nhỏ"
 */
class BabyBeanMascot {
  constructor() {
    this.wrapper = document.getElementById('baby-bean-mascot');
    this.svg = document.getElementById('baby-bean-svg');
    this.bubble = document.getElementById('bean-speech-bubble');
    this.burstContainer = document.getElementById('bean-burst-container');

    this.wishes = [
      "Bé Đậu chúc mừng sinh nhật chị Ngọc Trinh thật nhiều niềm vui! 🌱🎂💖",
      "Oa, hôm nay chị Ngọc Trinh xinh xắn xỉu luôn á! 🌸✨",
      "Bé Đậu luôn là bé mầm nhỏ ngoan ngoãn bên cạnh chị Ngọc Trinh nha! 🌽🌱💫",
      "Chúc chị Ngọc Trinh ăn mau chóng lớn, vui vẻ cả ngày, không âu lo! 🍰🍀",
      "Bé Đậu tưới mát thật nhiều may mắn và năng lượng tích cực cho chị Ngọc Trinh! 💧🌱💚",
      "Chúc chị Ngọc Trinh rực rỡ như nắng hạ, ngọt ngào như trà sữa! 🧋☀️",
      "Bé Đậu gửi triệu cái ôm ấm áp chúc mừng sinh nhật chị Ngọc Trinh! 🌿🤗",
      "Cùng Bé Đậu và Bé Bắp đón tuổi mới thật mạnh mẽ và toả sáng nha chị! 🌈✨"
    ];

    this.currentIdx = 0;
    this.bubbleTimeout = null;

    this.init();
  }

  init() {
    if (!this.wrapper) return;

    this.wrapper.addEventListener('click', (e) => this.handleClick(e));
    this.wrapper.addEventListener('touchstart', (e) => this.handleClick(e), { passive: true });

    // Initial greeting after 3 seconds
    setTimeout(() => {
      this.speakNextWish();
    }, 3200);
  }

  handleClick(e) {
    if (window.birthdayAudio) {
      window.birthdayAudio.playPopSound();
    }

    this.createSproutBurst();
    this.speakNextWish();

    // Cute 3D Jiggle Spin
    if (this.svg) {
      this.svg.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.svg.style.transform = 'scale(1.3) rotate(15deg) translateY(-10px)';
      setTimeout(() => {
        if (this.svg) {
          this.svg.style.transform = '';
          setTimeout(() => {
            if (this.svg) this.svg.style.transition = '';
          }, 200);
        }
      }, 250);
    }
  }

  speakNextWish() {
    if (!this.bubble) return;

    this.bubble.classList.remove('active');
    setTimeout(() => {
      this.bubble.textContent = this.wishes[this.currentIdx];
      this.currentIdx = (this.currentIdx + 1) % this.wishes.length;
      this.bubble.classList.add('active');

      if (this.bubbleTimeout) clearTimeout(this.bubbleTimeout);
      this.bubbleTimeout = setTimeout(() => {
        this.bubble.classList.remove('active');
      }, 4800);
    }, 200);
  }

  createSproutBurst() {
    if (!this.burstContainer) return;

    const emojis = ['🌱', '🌿', '💚', '🌸', '✨', '🍀'];
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      el.className = 'heart-particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const tx = (Math.random() - 0.5) * 140;
      el.style.setProperty('--tx', `${tx}px`);
      el.style.fontSize = `${16 + Math.random() * 12}px`;
      this.burstContainer.appendChild(el);
      setTimeout(() => el.remove(), 1600);
    }
  }
}

// Instantiate mascots when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cornMascot = new CornMascot();
  window.babyBeanMascot = new BabyBeanMascot();
});
