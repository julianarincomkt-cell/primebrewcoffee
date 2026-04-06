document.addEventListener('DOMContentLoaded', () => {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');
  const overlay   = document.getElementById('nav-overlay');

  // ── Scroll: efeito glass na navbar ──────────────────────────────────────────
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled-nav');
    } else {
      navbar.classList.remove('scrolled-nav');
    }
  });

  // ── Hambúrguer: abre / fecha menu lateral ───────────────────────────────────
  function openMenu() {
    mainNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // trava scroll da página
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha ao clicar no overlay
  overlay.addEventListener('click', closeMenu);

  // Fecha ao clicar em um link do menu
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ── Smooth scroll para âncoras ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#' || targetId === '') {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // getBoundingClientRect garante posição real independente de containers aninhados
        const rect          = targetElement.getBoundingClientRect();
        const targetPosition = rect.top + window.pageYOffset - 80;
        const startPosition  = window.pageYOffset;
        const distance       = targetPosition - startPosition;
        const duration       = 1000;
        let start            = null;

        window.requestAnimationFrame(function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;

          const easeInOutCubic =
            progress / duration < 0.5
              ? 4 * Math.pow(progress / duration, 3)
              : 1 - Math.pow(-2 * (progress / duration) + 2, 3) / 2;

          window.scrollTo(0, startPosition + distance * easeInOutCubic);

          if (progress < duration) {
            window.requestAnimationFrame(step);
          } else {
            window.scrollTo(0, targetPosition);
          }
        });
      }
    });
  });
});
