/**
 * 🌸 ULTRA-BESPOKE 3D BIRTHDAY ODYSSEY FOR REET
 * Main Application Interactive Logic & 3D Physics Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  initGatekeeper();
  initEnvelopeCeremony();
  initKeychainBadge();
  initScrapbookSection();
  initLittleWorldArtifacts();
  initGiftBox();
  initVirtualHugHold();
  initSwipeableDeck();
  initAugust19Countdown();
  initAmbientSoundBar();
  initParallaxCards();
  initGlobalHeartSpawner();

  // Ensure all cinematic background videos start playing immediately
  document.querySelectorAll('.hero-cinematic-video').forEach(video => {
    video.play().catch(() => {});
  });
});

function initGlobalHeartSpawner() {
  const heartIcons = ['❤️', '💖', '💕', '💗', '🤍', '✨', '🥺'];
  
  const spawnHearts = (x, y, count = 4) => {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'screen-heart-particle';
      heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty('--randX', `${(Math.random() - 0.5) * 90}px`);
      heart.style.setProperty('--randRot', `${(Math.random() - 0.5) * 60}deg`);
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1200);
    }
  };

  window.addEventListener('click', (e) => {
    spawnHearts(e.clientX, e.clientY, 3);
  });

  window.addEventListener('dblclick', (e) => {
    spawnHearts(e.clientX, e.clientY, 12);
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      spawnHearts(e.touches[0].clientX, e.touches[0].clientY, 4);
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   🌸 4.0 THE PLAYFUL GATEKEEPER (Cute Exclusivity Gate)
   -------------------------------------------------------------------------- */
function initGatekeeper() {
  const overlay = document.getElementById('gatekeeper-overlay');
  const btnConfirm = document.getElementById('btn-reet-confirm');
  const btnEvasive = document.getElementById('btn-evasive');

  if (!overlay || !btnConfirm || !btnEvasive) return;

  // "I am Reet! 🤍"
  btnConfirm.addEventListener('click', (e) => {
    if (window.birthdayAudio) {
      window.birthdayAudio.playHarpGlissando();
      window.birthdayAudio.startAmbientMusic();
    }
    const soundBar = document.querySelector('.ambient-sound-bar');
    const soundStatus = document.getElementById('sound-status-text');
    if (soundBar) soundBar.classList.add('sound-playing');
    if (soundStatus) soundStatus.textContent = "Playing Romantic Song 🎶";

    if (window.birthday3D) {
      window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 35);
    }

    const cinematicVideo = document.querySelector('.hero-cinematic-video');
    if (cinematicVideo && cinematicVideo.paused) {
      cinematicVideo.play().catch(() => {});
    }

    overlay.classList.add('unlocked');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 850);
  });

  // Evasive "I'm someone else" button
  const evasivePhrases = [
    "Nope! You can't click me! 🏃‍♂️💨",
    "Access strictly for Reet! 👀",
    "Nice try, but no! 🤭",
    "Keep trying! 😂",
    "Only Reet allowed! 🤍"
  ];

  let phraseIdx = 0;

  const moveEvasiveButton = (e) => {
    const rect = btnEvasive.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dist = Math.hypot(clientX - btnCenterX, clientY - btnCenterY);

    if (dist < 110) {
      const offsetX = (Math.random() - 0.5) * 220;
      const offsetY = (Math.random() - 0.5) * 140;

      btnEvasive.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${(Math.random() - 0.5) * 20}deg)`;
      btnEvasive.textContent = evasivePhrases[phraseIdx % evasivePhrases.length];
      phraseIdx++;

      if (window.birthdayAudio) {
        window.birthdayAudio.playChime();
      }
    }
  };

  document.addEventListener('mousemove', moveEvasiveButton);
  document.addEventListener('touchmove', moveEvasiveButton, { passive: true });
}

/* --------------------------------------------------------------------------
   💌 4.1 THE 3D WAX-SEALED ENVELOPE CEREMONY
   -------------------------------------------------------------------------- */
function initEnvelopeCeremony() {
  const envelope = document.getElementById('wax-envelope');
  const waxSeal = document.getElementById('wax-seal');

  if (!envelope || !waxSeal) return;

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();

    if (window.birthdayAudio) {
      window.birthdayAudio.playHarpGlissando();
    }
    if (window.birthday3D) {
      window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 40);
    }

    envelope.classList.add('opened');

    setTimeout(() => {
      const hero = document.getElementById('hero-monument');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   👑 4.2 HERO WOBBLING KEYCHAIN BADGE (Touch & Mouse Ready)
   -------------------------------------------------------------------------- */
function initKeychainBadge() {
  const badge = document.getElementById('keychain-badge');
  if (!badge) return;

  let isDragging = false;
  let startX = 0;

  const onStart = (clientX) => {
    isDragging = true;
    startX = clientX;
    if (window.birthdayAudio) window.birthdayAudio.playChime();
  };

  const onMove = (clientX) => {
    if (!isDragging) return;
    const diff = (clientX - startX) * 0.45;
    badge.style.transform = `rotate(${Math.max(-25, Math.min(25, diff))}deg) translateY(${Math.abs(diff) * 0.2}px)`;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    badge.style.transform = 'rotate(0deg)';
    if (window.birthdayAudio) window.birthdayAudio.playChime();
  };

  badge.addEventListener('mousedown', (e) => onStart(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onEnd);

  badge.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) onStart(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) onMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', onEnd);
}

/* --------------------------------------------------------------------------
   📸 SECTION 14: THE "FUTURE PLANS & FLIRTY CONVOS" ARCHIVE (Scrapbook)
   -------------------------------------------------------------------------- */
function initScrapbookSection() {
  const grid = document.getElementById('scrapbook-grid');
  if (!grid || typeof futureMomentsData === 'undefined') return;

  grid.innerHTML = '';

  futureMomentsData.forEach((item, index) => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'moment-card-container polaroid-card-container';
    cardContainer.setAttribute('data-id', item.id);

    cardContainer.innerHTML = `
      <div class="moment-card-inner polaroid-card-inner">
        <!-- Front -->
        <div class="moment-card-front polaroid-front">
          <div class="polaroid-image-frame" data-file="${item.file}">
            <img src="assets/images/${item.file}" alt="${item.title}" class="polaroid-image" loading="lazy" decoding="async">
            <span class="polaroid-tag-badge">${item.tag}</span>
          </div>
          <div class="polaroid-caption-area">
            <h4 class="polaroid-title">${item.title}</h4>
            <p class="polaroid-caption">${item.caption}</p>
          </div>
          <span class="polaroid-flip-hint">TAP TO FLIP ↺</span>
        </div>

        <!-- Back (Secret Sticky Note) -->
        <div class="moment-card-back polaroid-back">
          <p class="secret-note-text">"${item.secretNote}"</p>
          <div class="polaroid-back-footer">— your Uttu puttu 🤍</div>
        </div>
      </div>
    `;

    // Touch & Click 3D Card Flip Handler (Scroll-safe, reliable 180° flip)
    let touchStartX = 0;
    let touchStartY = 0;
    let hasScrolled = false;

    cardContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      hasScrolled = false;
    }, { passive: true });

    cardContainer.addEventListener('touchmove', (e) => {
      const diffX = Math.abs(e.touches[0].clientX - touchStartX);
      const diffY = Math.abs(e.touches[0].clientY - touchStartY);
      if (diffX > 8 || diffY > 8) {
        hasScrolled = true; // User is scrolling, do not flip
      }
    }, { passive: true });

    cardContainer.addEventListener('touchend', (e) => {
      if (!hasScrolled) {
        const inner = cardContainer.querySelector('.moment-card-inner') || cardContainer.querySelector('.polaroid-card-inner');
        cardContainer.classList.toggle('flipped');
        if (inner) {
          inner.classList.toggle('is-flipped');
        }
        if (window.birthdayAudio) {
          window.birthdayAudio.playChime(index % 8);
        }
        if (window.birthday3D && e.changedTouches && e.changedTouches[0]) {
          window.birthday3D.spawnBloomBurst(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 15);
        }
      }
    });

    // Desktop click support
    cardContainer.addEventListener('click', (e) => {
      if (e.pointerType !== 'touch') {
        const inner = cardContainer.querySelector('.moment-card-inner') || cardContainer.querySelector('.polaroid-card-inner');
        cardContainer.classList.toggle('flipped');
        if (inner) {
          inner.classList.toggle('is-flipped');
        }
        if (window.birthdayAudio) {
          window.birthdayAudio.playChime(index % 8);
        }
        if (window.birthday3D) {
          window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 15);
        }
      }
    });

    grid.appendChild(cardContainer);
  });
}

/* --------------------------------------------------------------------------
   🌷 4.4 OUR LITTLE WORLD: 7 INTERACTIVE 3D ARTIFACTS
   -------------------------------------------------------------------------- */
function initLittleWorldArtifacts() {
  // 1. Dictionary
  const dict = document.getElementById('artifact-dictionary');
  if (dict) {
    dict.addEventListener('click', () => {
      if (window.birthdayAudio) window.birthdayAudio.playChime(3);
    });
  }

  // 2. Uttu Puttu Rotary Stamp
  const stampBtn = document.getElementById('stamp-dial-btn');
  const stampLayer = document.getElementById('stamp-marks-layer');

  if (stampBtn && stampLayer) {
    stampBtn.addEventListener('click', (e) => {
      if (window.birthdayAudio) window.birthdayAudio.playStampSound();
      if (window.birthday3D) window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 20);

      const stamp = document.createElement('div');
      stamp.className = 'screen-stamp';
      stamp.innerHTML = 'Uttu puttu 🤍';
      stamp.style.left = `${Math.random() * (window.innerWidth - 180)}px`;
      stamp.style.top = `${Math.random() * (window.innerHeight - 80)}px`;
      stamp.style.setProperty('--rot', `${(Math.random() - 0.5) * 30}deg`);

      stampLayer.appendChild(stamp);

      setTimeout(() => {
        stamp.style.transition = 'opacity 0.6s ease';
        stamp.style.opacity = '0';
        setTimeout(() => stamp.remove(), 600);
      }, 3500);
    });
  }

  // 3. Infinite Hug Meter
  const hugBtn = document.getElementById('hug-meter-btn');
  const hugFill = document.getElementById('hug-meter-fill');
  const hugCountText = document.getElementById('hug-meter-count');

  let hugCount = parseInt(localStorage.getItem('reet_hug_count') || '10819');
  if (hugCountText) hugCountText.textContent = `${hugCount.toLocaleString()} Hugs`;

  if (hugBtn) {
    hugBtn.addEventListener('click', (e) => {
      hugCount++;
      localStorage.setItem('reet_hug_count', hugCount.toString());
      if (hugCountText) hugCountText.textContent = `${hugCount.toLocaleString()} Hugs`;

      if (hugFill) {
        hugFill.style.transform = 'scale(1.04)';
        setTimeout(() => hugFill.style.transform = 'scale(1)', 200);
      }

      if (window.birthdayAudio) window.birthdayAudio.playChime(4);
      if (window.birthday3D) window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 16);
    });
  }

  // 4. Cheek Kiss Promissory Ticket
  const kissTicket = document.getElementById('cheek-kiss-ticket');
  if (kissTicket) {
    kissTicket.addEventListener('click', (e) => {
      if (window.birthdayAudio) window.birthdayAudio.playHarpGlissando();
      if (window.birthday3D) window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 25);
      alert("Cheek kiss successfully marked for in-person redemption! 😌😘 (Non-negotiable!)");
    });
  }

  // 5. Suspicious Dream Dossier
  const dossier = document.getElementById('dossier-card');
  if (dossier) {
    dossier.addEventListener('click', (e) => {
      if (window.birthdayAudio) window.birthdayAudio.playChime(1);
    });
  }

  // 6. Guitar Masterclass Pluck
  const strings = document.querySelectorAll('.guitar-string');
  strings.forEach((str, idx) => {
    str.addEventListener('click', () => {
      if (window.birthdayAudio) window.birthdayAudio.playGuitarPluck(idx);
    });
  });

  // 7. White Lilies Herbarium
  const herbarium = document.getElementById('artifact-herbarium');
  if (herbarium) {
    herbarium.addEventListener('click', (e) => {
      if (window.birthdayAudio) window.birthdayAudio.playHarpGlissando();
      if (window.birthday3D) window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 30);
    });
  }
}

/* --------------------------------------------------------------------------
   🎁 4.5 THE INTERACTIVE 3D MYSTERY GIFT BOX
   -------------------------------------------------------------------------- */
function initGiftBox() {
  const giftBox = document.getElementById('mystery-gift-box');
  const section = document.getElementById('gift-box-section');
  const giftVideo = document.getElementById('gift-guitar-video');

  if (!giftBox || !section) return;

  giftBox.addEventListener('click', (e) => {
    const isNowOpened = section.classList.toggle('gift-opened');

    if (window.birthdayAudio) {
      window.birthdayAudio.playHarpGlissando();
    }
    if (window.birthday3D) {
      window.birthday3D.spawnBloomBurst(e.clientX, e.clientY, 50);
    }

    if (isNowOpened && giftVideo) {
      // Gentle scroll to center revealed gift
      setTimeout(() => {
        giftVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  });

  // Handle gift box video audio ducking and play button
  const btnGiftPlay = document.getElementById('btn-gift-guitar-play');
  if (giftVideo) {
    if (btnGiftPlay) {
      btnGiftPlay.addEventListener('click', () => {
        if (giftVideo.paused) {
          giftVideo.play();
        } else {
          giftVideo.pause();
        }
      });
    }

    giftVideo.addEventListener('play', () => {
      if (btnGiftPlay) btnGiftPlay.textContent = 'Pause ⏸️';
      const frame = document.getElementById('gift-concert-frame');
      if (frame) frame.classList.add('is-playing');

      if (window.birthdayAudio) {
        window.birthdayAudio.pauseAmbientMusic();
      }
      if (window.birthday3D) {
        window.birthday3D.spawnBloomBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
      }
    });

    giftVideo.addEventListener('pause', () => {
      if (btnGiftPlay) btnGiftPlay.textContent = 'Play it for me 🎵';
      const frame = document.getElementById('gift-concert-frame');
      if (frame) frame.classList.remove('is-playing');

      if (window.birthdayAudio) {
        window.birthdayAudio.resumeAmbientMusic();
      }
    });

    giftVideo.addEventListener('ended', () => {
      if (btnGiftPlay) btnGiftPlay.textContent = 'Play it for me 🎵';
      const frame = document.getElementById('gift-concert-frame');
      if (frame) frame.classList.remove('is-playing');

      if (window.birthdayAudio) {
        window.birthdayAudio.resumeAmbientMusic();
      }
      if (window.birthday3D) {
        window.birthday3D.spawnBloomBurst(window.innerWidth / 2, window.innerHeight / 2, 50);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   🫂 4.6 THE 3-SECOND "WARM EMBRACE" VIRTUAL HUG
   -------------------------------------------------------------------------- */
function initVirtualHugHold() {
  const hugBtn = document.getElementById('btn-hug-hold');
  const circle = document.getElementById('hug-progress-circle');
  const bloomOverlay = document.getElementById('hug-bloom-overlay');
  const bloomClose = document.getElementById('bloom-close-btn');

  if (!hugBtn || !circle || !bloomOverlay) return;

  const totalLength = 628; // 2 * PI * 100
  let holdStart = 0;
  let animationFrame = null;
  const holdDuration = 3000; // 3 seconds

  const startHold = (e) => {
    e.preventDefault();
    holdStart = performance.now();
    hugBtn.classList.add('holding');

    if (window.birthdayAudio) {
      window.birthdayAudio.startHeartbeatLoop();
    }

    const updateProgress = (now) => {
      const elapsed = now - holdStart;
      const progress = Math.min(1, elapsed / holdDuration);
      const offset = totalLength - (progress * totalLength);
      circle.style.strokeDashoffset = offset;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        triggerHugSuccess();
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
  };

  const endHold = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    circle.style.strokeDashoffset = totalLength;
    hugBtn.classList.remove('holding');

    if (window.birthdayAudio) {
      window.birthdayAudio.stopHeartbeatLoop();
    }
  };

  const triggerHugSuccess = () => {
    endHold();
    bloomOverlay.classList.add('active');

    if (window.birthdayAudio) {
      window.birthdayAudio.playHarpGlissando();
    }
    if (window.birthday3D) {
      window.birthday3D.spawnBloomBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
    }
  };

  hugBtn.addEventListener('mousedown', startHold);
  hugBtn.addEventListener('touchstart', startHold, { passive: false });

  window.addEventListener('mouseup', endHold);
  window.addEventListener('touchend', endHold);

  if (bloomClose) {
    bloomClose.addEventListener('click', () => {
      bloomOverlay.classList.remove('active');
      if (window.birthdayAudio) window.birthdayAudio.playChime(5);
    });
  }

  bloomOverlay.addEventListener('click', (e) => {
    if (e.target === bloomOverlay) {
      bloomOverlay.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   🃏 4.8 THE "YOU ARE..." 3D SWIPEABLE CARD DECK
   -------------------------------------------------------------------------- */
function initSwipeableDeck() {
  const container = document.getElementById('swipe-deck-container');
  const btnNext = document.getElementById('deck-next-btn');

  if (!container) return;

  const cardsData = [
    { q: "Cute?", a: "1000% Confirmed 🧸" },
    { q: "Irresistibly Cute?", a: "Literally all the time 🥺✨" },
    { q: "Prettiest Smile?", a: "Lights up my whole day ✨🤍" },
    { q: "Best Part of My Day?", a: "Every single conversation 😌❤️" },
    { q: "Baby?", a: "Obviously. ❤️" },
    { q: "My Favorite Person to Annoy?", a: "My full-time job 😂" },
    { q: "Someone Special?", a: "...more than words can say. 🤍", isGold: true }
  ];

  let currentIndex = 0;

  function renderDeck() {
    container.innerHTML = '';

    cardsData.forEach((item, idx) => {
      if (idx < currentIndex) return;

      const card = document.createElement('div');
      card.className = `deck-card ${item.isGold ? 'gold-card' : ''}`;
      card.style.zIndex = `${cardsData.length - idx}`;
      
      const depth = idx - currentIndex;
      card.style.transform = `translateY(${depth * 8}px) scale(${1 - depth * 0.04})`;
      card.style.opacity = `${1 - depth * 0.15}`;

      card.innerHTML = `
        <span class="deck-card-badge">${item.isGold ? 'SPECIAL VERDICT 👑' : `VERDICT #${idx + 1}`}</span>
        <h3 class="deck-card-question">${item.q}</h3>
        <div class="deck-card-answer">${item.a}</div>
      `;

      if (idx === currentIndex) {
        initCardSwipe(card);
      }

      container.appendChild(card);
    });
  }

  function initCardSwipe(card) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const onStart = (clientX, clientY) => {
      isDragging = true;
      startX = clientX;
      startY = clientY;
      currentX = 0;
      currentY = 0;
      card.style.transition = 'none';
    };

    const onMove = (clientX, clientY) => {
      if (!isDragging) return;
      currentX = clientX - startX;
      currentY = clientY - startY;
      const rotate = currentX * 0.08;
      card.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${rotate}deg)`;
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      const threshold = 80; // px threshold to trigger swipe

      if (Math.abs(currentX) > threshold) {
        // Swipe out
        const direction = currentX > 0 ? 1 : -1;
        card.style.transition = 'transform 0.4s ease-out, opacity 0.3s ease-out';
        card.style.transform = `translate3d(${direction * 400}px, ${currentY}px, 0) rotate(${direction * 30}deg)`;
        card.style.opacity = '0';

        if (window.birthdayAudio) window.birthdayAudio.playChime(currentIndex % 8);
        if (window.birthday3D) window.birthday3D.spawnBloomBurst(window.innerWidth / 2, window.innerHeight / 2, 20);

        setTimeout(() => {
          currentIndex = (currentIndex + 1) % cardsData.length;
          renderDeck();
        }, 350);
      } else {
        // Snap back to center
        card.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
    };

    // Touch events for mobile
    card.addEventListener('touchstart', (e) => {
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    card.addEventListener('touchend', onEnd);
    card.addEventListener('touchcancel', onEnd);

    // Pointer events for desktop drag
    card.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return; // Handled by touch events
      onStart(e.clientX, e.clientY);
      const moveHandler = (ev) => onMove(ev.clientX, ev.clientY);
      const upHandler = () => {
        onEnd();
        window.removeEventListener('pointermove', moveHandler);
        window.removeEventListener('pointerup', upHandler);
      };
      window.addEventListener('pointermove', moveHandler);
      window.addEventListener('pointerup', upHandler);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cardsData.length;
      if (window.birthdayAudio) window.birthdayAudio.playChime(currentIndex % 8);
      renderDeck();
    });
  }

  renderDeck();
}


/* --------------------------------------------------------------------------
   🎆 4.12 AUGUST 19 COUNTDOWN & CELEBRATION ENGINE
   -------------------------------------------------------------------------- */
function initAugust19Countdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const celebrationTitle = document.getElementById('birthday-banner-title');
  const btnFinalHug = document.getElementById('btn-final-hug');

  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 7, 19, 0, 0, 0); // August 19 (month 7 is Aug)

    // If August 19 has passed this year, point to next year
    if (now > new Date(currentYear, 7, 19, 23, 59, 59)) {
      target = new Date(currentYear + 1, 7, 19, 0, 0, 0);
    }

    const isTodayAugust19 = (now.getMonth() === 7 && now.getDate() === 19);

    if (isTodayAugust19) {
      if (celebrationTitle) {
        celebrationTitle.textContent = "✨ HAPPY BIRTHDAY REET! TODAY IS OFFICIALLY YOUR DAY! 🎂🎉❤️";
      }
    }

    const diff = target - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  if (btnFinalHug) {
    btnFinalHug.addEventListener('click', (e) => {
      const bloomOverlay = document.getElementById('hug-bloom-overlay');
      if (bloomOverlay) {
        bloomOverlay.classList.add('active');
      }

      if (window.birthdayAudio) window.birthdayAudio.playHarpGlissando();
      if (window.birthday3D) {
        window.birthday3D.spawnBloomBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            window.birthday3D.spawnBloomBurst(
              window.innerWidth * Math.random(),
              window.innerHeight * Math.random(),
              25
            );
          }, (i + 1) * 150);
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   🎶 AMBIENT SOUND CONTROLLER BAR
   -------------------------------------------------------------------------- */
function initAmbientSoundBar() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  const soundBar = document.querySelector('.ambient-sound-bar');
  const soundStatus = document.getElementById('sound-status-text');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!window.birthdayAudio) return;

    if (!window.birthdayAudio.isBgmPlaying) {
      window.birthdayAudio.startAmbientMusic();
      soundBar.classList.add('sound-playing');
      if (soundStatus) soundStatus.textContent = "Playing Romantic Song 🎶";
    } else {
      const isUnmuted = window.birthdayAudio.toggleSound();
      if (isUnmuted) {
        soundBar.classList.add('sound-playing');
        if (soundStatus) soundStatus.textContent = "Playing Romantic Song 🎶";
      } else {
        soundBar.classList.remove('sound-playing');
        if (soundStatus) soundStatus.textContent = "Music Muted 🔇";
      }
    }
  });
}

/* --------------------------------------------------------------------------
   🧊 3.2 3D PERSPECTIVE PARALLAX ON CARDS (Desktop Hover Optimized)
   -------------------------------------------------------------------------- */
function initParallaxCards() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cards = document.querySelectorAll('.deckle-card, .artifact-card, .like-note-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / (rect.height / 2)) * -6;
      const rotateY = (x / (rect.width / 2)) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
