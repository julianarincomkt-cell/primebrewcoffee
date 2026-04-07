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
  
  function openMenu() {
    mainNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mainNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ── Smooth Scroll e Fechar Menu ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      
      if (mainNav.classList.contains('is-open')) {
        closeMenu();
      }
      
      // Compensa fixed header e scroll suave
      const offset = 80;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      
      // Delay minúsculo para Safari lidar bem com fechamento do menu
      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 50);
    });
  });
});
