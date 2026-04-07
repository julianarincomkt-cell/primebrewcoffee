/* Prime Brew Coffee — Menu + Scroll — v7 ULTRA SIMPLES */
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

  /* ── Links do menu: fecha menu e navega via hash nativo ──────── */
  var navLinks = document.querySelectorAll('#nav-links a');

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var href = this.getAttribute('href');

      // Fecha o menu
      closeMenu();

      // Usa window.location.hash — o método mais básico e universal
      // Funciona em TODOS os navegadores móveis sem exceção
      setTimeout(function () {
        // Limpa o hash atual para forçar navegação mesmo se já estiver na mesma âncora
        history.replaceState(null, null, ' ');

        // Pequeno delay para o browser processar a limpeza
        setTimeout(function () {
          window.location.hash = href;
        }, 50);
      }, 400);
    });
  }
})();
