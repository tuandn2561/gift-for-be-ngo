/**
 * Sweet Birthday & Romantic Piano Ballad Sound System
 * Pure Web Audio API: 100% offline, crystal-clear, zero lag, gorgeous soundscapes.
 */

class BirthdayAudioSystem {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.55;
    this.timerId = null;
    this.currentNoteIndex = 0;
    this.masterGain = null;

    // Rich Track List: 1 Happy Birthday + 4 Iconic Romantic Piano Ballads
    this.tracks = [
      {
        title: "Happy Birthday Music Box",
        artist: "Hộp Nhạc Kỷ Niệm 🎂✨",
        tempo: 108,
        type: 'music-box',
        melody: [
          // Phrase 1: Happy birthday to you
          { note: 'G4', dur: 0.75, chord: 'C' },
          { note: 'G4', dur: 0.25, chord: 'C' },
          { note: 'A4', dur: 1.0,  chord: 'C' },
          { note: 'G4', dur: 1.0,  chord: 'C' },
          { note: 'C5', dur: 1.0,  chord: 'F' },
          { note: 'B4', dur: 2.0,  chord: 'G' },

          // Phrase 2: Happy birthday to you
          { note: 'G4', dur: 0.75, chord: 'G' },
          { note: 'G4', dur: 0.25, chord: 'G' },
          { note: 'A4', dur: 1.0,  chord: 'G' },
          { note: 'G4', dur: 1.0,  chord: 'G' },
          { note: 'D5', dur: 1.0,  chord: 'G7' },
          { note: 'C5', dur: 2.0,  chord: 'C' },

          // Phrase 3: Happy birthday dear chị Ngọc Trinh
          { note: 'G4', dur: 0.75, chord: 'C' },
          { note: 'G4', dur: 0.25, chord: 'C' },
          { note: 'G5', dur: 1.0,  chord: 'C' },
          { note: 'E5', dur: 1.0,  chord: 'F' },
          { note: 'C5', dur: 1.0,  chord: 'F' },
          { note: 'B4', dur: 1.0,  chord: 'Dm' },
          { note: 'A4', dur: 1.5,  chord: 'F' },

          // Phrase 4: Happy birthday to you!
          { note: 'F5', dur: 0.75, chord: 'F' },
          { note: 'F5', dur: 0.25, chord: 'F' },
          { note: 'E5', dur: 1.0,  chord: 'C' },
          { note: 'C5', dur: 1.0,  chord: 'Am' },
          { note: 'D5', dur: 1.0,  chord: 'G7' },
          { note: 'C5', dur: 2.5,  chord: 'C' },
          
          // Sweet Outro
          { note: 'E5', dur: 0.5, chord: 'C' },
          { note: 'G5', dur: 0.5, chord: 'C' },
          { note: 'C6', dur: 2.2, chord: 'Cmaj7' }
        ]
      },
      {
        title: "River Flows In You",
        artist: "Yiruma • Dương Cầm Lãng Mạn 🌊🎹",
        tempo: 86,
        type: 'piano',
        melody: [
          // Theme A
          { note: 'A5', dur: 0.5, chord: 'F#m' },
          { note: 'G#5', dur: 0.5, chord: 'F#m' },
          { note: 'A5', dur: 1.0, chord: 'F#m' },
          { note: 'E5', dur: 1.0, chord: 'F#m' },
          
          { note: 'A5', dur: 0.5, chord: 'D' },
          { note: 'G#5', dur: 0.5, chord: 'D' },
          { note: 'A5', dur: 1.0, chord: 'D' },
          { note: 'E5', dur: 1.0, chord: 'D' },

          { note: 'A5', dur: 0.5, chord: 'A' },
          { note: 'G#5', dur: 0.5, chord: 'A' },
          { note: 'A5', dur: 0.5, chord: 'A' },
          { note: 'B5', dur: 0.5, chord: 'A' },
          { note: 'C#6', dur: 1.0, chord: 'A' },
          { note: 'B5', dur: 1.0, chord: 'E' },

          { note: 'A5', dur: 0.5, chord: 'E' },
          { note: 'G#5', dur: 0.5, chord: 'E' },
          { note: 'F#5', dur: 1.0, chord: 'E' },
          { note: 'E5', dur: 1.0, chord: 'E' },

          // Theme B - Flowing Arpeggios
          { note: 'C#5', dur: 0.5, chord: 'F#m' },
          { note: 'D5', dur: 0.5, chord: 'F#m' },
          { note: 'E5', dur: 1.0, chord: 'F#m' },
          { note: 'C#5', dur: 0.5, chord: 'F#m' },
          { note: 'D5', dur: 0.5, chord: 'F#m' },
          { note: 'E5', dur: 1.0, chord: 'F#m' },

          { note: 'F#5', dur: 0.5, chord: 'D' },
          { note: 'E5', dur: 0.5, chord: 'D' },
          { note: 'D5', dur: 1.0, chord: 'D' },
          { note: 'C#5', dur: 0.5, chord: 'D' },
          { note: 'D5', dur: 0.5, chord: 'D' },
          { note: 'E5', dur: 1.0, chord: 'D' },

          { note: 'A4', dur: 0.5, chord: 'A' },
          { note: 'B4', dur: 0.5, chord: 'A' },
          { note: 'C#5', dur: 1.0, chord: 'A' },
          { note: 'B4', dur: 0.5, chord: 'E' },
          { note: 'A4', dur: 0.5, chord: 'E' },
          { note: 'B4', dur: 1.5, chord: 'E' },
          { note: 'A4', dur: 2.5, chord: 'A' }
        ]
      },
      {
        title: "Kiss The Rain",
        artist: "Yiruma • Nụ Hôn Dưới Mưa 🌧️💖",
        tempo: 78,
        type: 'piano',
        melody: [
          // Gentle Rain Melody
          { note: 'C5', dur: 0.75, chord: 'C' },
          { note: 'D5', dur: 0.25, chord: 'C' },
          { note: 'E5', dur: 1.0,  chord: 'C' },
          { note: 'G5', dur: 1.0,  chord: 'C' },
          { note: 'E5', dur: 1.0,  chord: 'C' },

          { note: 'D5', dur: 0.75, chord: 'G' },
          { note: 'C5', dur: 0.25, chord: 'G' },
          { note: 'D5', dur: 1.5,  chord: 'G' },
          { note: 'E5', dur: 0.5,  chord: 'G' },
          { note: 'D5', dur: 1.0,  chord: 'G' },

          { note: 'C5', dur: 0.75, chord: 'Am' },
          { note: 'B4', dur: 0.25, chord: 'Am' },
          { note: 'A4', dur: 1.0,  chord: 'Am' },
          { note: 'C5', dur: 1.0,  chord: 'Am' },
          { note: 'E5', dur: 1.0,  chord: 'Am' },

          { note: 'G4', dur: 0.75, chord: 'Em' },
          { note: 'A4', dur: 0.25, chord: 'Em' },
          { note: 'G4', dur: 2.0,  chord: 'Em' },

          { note: 'F4', dur: 0.75, chord: 'F' },
          { note: 'G4', dur: 0.25, chord: 'F' },
          { note: 'A4', dur: 1.0,  chord: 'F' },
          { note: 'C5', dur: 1.0,  chord: 'F' },
          { note: 'A4', dur: 1.0,  chord: 'F' },

          { note: 'E4', dur: 0.75, chord: 'C' },
          { note: 'F4', dur: 0.25, chord: 'C' },
          { note: 'G4', dur: 1.0,  chord: 'C' },
          { note: 'C5', dur: 1.0,  chord: 'C' },
          { note: 'G4', dur: 1.0,  chord: 'C' },

          { note: 'D4', dur: 0.75, chord: 'Dm' },
          { note: 'E4', dur: 0.25, chord: 'Dm' },
          { note: 'F4', dur: 1.0,  chord: 'Dm' },
          { note: 'A4', dur: 1.0,  chord: 'G7' },
          { note: 'B4', dur: 1.0,  chord: 'G7' },
          { note: 'C5', dur: 2.8,  chord: 'C' }
        ]
      },
      {
        title: "Can't Help Falling In Love",
        artist: "Elvis Presley • Say Tình Dịu Êm 🌹✨",
        tempo: 84,
        type: 'piano',
        melody: [
          // Wise men say...
          { note: 'C4', dur: 1.0, chord: 'C' },
          { note: 'G4', dur: 1.0, chord: 'C' },
          { note: 'C5', dur: 1.5, chord: 'C' },

          // Only fools rush in...
          { note: 'B4', dur: 0.5, chord: 'Em' },
          { note: 'A4', dur: 1.0, chord: 'Em' },
          { note: 'G4', dur: 1.0, chord: 'Em' },
          { note: 'A4', dur: 1.5, chord: 'Am' },

          // But I can't help...
          { note: 'G4', dur: 0.5, chord: 'Am' },
          { note: 'F4', dur: 1.0, chord: 'F' },
          { note: 'E4', dur: 1.0, chord: 'C' },
          { note: 'D4', dur: 2.0, chord: 'G' },

          // Falling in love with you...
          { note: 'E4', dur: 0.5, chord: 'C' },
          { note: 'F4', dur: 0.5, chord: 'C' },
          { note: 'G4', dur: 1.0, chord: 'C' },
          { note: 'A4', dur: 1.0, chord: 'F' },
          { note: 'G4', dur: 1.0, chord: 'C' },
          
          { note: 'F4', dur: 0.5, chord: 'F' },
          { note: 'E4', dur: 0.5, chord: 'C' },
          { note: 'D4', dur: 1.0, chord: 'G7' },
          { note: 'C4', dur: 2.5, chord: 'C' },

          // Chorus Lift
          { note: 'G4', dur: 1.0, chord: 'Em' },
          { note: 'B4', dur: 1.0, chord: 'Em' },
          { note: 'D5', dur: 1.5, chord: 'Em' },
          { note: 'C5', dur: 0.5, chord: 'Am' },
          { note: 'B4', dur: 1.0, chord: 'Am' },
          { note: 'A4', dur: 1.0, chord: 'Am' },
          { note: 'G4', dur: 2.0, chord: 'G' }
        ]
      },
      {
        title: "Secret Garden Romance",
        artist: "Song From A Secret Garden 🌿🌠",
        tempo: 80,
        type: 'piano',
        melody: [
          // Main Theme
          { note: 'E5', dur: 1.0, chord: 'Am' },
          { note: 'B4', dur: 1.0, chord: 'Am' },
          { note: 'C5', dur: 1.0, chord: 'Am' },
          { note: 'D5', dur: 1.0, chord: 'Am' },
          { note: 'C5', dur: 0.5, chord: 'Am' },
          { note: 'B4', dur: 0.5, chord: 'Am' },
          { note: 'A4', dur: 1.5, chord: 'Am' },

          { note: 'A4', dur: 0.5, chord: 'Dm' },
          { note: 'C5', dur: 1.0, chord: 'Dm' },
          { note: 'E5', dur: 1.0, chord: 'Dm' },
          { note: 'D5', dur: 0.5, chord: 'Dm' },
          { note: 'C5', dur: 0.5, chord: 'Dm' },
          { note: 'B4', dur: 1.5, chord: 'E' },

          { note: 'C5', dur: 0.5, chord: 'Am' },
          { note: 'D5', dur: 1.0, chord: 'Am' },
          { note: 'E5', dur: 1.5, chord: 'Am' },
          { note: 'C5', dur: 1.0, chord: 'Am' },
          { note: 'A4', dur: 1.0, chord: 'Am' },
          { note: 'A4', dur: 2.0, chord: 'Am' },

          // Soaring Phrase
          { note: 'D5', dur: 1.0, chord: 'F' },
          { note: 'F5', dur: 1.0, chord: 'F' },
          { note: 'A5', dur: 1.5, chord: 'F' },
          { note: 'G5', dur: 0.5, chord: 'C' },
          { note: 'F5', dur: 0.5, chord: 'C' },
          { note: 'E5', dur: 1.5, chord: 'C' },

          { note: 'C5', dur: 0.5, chord: 'E7' },
          { note: 'E5', dur: 1.0, chord: 'E7' },
          { note: 'D5', dur: 0.5, chord: 'E7' },
          { note: 'C5', dur: 0.5, chord: 'E7' },
          { note: 'B4', dur: 1.0, chord: 'E7' },
          { note: 'B4', dur: 0.5, chord: 'E7' },
          { note: 'C5', dur: 0.5, chord: 'E7' },
          { note: 'D5', dur: 1.0, chord: 'E7' },
          { note: 'E5', dur: 1.5, chord: 'E7' },

          { note: 'C5', dur: 1.0, chord: 'Am' },
          { note: 'A4', dur: 1.0, chord: 'Am' },
          { note: 'A4', dur: 2.8, chord: 'Am' }
        ]
      }
    ];

    // Complete note frequencies across 4 octaves
    this.noteFreqs = {
      'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
      'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98, 'A6': 1760.00
    };

    // Harmonic chord maps for acoustic backing
    this.chordHarmonies = {
      'C': ['C3', 'G3', 'C4', 'E4'],
      'F': ['F3', 'C4', 'F4', 'A4'],
      'G': ['G3', 'D4', 'G4', 'B4'],
      'G7': ['G3', 'D4', 'F4', 'B4'],
      'Am': ['A3', 'E4', 'A4', 'C5'],
      'Em': ['E3', 'B3', 'E4', 'G4'],
      'Dm': ['D3', 'A3', 'D4', 'F4'],
      'F#m': ['F#3', 'C#4', 'F#4', 'A4'],
      'D': ['D3', 'A3', 'D4', 'F#4'],
      'A': ['A3', 'E4', 'A4', 'C#5'],
      'E': ['E3', 'B3', 'E4', 'G#4'],
      'E7': ['E3', 'B3', 'D4', 'G#4'],
      'Cmaj7': ['C3', 'G3', 'B3', 'E4', 'G4']
    };

    this.initDOM();
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initDOM() {
    this.vinylDisc = document.getElementById('vinyl-disc');
    this.trackTitleEl = document.getElementById('player-track-title');
    this.trackArtistEl = document.getElementById('player-track-artist');
    this.playBtn = document.getElementById('btn-play-music');
    this.prevBtn = document.getElementById('btn-prev-music');
    this.nextBtn = document.getElementById('btn-next-music');
    this.volumeSlider = document.getElementById('player-volume-slider');
    this.volumeIcon = document.getElementById('player-volume-icon');

    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextTrack());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevTrack());
    }
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        this.setVolume(parseFloat(e.target.value));
      });
    }

    // Connect envelope open triggers
    const btnOpenEnvelope = document.getElementById('btn-open-envelope');
    const introWaxSeal = document.getElementById('intro-wax-seal');
    const introOverlay = document.getElementById('intro-overlay');

    const handleOpenIntro = (e) => {
      if (e) e.stopPropagation();
      this.initAudioContext();
      if (!this.isPlaying) {
        this.play();
      }

      // 3D Envelope flip animation
      const envelopeWrapper = document.getElementById('intro-envelope');
      if (envelopeWrapper) {
        envelopeWrapper.classList.add('opened');
      }

      // Pop confetti burst
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      // Fade out overlay smoothly after letter emerges
      setTimeout(() => {
        if (introOverlay) {
          introOverlay.classList.add('fade-out');
          setTimeout(() => {
            introOverlay.style.display = 'none';
          }, 800);
        }
      }, 1000);
    };

    if (btnOpenEnvelope) {
      btnOpenEnvelope.addEventListener('click', handleOpenIntro);
    }
    if (introWaxSeal) {
      introWaxSeal.addEventListener('click', handleOpenIntro);
    }

    // Any first user action activates sound context
    const onFirstUserAction = () => {
      this.initAudioContext();
      if (!this.isPlaying) {
        this.play();
      }
      ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, onFirstUserAction);
        document.removeEventListener(evt, onFirstUserAction);
      });
    };

    ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, onFirstUserAction, { passive: true });
      document.addEventListener(evt, onFirstUserAction, { passive: true });
    });
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
    if (this.volumeIcon) {
      if (this.volume === 0) this.volumeIcon.textContent = '🔇';
      else if (this.volume < 0.4) this.volumeIcon.textContent = '🔈';
      else if (this.volume < 0.75) this.volumeIcon.textContent = '🔉';
      else this.volumeIcon.textContent = '🔊';
    }
  }

  updateUI() {
    const track = this.tracks[this.currentTrackIndex];
    if (this.trackTitleEl) this.trackTitleEl.textContent = track.title;
    if (this.trackArtistEl) this.trackArtistEl.textContent = track.artist;
    if (this.playBtn) {
      this.playBtn.innerHTML = this.isPlaying 
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="4.5" height="16" rx="1.5"/><rect x="14.5" y="4" width="4.5" height="16" rx="1.5"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 19,12 6,20"/></svg>';
    }
    if (this.vinylDisc) {
      if (this.isPlaying) {
        this.vinylDisc.classList.add('spinning');
      } else {
        this.vinylDisc.classList.remove('spinning');
      }
    }
  }

  togglePlay() {
    this.initAudioContext();
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.initAudioContext();
    this.isPlaying = true;
    this.updateUI();
    this.scheduleNextNote();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.updateUI();
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.currentNoteIndex = 0;
    this.updateUI();
    if (this.isPlaying) {
      if (this.timerId) clearTimeout(this.timerId);
      this.scheduleNextNote();
    }
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.currentNoteIndex = 0;
    this.updateUI();
    if (this.isPlaying) {
      if (this.timerId) clearTimeout(this.timerId);
      this.scheduleNextNote();
    }
  }

  scheduleNextNote() {
    if (!this.isPlaying || !this.audioCtx) return;

    const track = this.tracks[this.currentTrackIndex];
    const melody = track.melody;
    if (!melody || melody.length === 0) return;

    const beatSec = 60 / track.tempo;
    const noteData = melody[this.currentNoteIndex];
    const duration = noteData.dur * beatSec;

    // Play note with track type styling
    this.playTone(noteData.note, duration, track.type, noteData.chord);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % melody.length;

    this.timerId = setTimeout(() => {
      this.scheduleNextNote();
    }, duration * 1000);
  }

  playTone(noteName, duration, trackType, chordName) {
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const freq = this.noteFreqs[noteName] || 440;

    // Main Melody Oscillator
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    if (trackType === 'music-box') {
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.8);

      // Sweet bell chime overtone
      const chime = this.audioCtx.createOscillator();
      const chimeGain = this.audioCtx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(freq * 2.01, now);
      chimeGain.gain.setValueAtTime(0.12, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.2);
      chime.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chime.start(now);
      chime.stop(now + duration * 1.2);
    } else {
      // Warm, Realistic Acoustic Piano Sound
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.42, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.6);

      // Piano body hammer resonance
      const hammer = this.audioCtx.createOscillator();
      const hammerGain = this.audioCtx.createGain();
      hammer.type = 'sine';
      hammer.frequency.setValueAtTime(freq * 0.5, now);
      hammerGain.gain.setValueAtTime(0.15, now);
      hammerGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
      hammer.connect(hammerGain);
      hammerGain.connect(this.masterGain);
      hammer.start(now);
      hammer.stop(now + duration * 0.8);
    }

    osc.frequency.setValueAtTime(freq, now);
    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration * 2);

    // Play romantic soft chord backing on bar start
    if (chordName && this.chordHarmonies[chordName] && (this.currentNoteIndex % 2 === 0)) {
      this.playSoftChord(this.chordHarmonies[chordName], duration * 2.0, trackType);
    }
  }

  playSoftChord(chordNotes, duration, trackType) {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    chordNotes.forEach((note, index) => {
      const freq = this.noteFreqs[note];
      if (!freq) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + (index * 0.05));

      gain.gain.setValueAtTime(0.09, now + (index * 0.05));
      gain.gain.exponentialRampToValueAtTime(0.0004, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + (index * 0.05));
      osc.stop(now + duration);
    });
  }

  // Sound Effects
  playPopSound() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playBlowCandleSound() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.4);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.35);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
  }

  playChimeSound() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);

      gain.gain.setValueAtTime(0.22, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.65);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.65);
    });
  }
}

// Global Audio Instance
window.addEventListener('DOMContentLoaded', () => {
  window.birthdayAudio = new BirthdayAudioSystem();
});
