/* Prime Brew Coffee — Menu + Scroll — v12 */
(function () {
  var navbar       = document.getElementById('navbar');
  var hamburger    = document.getElementById('hamburger');
  var mainNav      = document.getElementById('main-nav');
  var overlay      = document.getElementById('nav-overlay');
  var announcement = document.querySelector('.announcement-bar');

  /* Scroll: esconde announcement bar + fixa navbar no topo */
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled-nav', scrolled);
    if (announcement) {
      announcement.style.transform = scrolled ? 'translateY(-100%)' : 'translateY(0)';
    }
  });

  /* Hambúrguer */
  function openMenu() {
    mainNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    overlay.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(callback) {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    /* Aguarda a animação CSS do drawer (400ms) terminar antes de chamar callback */
    if (typeof callback === 'function') {
      setTimeout(callback, 420);
    }
  }

  hamburger.addEventListener('click', function () {
    mainNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', function () { closeMenu(); });

  /* Tecla ESC fecha o menu */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* Links do menu: fecha primeiro, depois rola para a âncora */
  var links = document.querySelectorAll('#nav-links a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');

      /* Se for link de âncora (#alguma-coisa), controla manualmente */
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var targetId = href.slice(1);

        closeMenu(function () {
          var target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      } else {
        /* Link externo (ex: /collections/...) — apenas fecha o menu */
        closeMenu();
      }
    });
  }
})();
