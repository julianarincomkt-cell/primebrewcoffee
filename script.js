document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  // Adiciona a classe no header baseada no scroll para o efeito glass e cor sólida
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled-nav');
    } else {
      navbar.classList.remove('scrolled-nav');
    }
  });

  // Smooth scroll para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Se for apenas "#", ou não estiver na página preencha com preventDefault básico
      if (targetId === "#" || targetId === "") {
        e.preventDefault();
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const targetPosition = targetElement.offsetTop - 80; // Offset do navbar fixo
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200; // Tempo em milissegundos (mais lento/cinematográfico)
        let start = null;

        window.requestAnimationFrame(function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          
          // Easing param (Ease-in-out Cubic)
          const easeInOutCubic = progress / duration < 0.5 
            ? 4 * Math.pow(progress / duration, 3) 
            : 1 - Math.pow(-2 * (progress / duration) + 2, 3) / 2;
            
          window.scrollTo(0, startPosition + distance * easeInOutCubic);
          
          if (progress < duration) {
            window.requestAnimationFrame(step);
          } else {
            // Garantir que termine cravado no final após fechar a duração
            window.scrollTo(0, targetPosition);
          }
        });
      }
    });
  });
});

