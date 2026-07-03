import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

// The <html> element only gets the `anim` class (added inline in <head>) when
// the user hasn't asked for reduced motion — every pre-hide CSS rule and every
// animation below hangs off that gate.
if (document.documentElement.classList.contains('anim')) {
  init();
}

function init() {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links (including "/#section" on the same page) route through Lenis
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.4 });
  });

  // Only the home page has the preloader + hero intro; subpages start unlocked
  const hasIntro =
    !!document.getElementById('preloader') && !!document.querySelector('[data-hero-title]');
  if (hasIntro) lenis.stop(); // no scrolling behind the preloader

  // SplitText measures line breaks, so wait for the webfonts
  document.fonts.ready.then(() => {
    if (hasIntro) introSequence(lenis);
    scrollReveals();
    parallax();
    marquee();
    magneticButtons();
    cursorFollower();
    imageWipes();
    aboutStory();
    galleryHorizontal();
    ScrollTrigger.refresh();
  });
}

/* Preloader counter -> curtain lift -> hero reveal */
function introSequence(lenis: Lenis) {
  const preloader = document.getElementById('preloader')!;
  const counter = document.getElementById('preloader-count')!;
  const bar = document.getElementById('preloader-bar')!;
  const title = document.querySelector<HTMLElement>('[data-hero-title]')!;

  const split = SplitText.create(title, { type: 'lines', mask: 'lines' });
  gsap.set(title, { opacity: 1 });

  const progress = { v: 0 };
  gsap
    .timeline({ onComplete: () => (preloader.style.display = 'none') })
    .to(progress, {
      v: 100,
      duration: 1.3,
      ease: 'power2.inOut',
      onUpdate: () => (counter.textContent = String(Math.round(progress.v))),
    })
    .to(bar, { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
    .to(preloader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.15')
    .add(() => lenis.start())
    .from(
      split.lines,
      { yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'power4.out' },
      '-=0.35'
    )
    .fromTo(
      '[data-hero-media]',
      { clipPath: 'inset(0 0 0 100%)' },
      { clipPath: 'inset(0 0 0 0%)', duration: 1.2, ease: 'expo.inOut' },
      '<'
    )
    .fromTo(
      '[data-hero-fade]',
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
      '-=0.7'
    );
}

/* Fade-ups, staggered groups, and masked line reveals on scroll */
function scrollReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines' });
    gsap.set(el, { opacity: 1 });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1,
      stagger: 0.09,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* Images drift slower than the page while their container scrolls by */
function parallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
    gsap.set(img, { scale: 1.15 });
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
}

/* Infinite marquee: the track holds two identical halves, so -50% loops seamlessly */
function marquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
}

/* Images reveal with a curtain wipe instead of a plain fade */
function imageWipes() {
  gsap.utils.toArray<HTMLElement>('[data-img-reveal]').forEach((el) => {
    if (el.closest('#gallery-track')) return; // gallery items are wired to the horizontal scroll
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });
}

/* About pins briefly on desktop: copy reveals and the badge counts to 25+ as you scrub */
function aboutStory() {
  const badge = document.getElementById('badge-count');
  const copy = document.querySelectorAll('[data-about-copy] > *');
  if (!badge || !copy.length) return;

  const count = { v: 0 };
  const setBadge = () => (badge.textContent = Math.round(count.v) + '+');
  setBadge();

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    gsap
      .timeline({
        scrollTrigger: { trigger: '#about', start: 'top top', end: '+=60%', pin: true, scrub: 0.8 },
      })
      .fromTo(copy, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, ease: 'power2.out' })
      .to(count, { v: 25, ease: 'none', onUpdate: setBadge }, 0);
  });
  mm.add('(max-width: 1023px)', () => {
    gsap.fromTo(
      copy,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-about-copy]', start: 'top 85%', once: true },
      }
    );
    gsap.to(count, {
      v: 25,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: setBadge,
      scrollTrigger: { trigger: '#about', start: 'top 70%', once: true },
    });
  });
}

/* Gallery pins and scrolls sideways on desktop; items wipe in as they enter from the right */
function galleryHorizontal() {
  const track = document.getElementById('gallery-track');
  if (!track) return;
  const items = gsap.utils.toArray<HTMLElement>('#gallery-track [data-img-reveal]');
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', () => {
    const distance = () => track.scrollWidth - window.innerWidth;
    const xTween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, containerAnimation: xTween, start: 'left 95%', once: true },
        }
      );
    });
  });
  mm.add('(max-width: 1023px)', () => {
    items.forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  });
}

/* Buttons lean toward the pointer and spring back on leave */
function magneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * 0.15);
      yTo((e.clientY - rect.top - rect.height / 2) * 0.15);
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* Gold dot + ring trail the pointer; the ring swells over interactive elements */
function cursorFollower() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.getElementById('cursor-dot')!;
  const ring = document.getElementById('cursor-ring')!;
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

  let visible = false;
  document.addEventListener('mousemove', (e) => {
    if (!visible) {
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
    }
    dotX(e.clientX);
    dotY(e.clientY);
    ringX(e.clientX);
    ringY(e.clientY);
  });

  document.addEventListener('mouseover', (e) => {
    if ((e.target as HTMLElement).closest('a, button, select, input')) {
      gsap.to(ring, { scale: 2, duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    }
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement).closest('a, button, select, input')) {
      gsap.to([ring, dot], { scale: 1, duration: 0.3 });
    }
  });
}
