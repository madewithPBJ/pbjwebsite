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

// ─── NY Time ──────────────────────────────────────────────
function updateTime() {
  const el = document.querySelector('#ny-time');
  if (!el) return;
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
  el.textContent = `NEW YORK, NY — ${time}`;
}
updateTime();
setInterval(updateTime, 60_000);

// ─── Hero logo entrance ───────────────────────────────────
gsap.fromTo(
  '.js-logo-in',
  { opacity: 0, x: -30 },
  { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
);

// ─── Hero pin ─────────────────────────────────────────────
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  pin: true,
  pinSpacing: false,
});

// ─── Header color on scroll ───────────────────────────────
ScrollTrigger.create({
  trigger: '#about',
  start: 'top 72px',
  onEnter: () => document.querySelector('.site-header')?.classList.add('site-header--light'),
  onLeaveBack: () => document.querySelector('.site-header')?.classList.remove('site-header--light'),
});

// ─── Fade-up animations ───────────────────────────────────
gsap.utils.toArray('.js-fade-up').forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true,
    },
  });
});

// ─── Nav overlay ──────────────────────────────────────────
const nav = document.querySelector('#nav-overlay');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#nav-close');

// Set initial off-screen position
gsap.set(nav, { x: '100%' });

function openNav() {
  gsap.to(nav, { x: 0, duration: 0.6, ease: 'power3.inOut' });
  document.body.style.overflow = 'hidden';
  lenis.stop();
}

function closeNav() {
  gsap.to(nav, { x: '100%', duration: 0.6, ease: 'power3.inOut' });
  document.body.style.overflow = '';
  lenis.start();
  // Also close any open form panels
  document.querySelectorAll('.form-panel').forEach((panel) => {
    gsap.set(panel, { x: '100%' });
  });
}

menuBtn?.addEventListener('click', openNav);
closeBtn?.addEventListener('click', closeNav);

// Close nav when clicking a section link
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
  // Set initial state for all panels
  const panelId = trigger.dataset.formTrigger;
  const panel = document.querySelector(`#${panelId}`);
  if (panel) gsap.set(panel, { x: '100%' });

  trigger.addEventListener('click', () => {
    if (panel) {
      gsap.to(panel, { x: 0, duration: 0.5, ease: 'power3.inOut' });
    }
  });
});

document.querySelectorAll('.form-panel-close').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.form-panel');
    if (panel) {
      gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.inOut' });
    }
  });
});
