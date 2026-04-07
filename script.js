/* Prime Brew Coffee — Menu + Scroll — v5 */
(function () {
  'use strict';

  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var mainNav   = document.getElementById('main-nav');
  var overlay   = document.getElementById('nav-overlay');

  /* ── Scroll: efeito glass na navbar ───────────────────────────── */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled-nav');
    } else {
      navbar.classList.remove('scrolled-nav');
    }
  });

  /* ── Hambúrguer ───────────────────────────────────────────────── */
  function openMenu() {
    mainNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    if (mainNav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  /* ── Scroll ao clicar nos links do menu ───────────────────────── */
  var navLinks = document.querySelectorAll('#nav-links a');

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', handleNavClick);
  }

  function handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();

    var href = this.getAttribute('href');
    if (!href || href === '#') return;

    var target = document.querySelector(href);
    if (!target) return;

    // Fecha o menu primeiro
    closeMenu();

    // Espera o menu fechar completamente antes de rolar
    setTimeout(function () {
      var headerHeight = 80;
      var rect = target.getBoundingClientRect();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var top = rect.top + scrollTop - headerHeight;

      // Usa try/catch para fallback total
      try {
        window.scrollTo({ top: top, left: 0, behavior: 'smooth' });
      } catch (err) {
        window.scrollTo(0, top);
      }
    }, 350);
  }
})();
