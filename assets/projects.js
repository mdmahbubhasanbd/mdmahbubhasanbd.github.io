(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.ptabs [role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.ppanel'));
  if (!tabs.length) return;

  function show(id, push) {
    var found = false;
    panels.forEach(function (p) {
      var on = p.id === id;
      p.hidden = !on;
      if (on) found = true;
    });
    if (!found) { id = panels[0].id; panels[0].hidden = false; }
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-p') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.classList.toggle('on', on);
    });
    if (push) history.replaceState(null, '', '#' + id);
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      show(t.getAttribute('data-p'), true);
      var box = document.querySelector('.ppanels');
      if (box && window.innerWidth < 860) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('hashchange', function () { show(location.hash.slice(1), false); });
  show(location.hash.slice(1), false);
})();
