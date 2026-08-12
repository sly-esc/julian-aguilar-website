(function () {
  'use strict';

  var header = document.querySelector('.site-header');

  // ===== Header scroll =====
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== Mobile menu =====
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  var backdrop = document.querySelector('.mobile-menu-backdrop');

  function openMenu() {
    if (!mobileMenu || !menuToggle || !backdrop) return;
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu || !menuToggle || !backdrop) return;
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileMenu && backdrop) {
    menuToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ===== Scroll reveal =====
  var revealElements = document.querySelectorAll('.reveal, [data-reveal]');

  function isInView(el, offset) {
    if (offset === void 0) offset = 0.85;
    var rect = el.getBoundingClientRect();
    var threshold = window.innerHeight * offset;
    return rect.top < threshold && rect.bottom > 0;
  }

  function checkReveals() {
    revealElements.forEach(function (el) {
      if (isInView(el) && !el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  checkReveals();

  // ===== Manifesto sequential reveal =====
  var manifestoPhrases = document.querySelectorAll('.manifesto-phrase, .manifesto-phrase-sub');

  function revealManifesto() {
    manifestoPhrases.forEach(function (el) {
      if (isInView(el, 0.8) && !el.classList.contains('revealed')) {
        el.classList.add('revealed');
      }
    });
  }

  window.addEventListener('scroll', revealManifesto, { passive: true });
  revealManifesto();

  // ===== Video modal =====
  var videoModal = document.querySelector('.video-modal');
  var videoPlayer = videoModal ? videoModal.querySelector('video') : null;
  var videoIframe = videoModal ? videoModal.querySelector('.video-modal-iframe') : null;
  var videoClose = document.querySelector('.video-modal-close');

  function toEmbedUrl(url) {
    if (!url) return null;
    var yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{6,})/);
    if (yt) return 'https://www.youtube.com/embed/' + yt[1];
    var dr = url.match(/\/file\/d\/([A-Za-z0-9_-]+)/);
    if (dr) return 'https://drive.google.com/file/d/' + dr[1] + '/preview';
    return null;
  }

  function openVideo(src) {
    if (!videoModal) return;
    var embed = toEmbedUrl(src);
    if (embed) {
      videoIframe.src = embed;
      videoIframe.style.display = 'block';
      videoPlayer.style.display = 'none';
    } else {
      videoPlayer.src = src;
      videoPlayer.style.display = 'block';
      videoIframe.style.display = 'none';
    }
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!embed) {
      setTimeout(function () { videoPlayer.play(); }, 100);
    }
  }

  function closeVideo() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    document.body.style.overflow = '';
    videoPlayer.pause();
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
    videoPlayer.style.display = 'block';
    videoIframe.removeAttribute('src');
    videoIframe.style.display = 'none';
  }

  // Book video button
  var bookVideoBtn = document.querySelector('.book-video-btn');
  if (bookVideoBtn) {
    bookVideoBtn.addEventListener('click', function () {
      var ext = this.getAttribute('data-video-url');
      if (ext) {
        openVideo(ext);
      }
    });
  }

  // Media cards
  document.querySelectorAll('.media-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var ext = this.getAttribute('data-video-url');
      if (ext) {
        openVideo(ext);
        return;
      }
      var vid = this.querySelector('video');
      if (vid && vid.getAttribute('src')) {
        openVideo(vid.getAttribute('src'));
      }
    });
  });

  if (videoClose) videoClose.addEventListener('click', closeVideo);

  if (videoModal) {
    videoModal.addEventListener('click', function (e) {
      if (e.target === this) closeVideo();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeVideo();
    });
  }

  // ===== Lightbox =====
  var methodologyImg = document.querySelector('.methodology-image-wrap');
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = document.querySelector('.lightbox-close');

  if (methodologyImg && lightbox && lightboxImg) {
    methodologyImg.addEventListener('click', function () {
      var img = this.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', function () {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === this) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ===== Smooth anchor scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerH = header ? header.offsetHeight : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== Newsletter: validación y envío =====
  var newsletterForm = document.querySelector('.newsletter-form');
  var newsletterMsg = document.querySelector('.newsletter-message');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = this.querySelector('input[type="text"]');
      var emailInput = this.querySelector('input[type="email"]');
      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput.value.trim();
      var msg = newsletterMsg;
      var submitBtn = this.querySelector('button[type="submit"]');

      msg.className = 'newsletter-message';

      if (!email) {
        msg.textContent = 'Por favor ingresa tu correo electrónico';
        msg.classList.add('error');
        emailInput.focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'El correo electrónico no es válido';
        msg.classList.add('error');
        emailInput.focus();
        return;
      }

      var originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';

      fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email })
      }).then(function (res) {
        if (!res.ok) throw new Error('network');
        return res.json();
      }).then(function () {
        msg.textContent = 'Gracias por suscribirte — pronto recibirás contenido que inspira';
        msg.classList.add('success');
        if (nameInput) nameInput.value = '';
        emailInput.value = '';
      }).catch(function () {
        msg.textContent = 'No pudimos completar el envío. Inténtalo de nuevo';
        msg.classList.add('error');
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
    });
  }

})();
