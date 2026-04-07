/* Prime Brew Coffee — Menu + Scroll — v9 FINAL */
(function () {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var mainNav   = document.getElementById('main-nav');
  var overlay   = document.getElementById('nav-overlay');

  /* Scroll: efeito glass na navbar */
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled-nav', window.scrollY > 50);
  });

  /* Hambúrguer */
  function openMenu() {
    mainNav.classList.add('is-open');
    hamburger.classList.add('is-open');
    overlay.classList.add('is-visible');
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  }

  hamburger.addEventListener('click', function () {
    mainNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  /* Links do menu → scroll para seção */
  var links = document.querySelectorAll('#nav-links a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      e.preventDefault();
      var id = this.getAttribute('href');
      closeMenu();
      setTimeout(function () {
        var el = document.querySelector(id);
        if (el) el.scrollIntoView(true);
      }, 500);
    });
  }
})();
