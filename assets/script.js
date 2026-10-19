(function () {
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  document.getElementById('langBtn').addEventListener('click', function () {
    var next = root.lang === 'de' ? 'en' : 'de';
    root.lang = next;
    store.set('lang', next);
  });

  document.getElementById('themeBtn').addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // reveal on scroll
  var revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }

  // active nav link
  var links = document.querySelectorAll('.nav nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  // lightbox
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  function close() { box.hidden = true; boxImg.removeAttribute('src'); }
  document.querySelectorAll('[data-full]').forEach(function (b) {
    b.addEventListener('click', function () {
      boxImg.src = b.getAttribute('data-full');
      boxImg.alt = b.querySelector('img').alt;
      box.hidden = false;
    });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
