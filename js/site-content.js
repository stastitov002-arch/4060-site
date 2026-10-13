(function () {
  'use strict';

  function getValue(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function apply(data) {
    var nodes = document.querySelectorAll('[data-cms]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var path = el.getAttribute('data-cms');
      if (!path) continue;
      var value = getValue(data, path);
      if (value === undefined || value === null || value === '') continue;
      el.innerHTML = value;
    }
  }

  if (!document.querySelector('[data-cms]')) return;

  fetch('_data/site.json', { cache: 'no-cache' })
    .then(function (r) {
      if (!r.ok) throw new Error('site.json not found');
      return r.json();
    })
    .then(apply)
    .catch(function () {
      /* тихо игнорируем — останутся тексты из HTML */
    });
})();
