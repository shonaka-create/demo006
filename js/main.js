/* ============================================================
   株式会社D-ONE — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     Sticky Nav + Scroll Behavior
     ---------------------------------------- */
  const nav = document.querySelector('.site-nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 30) {
      nav.classList.remove('site-nav--transparent');
      nav.classList.add('site-nav--scrolled');
    } else {
      nav.classList.add('site-nav--transparent');
      nav.classList.remove('site-nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ----------------------------------------
     Mobile Hamburger Menu
     ---------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  const drawerLinks = document.querySelectorAll('.nav-drawer .nav-link');

  function openDrawer() {
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    drawer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // trigger transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { drawer.style.opacity = '1'; });
    });
  }

  function closeDrawer() {
    hamburger.classList.remove('is-open');
    drawer.style.opacity = '0';
    document.body.style.overflow = '';
    setTimeout(() => {
      drawer.classList.remove('is-open');
      drawer.style.display = 'none';
    }, 300);
  }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  /* ----------------------------------------
     Hero Load Animation
     ---------------------------------------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('load', () => {
      hero.classList.add('hero--loaded');
    });
  }

  /* ----------------------------------------
     Scroll Reveal (Intersection Observer)
     ---------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ----------------------------------------
     Animated Counters
     ---------------------------------------- */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const isFloat  = el.dataset.float === 'true';
    const duration = 2000;
    const start    = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = target * eased;
      el.textContent = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.counter');

  if (counterEls.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ----------------------------------------
     Contact Form Handler
     ---------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const submitBtn = contactForm.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中...';

      // Simulate async send (demo)
      setTimeout(() => {
        contactForm.style.display   = 'none';
        const success = document.querySelector('.form-success');
        if (success) {
          success.style.display = 'block';
        }
      }, 1400);
    });
  }

  /* ----------------------------------------
     Active Nav Link
     ---------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPath) {
      link.style.color = 'var(--color-accent-light)';
    }
  });

  /* ----------------------------------------
     Smooth Scroll for Anchor Links
     ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height'));
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
