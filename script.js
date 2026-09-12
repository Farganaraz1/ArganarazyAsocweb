(function () {
  'use strict';

  var WA_NUMBER = '5491170663949';

  function waUrl(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  // Hidrata cualquier link con data-wa="texto" al href de WhatsApp correcto,
  // así el texto se escribe una sola vez en el HTML, en español legible,
  // sin nadie codificando %20 a mano.
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', waUrl(el.getAttribute('data-wa')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // Menú mobile
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Revelado suave al hacer scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Formulario de contacto: sin backend todavía — confirma en pantalla y
  // deja el envío real como el próximo paso, no como algo ya conectado.
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var confirm = form.querySelector('.form-confirm');
      if (confirm) {
        confirm.hidden = false;
        confirm.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      form.querySelectorAll('input, textarea, select').forEach(function (el) {
        if (el.type === 'radio') { el.checked = false; } else { el.value = ''; }
      });
    });
  }

  var years = document.querySelectorAll('[data-year]');
  years.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
