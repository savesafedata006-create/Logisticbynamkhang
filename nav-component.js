// nav-component.js — Shared Topbar Component
// Usage: place <div id="topbar-root" data-title="..." data-subtitle="..." data-logo="..."></div>
// in the <body>, then include this script after auth.js in <head>.
const MCK_Nav = (function () {
  function render() {
    var root = document.getElementById('topbar-root');
    if (!root) return;

    var title    = root.dataset.title    || 'MCK Logistics';
    var subtitle = root.dataset.subtitle || '';
    var logo     = root.dataset.logo     || 'LN';

    var header = document.createElement('header');
    header.className = 'g-topbar';
    header.innerHTML =
      '<div class="g-topbar-left">' +
        '<a href="index.html" class="g-btn g-btn-ghost">← ย้อนกลับ</a>' +
        '<div class="g-logo">' + logo + '</div>' +
        '<div>' +
          '<div class="g-title">' + title + '</div>' +
          '<div class="g-subtitle" id="nav-subtitle">' + subtitle + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="g-topbar-right">' +
        '<div class="g-user-chip g-hide-mobile">' +
          '<div class="g-user-avatar">?</div>' +
          '<div>' +
            '<div class="g-user-name">-</div>' +
            '<div class="g-user-role">-</div>' +
          '</div>' +
        '</div>' +
        '<button class="g-btn g-btn-danger" onclick="MCK_Auth.logout()">ออกจากระบบ</button>' +
      '</div>';

    root.parentNode.replaceChild(header, root);

    // Fill user info after rendering
    if (typeof MCK_Auth !== 'undefined') MCK_Auth.fillTopbar();
  }

  // Update the subtitle text (e.g. after loading user name dynamically)
  function setSubtitle(text) {
    var el = document.getElementById('nav-subtitle');
    if (el) el.textContent = text;
  }

  document.addEventListener('DOMContentLoaded', render);

  return { render: render, setSubtitle: setSubtitle };
})();
