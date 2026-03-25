import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)';
const DURATION = 0.6;
const STAGGER = 0.1;
const TRANSLATE_Y = 30;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function animateHeroText(): void {
  const heroes = document.querySelectorAll('[data-animate="hero"]');
  if (!heroes.length) return;

  gsap.fromTo(
    heroes,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: EASE,
      stagger: 0.15,
    }
  );
}

/** Simple fade + slide reveal for project cards */
function animateProjectCards(): void {
  const cards = document.querySelectorAll('[data-animate="card"]');
  if (!cards.length) return;

  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: TRANSLATE_Y },
      {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          once: true,
        },
      }
    );
  });
}

/** Images reveal with scale(1.05) -> scale(1) + opacity */
function animateProjectImages(): void {
  const images = document.querySelectorAll('[data-animate="image"]');
  if (!images.length) return;

  images.forEach((img) => {
    gsap.fromTo(
      img,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: {
          trigger: img,
          start: 'top 95%',
          once: true,
        },
      }
    );
  });
}

/** Content images inside project pages: scale + opacity reveal */
function animateContentImages(): void {
  const images = document.querySelectorAll('.project-content img');
  if (!images.length) return;

  images.forEach((img) => {
    gsap.fromTo(
      img,
      { opacity: 0, scale: 1.05, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: {
          trigger: img,
          start: 'top 95%',
          once: true,
        },
      }
    );
  });
}

function animateProcessGrid(): void {
  const items = document.querySelectorAll('[data-animate="process"]');
  if (!items.length) return;

  gsap.fromTo(
    items,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: DURATION,
      ease: EASE,
      stagger: STAGGER,
      scrollTrigger: {
        trigger: items[0],
        start: 'top 95%',
        once: true,
      },
    }
  );
}

function animateSections(): void {
  const sections = document.querySelectorAll('[data-animate="section"]');
  if (!sections.length) return;

  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          once: true,
        },
      }
    );
  });
}

/** Subtle parallax on project hero images — image scrolls slower */
function initHeroParallax(): void {
  const hero = document.querySelector('[data-parallax="hero"]');
  if (!hero) return;

  gsap.to(hero, {
    y: '15%',
    ease: 'none',
    scrollTrigger: {
      trigger: hero.closest('section') || hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/** Homepage hero: subtle zoom-out as user scrolls down */
function initHomeHeroZoom(): void {
  const heroImg = document.querySelector('[data-scroll="hero-zoom"]');
  if (!heroImg) return;

  gsap.to(heroImg, {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: heroImg.closest('section') || heroImg,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/** No card parallax — keep scroll clean and predictable */

export function initAnimations(): void {
  if (prefersReducedMotion()) return;

  animateHeroText();
  animateProjectCards();
  animateProjectImages();
  animateContentImages();
  animateProcessGrid();
  animateSections();
  initHeroParallax();
  initHomeHeroZoom();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAnimations());
} else {
  initAnimations();
}
