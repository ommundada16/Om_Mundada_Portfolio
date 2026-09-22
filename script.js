/* ═══════════════════════════════════════════════════
   OM MUNDADA – PORTFOLIO  |  script.js
   Interactive animations and particle effects
══════════════════════════════════════════════════════ */

// ── CURSOR GLOW ──
const cursorGlow = document.getElementById('cursorGlow');
const cursorDot  = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

(function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top  = glowY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .glass-card, .chip').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorDot.style.opacity   = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorDot.style.opacity   = '1';
  });
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE NAV TOGGLE ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ── TYPEWRITER EFFECT ──
const roles = [
  'Scalable Backends ⚙️',
  'AI Agents & RAG 🤖',
  'Full-Stack Apps 🛒',
  'AR Experiences 📱',
  'Unity Games 🎮'
];
let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const roleText = document.getElementById('roleText');

function typeRole() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    roleText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
  } else {
    roleText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 50 : 80);
}
setTimeout(typeRole, 800);

// ── PARTICLE CANVAS ──
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = [];
const NUM_PARTICLES = 80;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * canvas.width;
    this.y    = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    const hues = [268, 200, 160]; // violet, sky, emerald
    this.hue  = hues[Math.floor(Math.random() * hues.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = `hsl(${this.hue}, 80%, 75%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());

// Connection lines
function drawConnections() {
  const DIST = 100;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < DIST) {
        ctx.save();
        ctx.globalAlpha = (1 - d/DIST) * 0.12;
        ctx.strokeStyle = `hsl(268, 80%, 75%)`;
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.glass-card, .section-header, .hero-stats, .about-text, .about-card-visual, .timeline-item, .featured-project, .project-card, .skills-category, .achievement-card, .contact-item, .ea-cta'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-category').forEach(cat => skillObserver.observe(cat));

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--primary)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = (Number.isInteger(target) ? Math.floor(start) : start.toFixed(1)) + suffix;
    }
  }, 25);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseFloat(num.textContent);
        const suffix = num.textContent.includes('+') ? '+' : '';
        animateCounter(num, val, suffix);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

// ── GLITCH TITLE EFFECT (rare, on hover) ──
const nameEl = document.querySelector('.name-line');
if (nameEl) {
  nameEl.addEventListener('mouseenter', () => {
    nameEl.style.filter = 'blur(0.5px)';
    setTimeout(() => nameEl.style.filter = '', 80);
  });
}

// ── CARD TILT EFFECT ──
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c👾 Om Mundada | AR/VR Portfolio', 'color: #a78bfa; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with Unity, ARCore & passion for immersive experiences 🚀', 'color: #38bdf8;');

// ── HERO SLIDER ──
(function initHeroSlider() {
  const slider   = document.getElementById('heroSlider');
  const dots     = document.querySelectorAll('.hsd-dot');
  const prevBtn  = document.getElementById('hspPrev');
  const nextBtn  = document.getElementById('hspNext');
  if (!slider) return;

  const TOTAL = dots.length;
  let current = 0;
  let autoTimer;

  function goTo(index) {
    current = (index + TOTAL) % TOTAL;
    slider.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      startAuto();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Swipe support
  let touchStartX = 0;
  slider.parentElement.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.parentElement.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { goTo(dx < 0 ? current + 1 : current - 1); startAuto(); }
  });

  startAuto();
})();

// ── TIRTHA MINI-GALLERY ──
(function initTirthaGallery() {
  const gallery = document.getElementById('tirthaGallery');
  if (!gallery) return;

  const imgs  = gallery.querySelectorAll('.pcg-img');
  const dots  = gallery.querySelectorAll('.pcg-dot');
  let current = 0;

  function show(idx) {
    imgs.forEach((img, i) => img.classList.toggle('active', i === idx));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    current = idx;
  }

  dots.forEach(dot => dot.addEventListener('click', e => {
    e.stopPropagation();
    show(parseInt(dot.dataset.idx));
    clearInterval(timer);
  }));

  // Click on the gallery image to advance
  gallery.addEventListener('click', () => show((current + 1) % imgs.length));

  const timer = setInterval(() => show((current + 1) % imgs.length), 3500);
})();

