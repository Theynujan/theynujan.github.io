(function () {
  'use strict';

  var doc = document;
  doc.documentElement.classList.add('js');

  var header = doc.querySelector('.site-header');
  var toggle = doc.querySelector('.nav-toggle');
  var menu = doc.getElementById('nav-menu');
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.nav-links a'));

  /* ----- Mobile menu ----- */
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ----- Header shadow ----- */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Active nav link ----- */
  if ('IntersectionObserver' in window) {
    var sections = navLinks
      .map(function (a) { return doc.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            var on = a.getAttribute('href') === '#' + entry.target.id;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    /* ----- Reveal on scroll ----- */
    var reveals = doc.querySelectorAll('.reveal');
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    doc.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- Profile photo fallback ----- */
  var portrait = doc.querySelector('.portrait');
  var img = portrait && portrait.querySelector('img');
  if (img) {
    var showPhoto = function () { portrait.classList.add('has-photo'); };
    var hidePhoto = function () { img.remove(); };
    img.addEventListener('load', showPhoto);
    img.addEventListener('error', hidePhoto);
    if (img.complete) { img.naturalWidth > 0 ? showPhoto() : hidePhoto(); }
  }

  /* ----- Footer year ----- */
  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ----- Contact form -----
     1. If the form action still contains YOUR_FORM_ID, it falls back to opening the visitor's email app.
     2. Once you replace YOUR_FORM_ID with a real Formspree ID, it posts via fetch. */
  var form = doc.getElementById('contact-form');
  var status = doc.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';

      var fields = ['name', 'email', 'message'].map(function (id) { return form.elements[id]; });
      var valid = true;
      fields.forEach(function (f) {
        var ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute('aria-invalid', String(!ok));
        if (!ok) valid = false;
      });
      if (!valid) {
        status.textContent = 'Please fill in your name, a valid email address and a message.';
        var firstBad = fields.filter(function (f) { return f.getAttribute('aria-invalid') === 'true'; })[0];
        if (firstBad) firstBad.focus();
        return;
      }

      var data = new FormData(form);
      if (data.get('_gotcha')) return; // honeypot

      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        var subject = encodeURIComponent('Portfolio enquiry from ' + data.get('name'));
        var body = encodeURIComponent(data.get('message') + '\n\n' + data.get('name') + '\n' + data.get('email'));
        window.location.href = 'mailto:theynujan100@gmail.com?subject=' + subject + '&body=' + body;
        status.textContent = 'Opening your email app. If nothing opens, email theynujan100@gmail.com directly.';
        return;
      }

      status.textContent = 'Sending...';
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            status.textContent = 'Message sent. I will reply by email.';
          } else {
            status.textContent = 'The message did not send. Please email theynujan100@gmail.com instead.';
          }
        })
        .catch(function () {
          status.textContent = 'Network error. Please email theynujan100@gmail.com instead.';
        });
    });
  }
})();
