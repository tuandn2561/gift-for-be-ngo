/**
 * Memory Raindrops System & Polaroid Gallery Lightbox
 * Supports both Images (img_1.jpg -> img_18.jpg) and Videos (video_1.mp4 -> video_16.mp4)
 */

class RainMemoriesSystem {
  constructor() {
    this.container = document.getElementById('rain-container');
    this.modal = document.getElementById('modal-polaroid');
    this.albumModal = document.getElementById('modal-album');
    this.polaroidMediaContainer = document.getElementById('polaroid-media-container');
    this.polaroidText = document.getElementById('polaroid-text');
    this.polaroidDate = document.getElementById('polaroid-date');
    this.btnPrev = document.getElementById('btn-polaroid-prev');
    this.btnNext = document.getElementById('btn-polaroid-next');
    this.btnHeart = document.getElementById('btn-polaroid-heart');
    this.heartCountEl = document.getElementById('polaroid-heart-count');
    this.albumFilter = 'all';

    // 18 Images list
    const imagesList = [
      { file: 'img_1.jpg', type: 'image', caption: 'Nụ cười tỏa nắng của Bé Hạt Ngô ☀️', tag: 'Ảnh kỷ niệm #1' },
      { file: 'img_2.jpg', type: 'image', caption: 'Cô bé đáng yêu và dễ thương nhất quả đất 🌸', tag: 'Ảnh kỷ niệm #2' },
      { file: 'img_3.jpg', type: 'image', caption: 'Khoảnh khắc rạng rỡ đón tuổi mới 🌟', tag: 'Ảnh kỷ niệm #3' },
      { file: 'img_4.jpg', type: 'image', caption: 'Bé Bắp xinh tươi lung linh mọi góc nhìn 🌽✨', tag: 'Ảnh kỷ niệm #4' },
      { file: 'img_5.jpg', type: 'image', caption: 'Ánh mắt trong veo và tràn đầy năng lượng tích cực 💖', tag: 'Ảnh kỷ niệm #5' },
      { file: 'img_6.jpg', type: 'image', caption: 'Xinh xắn, dịu dàng như hoa sớm mai 🌷', tag: 'Ảnh kỷ niệm #6' },
      { file: 'img_7.jpg', type: 'image', caption: 'Luôn giữ tinh thần lạc quan, yêu đời nhé! 😊', tag: 'Ảnh kỷ niệm #7' },
      { file: 'img_8.jpg', type: 'image', caption: 'Bé Hạt Ngô với trái tim ấm áp và chân thành 🍀', tag: 'Ảnh kỷ niệm #8' },
      { file: 'img_9.jpg', type: 'image', caption: 'Thêm một tuổi mới thật rực rỡ và thành công! 🚀🎉', tag: 'Ảnh kỷ niệm #9' },
      { file: 'img_10.jpg', type: 'image', caption: 'Bé Hạt Ngô mãi đỉnh, vạn người mê! 👑💛', tag: 'Ảnh kỷ niệm #10' },
      { file: 'img_11.jpg', type: 'image', caption: 'Những phút giây bình yên và vui tươi 🌈', tag: 'Ảnh kỷ niệm #11' },
      { file: 'img_12.jpg', type: 'image', caption: 'Ngọt ngào như một viên kẹo đường 🍭', tag: 'Ảnh kỷ niệm #12' },
      { file: 'img_13.jpg', type: 'image', caption: 'Nét đẹp tự nhiên, trong sáng và cuốn hút 🌺', tag: 'Ảnh kỷ niệm #13' },
      { file: 'img_14.jpg', type: 'image', caption: 'Bé Bắp ăn mau chóng lớn, vạn sự hanh thông 🍰✨', tag: 'Ảnh kỷ niệm #14' },
      { file: 'img_15.jpg', type: 'image', caption: 'Một mùa sinh nhật ngập tràn yêu thương! 🎁🎈', tag: 'Ảnh kỷ niệm #15' },
      { file: 'img_16.jpg', type: 'image', caption: 'Chúc em luôn tự tin tỏa sáng rực rỡ! 💫', tag: 'Ảnh kỷ niệm #16' },
      { file: 'img_17.jpg', type: 'image', caption: 'Mỗi ngày trôi qua đều là một ngày hạnh phúc 🌻', tag: 'Ảnh kỷ niệm #17' },
      { file: 'img_18.jpg', type: 'image', caption: 'Chúc Bé Hạt Ngô Ngọc Trinh sinh nhật vui vẻ nhất trần đời! 🎂🌽💖', tag: 'Ảnh kỷ niệm #18' }
    ];

    // 16 Videos list
    const videosList = [
      { file: 'video_1.mp4', type: 'video', caption: 'Thước phim đáng yêu của Bé Hạt Ngô 🎬✨', tag: 'Video kỷ niệm #1' },
      { file: 'video_2.mp4', type: 'video', caption: 'Khoảnh khắc nhí nhảnh tràn đầy năng lượng ⚡🌸', tag: 'Video kỷ niệm #2' },
      { file: 'video_3.mp4', type: 'video', caption: 'Cô gái hạt ngô siêu cute đang tỏa sáng 🌽💛', tag: 'Video kỷ niệm #3' },
      { file: 'video_4.mp4', type: 'video', caption: 'Nụ cười hồn nhiên làm bừng sáng cả ngày dài ☀️💖', tag: 'Video kỷ niệm #4' },
      { file: 'video_5.mp4', type: 'video', caption: 'Ghi lại những khoảnh khắc thanh xuân rạng rỡ 🌷🎈', tag: 'Video kỷ niệm #5' },
      { file: 'video_6.mp4', type: 'video', caption: 'Bé Bắp dễ thương không góc chết! 👑✨', tag: 'Video kỷ niệm #6' },
      { file: 'video_7.mp4', type: 'video', caption: 'Năng động, tươi vui và ngập tràn niềm vui 🌈🎉', tag: 'Video kỷ niệm #7' },
      { file: 'video_8.mp4', type: 'video', caption: 'Những biểu cảm đốn tim người xem 💖😻', tag: 'Video kỷ niệm #8' },
      { file: 'video_9.mp4', type: 'video', caption: 'Khoảnh khắc ngọt ngào lưu giữ trọn vẹn 🍀🍰', tag: 'Video kỷ niệm #9' },
      { file: 'video_10.mp4', type: 'video', caption: 'Cô bé nhỏ nhắn đáng mến của mọi người 🌻💫', tag: 'Video kỷ niệm #10' },
      { file: 'video_11.mp4', type: 'video', caption: 'Luôn lạc quan và yêu đời như thế này nhé! 😊✨', tag: 'Video kỷ niệm #11' },
      { file: 'video_12.mp4', type: 'video', caption: 'Xinh đẹp rạng ngời trong từng chuyển động 🌺', tag: 'Video kỷ niệm #12' },
      { file: 'video_13.mp4', type: 'video', caption: 'Thêm một kỷ niệm thật đẹp được lưu giữ 🎁🎈', tag: 'Video kỷ niệm #13' },
      { file: 'video_14.mp4', type: 'video', caption: 'Bé Hạt Ngô siêu đáng yêu trong từng khung hình 🌽💕', tag: 'Video kỷ niệm #14' },
      { file: 'video_15.mp4', type: 'video', caption: 'Chúc mừng tuổi mới vạn sự may mắn và hạnh phúc! 🎂🎉', tag: 'Video kỷ niệm #15' },
      { file: 'video_16.mp4', type: 'video', caption: 'Món quà sinh nhật đặc biệt gửi đến Ngọc Trinh 💖✨', tag: 'Video kỷ niệm #16' }
    ];

    // Combine media items (alternating images and videos for variety)
    this.mediaItems = [];
    const maxLen = Math.max(imagesList.length, videosList.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < imagesList.length) this.mediaItems.push(imagesList[i]);
      if (i < videosList.length) this.mediaItems.push(videosList[i]);
    }

    this.activeDrops = [];
    this.currentIndex = 0;
    this.isPaused = false;
    this.spawnInterval = 2600; // ms
    this.maxDrops = 7;
    this.queueIndex = 0;

    this.init();
  }

  init() {
    this.startRainLoop();
    this.renderAlbumGrid();
    this.initLightboxEvents();
    this.initFilterTabs();
  }

  startRainLoop() {
    this.spawnDrop();
    this.intervalId = setInterval(() => {
      if (!this.isPaused && this.activeDrops.length < this.maxDrops) {
        this.spawnDrop();
      }
    }, this.spawnInterval);

    this.animateDrops();
  }

  spawnDrop() {
    if (!this.container) return;

    const item = this.mediaItems[this.queueIndex];
    this.queueIndex = (this.queueIndex + 1) % this.mediaItems.length;

    const dropEl = document.createElement('div');
    dropEl.className = 'memory-drop';

    const size = Math.floor(96 + Math.random() * 46); // 96px - 142px (Bigger memory drops)
    dropEl.style.width = `${size}px`;
    dropEl.style.height = `${size}px`;

    const startX = Math.random() * (window.innerWidth - size - 40) + 20;
    const startY = -size - 20;

    dropEl.style.left = `${startX}px`;
    dropEl.style.top = `${startY}px`;

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.className = 'memory-drop-img';
      video.src = `./media/${item.file}#t=0.1`;
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      dropEl.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.className = 'memory-drop-img';
      img.src = `./media/${item.file}`;
      img.alt = item.caption;
      img.loading = 'lazy';
      dropEl.appendChild(img);
    }

    const badge = document.createElement('span');
    badge.className = 'memory-drop-badge';
    badge.innerHTML = item.type === 'video' ? '🎬 <span>Video</span>' : '❤️ <span>Xem</span>';
    dropEl.appendChild(badge);

    const dropData = {
      el: dropEl,
      x: startX,
      y: startY,
      size: size,
      speed: 0.38 + Math.random() * 0.32, // Slower dreamy fall speed
      vy: 0,
      vx: (Math.random() - 0.5) * 0.6,
      gravity: 0.14,
      bounceVy: -(3.4 + Math.random() * 1.6), // Bounce upward impulse
      hasBounced: false,
      isBouncing: false,
      swayFreq: 0.0016 + Math.random() * 0.002,
      swayAmp: 14 + Math.random() * 18,
      swayAngle: Math.random() * Math.PI * 2,
      baseX: startX,
      mediaIndex: this.mediaItems.indexOf(item),
      birthTime: performance.now(),
      isHovered: false
    };

    const setHover = (hovered) => {
      dropData.isHovered = hovered;
    };

    dropEl.addEventListener('mouseenter', () => setHover(true));
    dropEl.addEventListener('mouseleave', () => setHover(false));
    dropEl.addEventListener('pointerenter', () => setHover(true));
    dropEl.addEventListener('pointerleave', () => setHover(false));

    dropEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.birthdayAudio) window.birthdayAudio.playPopSound();
      this.openPolaroid(dropData.mediaIndex);
      this.removeDrop(dropData, true);
    });

    this.container.appendChild(dropEl);
    this.activeDrops.push(dropData);
  }

  animateDrops() {
    const screenHeight = window.innerHeight;

    for (let i = this.activeDrops.length - 1; i >= 0; i--) {
      const drop = this.activeDrops[i];
      const groundY = screenHeight - drop.size - 40;

      // When hovered, the drop completely freezes in air
      if (drop.isHovered) {
        continue;
      }

      if (!drop.isBouncing) {
        // Normal gentle fall
        drop.y += drop.speed;
        drop.swayAngle += drop.swayFreq * 16;
        drop.x = drop.baseX + Math.sin(drop.swayAngle) * drop.swayAmp;

        // Check if reached ground for the first time -> Bounce up!
        if (drop.y >= groundY && !drop.hasBounced) {
          drop.hasBounced = true;
          drop.isBouncing = true;
          drop.vy = drop.bounceVy;
          this.createSplash(drop.x + drop.size / 2, groundY + drop.size / 2);

          // Squash & Stretch Bounce Animation
          drop.el.style.transition = 'transform 0.12s ease-out';
          drop.el.style.transform = 'scale(1.22, 0.78)';
          setTimeout(() => {
            if (drop.el) {
              drop.el.style.transform = 'scale(0.88, 1.12)';
              setTimeout(() => {
                if (drop.el) drop.el.style.transform = '';
              }, 120);
            }
          }, 100);
        }
      } else {
        // In Bouncing Physics state
        drop.vy += drop.gravity;
        drop.y += drop.vy;
        drop.x += drop.vx;

        // When touching ground the second time -> fade out & pop
        if (drop.y >= groundY && drop.vy > 0) {
          this.createSplash(drop.x + drop.size / 2, groundY + drop.size / 2);
          this.removeDrop(drop, true);
          continue;
        }
      }

      drop.el.style.top = `${drop.y}px`;
      drop.el.style.left = `${drop.x}px`;
    }

    requestAnimationFrame(() => this.animateDrops());
  }

  removeDrop(dropData, isExplosion = false) {
    const idx = this.activeDrops.indexOf(dropData);
    if (idx !== -1) {
      this.activeDrops.splice(idx, 1);
    }
    if (dropData.el && dropData.el.parentNode) {
      if (isExplosion) {
        dropData.el.style.transition = 'all 0.3s ease-out';
        dropData.el.style.transform = 'scale(1.4)';
        dropData.el.style.opacity = '0';
        setTimeout(() => dropData.el.remove(), 300);
      } else {
        dropData.el.remove();
      }
    }
  }

  createSplash(x, y) {
    const splash = document.createElement('div');
    splash.style.position = 'fixed';
    splash.style.left = `${x}px`;
    splash.style.top = `${y}px`;
    splash.style.pointerEvents = 'none';
    splash.style.zIndex = '14';
    splash.style.fontSize = '14px';
    splash.textContent = '✨';
    splash.style.animation = 'float-heart-up 0.8s forwards ease-out';
    document.body.appendChild(splash);
    setTimeout(() => splash.remove(), 800);
  }

  // Polaroid Modal Interactions
  openPolaroid(index) {
    this.currentIndex = index;
    const item = this.mediaItems[this.currentIndex];
    if (!item) return;

    if (this.polaroidMediaContainer) {
      this.polaroidMediaContainer.innerHTML = '';
      if (item.type === 'video') {
        const video = document.createElement('video');
        video.className = 'polaroid-img';
        video.src = `./media/${item.file}`;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        this.polaroidMediaContainer.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.className = 'polaroid-img';
        img.src = `./media/${item.file}`;
        img.alt = item.caption;
        this.polaroidMediaContainer.appendChild(img);
      }
    }

    if (this.polaroidText) this.polaroidText.textContent = item.caption;
    if (this.polaroidDate) this.polaroidDate.textContent = item.tag;
    if (this.heartCountEl) this.heartCountEl.textContent = '100% Yêu Thương ❤️';

    if (this.modal) {
      this.modal.classList.add('active');
    }
  }

  closeModals() {
    // Pause any playing videos in polaroid modal
    if (this.polaroidMediaContainer) {
      const vid = this.polaroidMediaContainer.querySelector('video');
      if (vid) vid.pause();
    }

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
  }

  initLightboxEvents() {
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex - 1 + this.mediaItems.length) % this.mediaItems.length;
        this.openPolaroid(this.currentIndex);
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.mediaItems.length;
        this.openPolaroid(this.currentIndex);
      });
    }

    if (this.btnHeart) {
      this.btnHeart.addEventListener('click', (e) => {
        if (window.birthdayAudio) window.birthdayAudio.playPopSound();
        if (this.heartCountEl) {
          this.heartCountEl.textContent = 'Vô cực Yêu Thương 💖';
        }
        for (let i = 0; i < 6; i++) {
          const h = document.createElement('span');
          h.textContent = '💖';
          h.style.position = 'fixed';
          h.style.left = `${e.clientX + (Math.random() - 0.5) * 40}px`;
          h.style.top = `${e.clientY - 20}px`;
          h.style.pointerEvents = 'none';
          h.style.zIndex = '120';
          h.style.fontSize = '22px';
          h.style.animation = 'float-heart-up 1.2s forwards ease-out';
          document.body.appendChild(h);
          setTimeout(() => h.remove(), 1200);
        }
      });
    }

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModals();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (this.modal && this.modal.classList.contains('active')) {
        if (e.key === 'ArrowRight') this.btnNext && this.btnNext.click();
        if (e.key === 'ArrowLeft') this.btnPrev && this.btnPrev.click();
        if (e.key === 'Escape') this.closeModals();
      }
    });
  }

  // Album Filter Tabs
  initFilterTabs() {
    const filterBtns = document.querySelectorAll('.album-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.albumFilter = btn.getAttribute('data-filter') || 'all';
        this.renderAlbumGrid();
        if (window.birthdayAudio) window.birthdayAudio.playPopSound();
      });
    });
  }

  // Render Full Album Grid with Images & Videos
  renderAlbumGrid() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = this.mediaItems.filter(item => {
      if (this.albumFilter === 'image') return item.type === 'image';
      if (this.albumFilter === 'video') return item.type === 'video';
      return true;
    });

    filtered.forEach((item) => {
      const idx = this.mediaItems.indexOf(item);
      const itemEl = document.createElement('div');
      itemEl.className = 'gallery-item';

      if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = `./media/${item.file}#t=0.5`;
        video.preload = 'metadata';
        video.muted = true;
        video.playsInline = true;
        itemEl.appendChild(video);

        const playBadge = document.createElement('div');
        playBadge.className = 'gallery-video-badge';
        playBadge.innerHTML = '▶️';
        itemEl.appendChild(playBadge);
      } else {
        const img = document.createElement('img');
        img.src = `./media/${item.file}`;
        img.alt = item.caption;
        img.loading = 'lazy';
        itemEl.appendChild(img);
      }

      itemEl.addEventListener('click', () => {
        if (window.birthdayAudio) window.birthdayAudio.playPopSound();
        this.closeModals();
        setTimeout(() => {
          this.openPolaroid(idx);
        }, 150);
      });

      grid.appendChild(itemEl);
    });
  }

  openAlbum() {
    if (this.albumModal) {
      this.albumModal.classList.add('active');
    }
  }
}

// Global Rain System
document.addEventListener('DOMContentLoaded', () => {
  window.rainMemories = new RainMemoriesSystem();
});
