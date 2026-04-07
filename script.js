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
      
      // Delay to allow mobile layout to settle after removing overflow:hidden
      setTimeout(() => {
        const offset = 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 600; // 600ms scroll
        let startTimestamp = null;

        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function step(timestamp) {
          if (!startTimestamp) startTimestamp = timestamp;
          const elapsed = timestamp - startTimestamp;
          const progress = Math.min(elapsed / duration, 1);
          
          window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        }
        
        window.requestAnimationFrame(step);
      }, 50);
    });
  });
});
