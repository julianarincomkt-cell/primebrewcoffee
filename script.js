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
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    mainNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // ── Scroll Suave Matemático Totalmente Seguro (Para qualquer celular) ──
  document.querySelectorAll('#nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Impede o bug do iOS tentar rolar o menu fixed
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      // Fecha o menu de imediato
      if (mainNav.classList.contains('is-open')) {
        closeMenu();
      }

      if (targetEl) {
        // Aguarda 100ms para o menu começar a sumir e a tela "respirar"
        setTimeout(() => {
          const offset = 80; // Altura do navbar
          // getBoundingClientRect().top pega sempre a distância exata até topo real da tela naquele pixel
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 600; // milisegundos
          let startTimestamp = null;

          function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const percent = Math.min(progress / duration, 1);
            
            // Efeito suave easeOutQuad (desacelera no final)
            const easing = percent * (2 - percent);
            
            window.scrollTo(0, startPosition + (distance * easing));
            
            if (progress < duration) {
              window.requestAnimationFrame(step);
            }
          }
          
          window.requestAnimationFrame(step);
        }, 150); // Delay leve garante estabilidade
      }
    });
  });
});
