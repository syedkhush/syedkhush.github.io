/* Disqus comments loader for the essay pages.
   ONE-TIME SETUP: replace YOUR-SHORTNAME below with your Disqus shortname
   (disqus.com > your site > Admin > Settings > General > Shortname).
   Until you do, the comments box stays hidden so nothing looks broken. */
(function () {
  var DISQUS_SHORTNAME = 'syedkhush';

  var box = document.getElementById('comments');
  if (!box) return;
  if (!DISQUS_SHORTNAME || DISQUS_SHORTNAME === 'YOUR-SHORTNAME') {
    box.style.display = 'none';
    return;
  }

  var id = box.getAttribute('data-page');
  var url = 'https://syedkhush.github.io/' + id + '.html';
  window.disqus_config = function () {
    this.page.url = url;
    this.page.identifier = id;
  };

  function load() {
    var s = document.createElement('script');
    s.src = 'https://' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (document.head || document.body).appendChild(s);
  }

  /* Only load Disqus when the reader scrolls near the comments (faster pages). */
  var thread = document.getElementById('disqus_thread');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); load(); }
    }, { rootMargin: '400px' });
    io.observe(thread);
  } else {
    load();
  }
})();
