(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // fade out before leaving to another page of this site
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;
    if (/\.(pdf|jpg|png|svg|xml|txt)$/i.test(url.pathname)) return;
    e.preventDefault();
    document.documentElement.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 260);
  });

  // coming back with the browser's back button
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.documentElement.classList.remove('leaving');
  });
})();
