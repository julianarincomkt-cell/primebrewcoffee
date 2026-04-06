document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');
  const overlay   = document.getElementById('nav-overlay');

  // ── Scroll: efeito glass na navbar ──────────────────────────────────────────
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled-nav', window.scrollY > 50);
  });

  // ── Hambúrguer ───────────────────────────────────────────────────────────────
  let scrollY = 0; // salva posição do scroll antes de travar

  function openMenu() {
    scrollY = window.scrollY;
    mainNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    // trava o scroll sem alterar o pageYOffset
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${scrollY}px`;
    document.body.style.width      = '100%';
    document.body.style.overflowY  = 'scroll';
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    // restaura o scroll exatamente onde estava
    document.body.style.position  = '';
    document.body.style.top       = '';
    document.body.style.width     = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, scrollY);
  }

  hamburger.addEventListener('click', () => {
    mainNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ── Smooth scroll para âncoras ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Fecha menu primeiro, depois aguarda 1 frame para o DOM restabelecer
      const isMenuOpen = mainNav.classList.contains('is-open');
      if (isMenuOpen) closeMenu();

      // Pequeno delay para o navegador restaurar o scroll antes de calcular
      setTimeout(() => {
        const offset     = 80;
        const top        = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        const start      = window.scrollY;
        const distance   = top - start;
        const duration   = 900;
        let startTime    = null;

        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(ts) {
          if (!startTime) startTime = ts;
          const elapsed  = ts - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, start + distance * easeInOutCubic(progress));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      }, isMenuOpen ? 50 : 0);
    });
  });
});
