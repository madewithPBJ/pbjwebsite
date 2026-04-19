import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ─── Lenis smooth scroll ─────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.normalizeScroll(true);

// ─── Denver time ──────────────────────────────────────────
function updateTime() {
  const el = document.querySelector('#ny-time');
  if (!el) return;
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Denver',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
  el.textContent = `DENVER, CO — ${time}`;
}
updateTime();
setInterval(updateTime, 60_000);

// ─── Two-logo animation ───────────────────────────────────
const logoLanding = document.querySelector('.logo-landing');
const headerRef   = document.querySelector('.header-logo-ref');

function getStartPos() {
  const vpW = window.innerWidth;
  const vpH = window.innerHeight;
  const w   = Math.min(280, vpW * 0.7);
  return { left: vpW / 2 - w / 2, top: vpH / 2 - w * 0.35, width: w };
}

function getEndPos() {
  const r = headerRef.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width };
}

// Set initial position (centered in viewport) and hide
const startPos = getStartPos();
gsap.set(logoLanding, { ...startPos, opacity: 0 });

// Entrance: fade in, no slide
gsap.to(logoLanding, { opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' });

// Lock scroll until animation fires
lenis.stop();

// On first scroll → fly logo to header → unlock scroll
let fired = false;
function playLogoAnim() {
  if (fired) return;
  fired = true;
  const end = getEndPos();
  gsap.to(logoLanding, {
    left:     end.left,
    top:      end.top,
    width:    end.width,
    duration: 0.75,
    ease:     'power3.inOut',
    onComplete: () => {
      lenis.start();
      document.body.classList.add('logo-docked');
    },
  });
}

window.addEventListener('wheel',     playLogoAnim, { once: true, passive: true });
window.addEventListener('touchmove', playLogoAnim, { once: true, passive: true });

// Recalculate start position on resize (if animation hasn't fired yet)
window.addEventListener('resize', () => {
  if (!fired) {
    gsap.set(logoLanding, getStartPos());
  }
});

// ─── Header color when content sections enter ─────────────
ScrollTrigger.create({
  trigger: '#about',
  start: 'top 72px',
  onEnter:     () => document.querySelector('.site-header')?.classList.add('site-header--light'),
  onLeaveBack: () => document.querySelector('.site-header')?.classList.remove('site-header--light'),
});

// ─── Fade-up animations ───────────────────────────────────
gsap.utils.toArray('.js-fade-up').forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true,
    },
  });
});

// ─── Nav overlay ──────────────────────────────────────────
const nav     = document.querySelector('#nav-overlay');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#nav-close');

gsap.set(nav, { x: '100%' });

function openNav() {
  gsap.to(nav, { x: 0, duration: 0.6, ease: 'power3.inOut' });
  document.body.style.overflow = 'hidden';
  lenis.stop();
}

function closeNav() {
  gsap.to(nav, { x: '100%', duration: 0.6, ease: 'power3.inOut' });
  document.body.style.overflow = '';
  if (fired) lenis.start();
  document.querySelectorAll('.form-panel').forEach((panel) => {
    gsap.set(panel, { x: '100%' });
  });
}

menuBtn?.addEventListener('click', openNav);
closeBtn?.addEventListener('click', closeNav);

document.querySelectorAll('[data-nav-link]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      closeNav();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) lenis.scrollTo(target, { offset: -60 });
      }, 650);
    }
  });
});

// ─── Form panels ──────────────────────────────────────────
document.querySelectorAll('[data-form-trigger]').forEach((trigger) => {
  const panelId = trigger.dataset.formTrigger;
  const panel   = document.querySelector(`#${panelId}`);
  if (panel) gsap.set(panel, { x: '100%' });

  trigger.addEventListener('click', () => {
    if (panel) gsap.to(panel, { x: 0, duration: 0.5, ease: 'power3.inOut' });
  });
});

document.querySelectorAll('.form-panel-close').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.form-panel');
    if (panel) gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.inOut' });
  });
});
