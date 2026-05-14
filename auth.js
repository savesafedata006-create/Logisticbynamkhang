// MCK Auth — Centralized Authentication & Permission System
// Session stored in localStorage (persistent, no re-login needed)
const MCK_Auth = (function () {
  const SESSION_KEY = 'mck_session';
  const USERS_KEY   = 'mck_users';
  const PERMS_KEY   = 'mck_page_perms';

  const DEFAULT_USERS = {
    boss:    { password: 'boss123',   name: 'บอสใหญ่ใจดี',  role: 'Boss',      initials: 'BS' },
    admin:   { password: 'admin123',  name: 'Administrator', role: 'Admin',     initials: 'AD' },
    manager: { password: 'mgr123',    name: 'ผู้จัดการ',     role: 'Manager',   initials: 'MG' },
    cs:      { password: 'cs123',     name: 'CS Team',       role: 'ประสานงาน', initials: 'CS' },
    doc:     { password: 'doc123',    name: 'ฝ่ายเอกสาร',    role: 'เอกสาร',    initials: 'DC' },
    driver:  { password: 'driver123', name: 'คนขับรถ',       role: 'Driver',    initials: 'DR' },
    tech:    { password: 'tech123',   name: 'ช่างเทคนิค',    role: 'ช่าง',      initials: 'TC' },
    dispatch:{ password: 'disp123',   name: 'คนจัดรถ',       role: 'Dispatch',  initials: 'DP' },
    finance: { password: 'fin123',    name: 'ฝ่ายการเงิน',   role: 'Finance',   initials: 'FN' },
  };

  // Page keys for permission management
  const ALL_PAGES = [
    { key: 'dashboard',  label: 'Dashboard',      href: 'dashboard.html' },
    { key: 'datacenter', label: 'Datacenter',    href: 'datacenter.html' },
    { key: 'document',   label: 'ทีมเอกสาร',      href: 'document-team.html' },
    { key: 'container',  label: 'Container Hub',  href: 'container-hub.html' },
    { key: 'fleet',      label: 'Fleet Hub',      href: 'fleet-hub.html' },
    { key: 'invoice',    label: 'Invoice',        href: 'INVOICE.html' },
    { key: 'quotation',  label: 'ต้นทุน/ราคา',    href: 'quotation-costing.html' },
    { key: 'shipping',   label: 'เอกสารราชการ',    href: 'shipping-gov.html' },
    { key: 'hr',         label: 'HR & Perms',     href: 'hr-management.html' },
    { key: 'driver',     label: 'Driver Portal',  href: 'driver-portal.html' },
    { key: 'security',   label: 'Security',       href: 'security-overview.html' },
    { key: 'sop',        label: 'SOP & WI',       href: 'SOP-WI.html' },
  ];

  // Default permissions per role
  const DEFAULT_PERMS = {
    'Boss':     ['all'],
    'Admin':    ['all'],
    'Manager':  ['all'],
    'ประสานงาน': ['dashboard', 'datacenter', 'container', 'quotation', 'shipping'],
    'เอกสาร':   ['dashboard', 'datacenter', 'document', 'shipping', 'sop'],
    'Driver':   ['driver'],
    'ช่าง':     ['dashboard', 'fleet', 'container'],
    'Dispatch': ['dashboard', 'fleet', 'container', 'quotation'],
    'Finance':  ['dashboard', 'invoice', 'quotation', 'fleet', 'hr'],
  };

  function getUsers() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch(e) {}
    return Object.keys(saved).length > 0
      ? Object.assign({}, DEFAULT_USERS, saved)
      : Object.assign({}, DEFAULT_USERS);
  }

  function getPerms() {
    try {
      var raw = localStorage.getItem(PERMS_KEY);
      return raw ? JSON.parse(raw) : Object.assign({}, DEFAULT_PERMS);
    } catch(e) { return Object.assign({}, DEFAULT_PERMS); }
  }

  function savePerms(perms) {
    localStorage.setItem(PERMS_KEY, JSON.stringify(perms));
  }

  function getUser() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch(e) { return null; }
  }

  function login(username, password) {
    var uKey  = String(username).toLowerCase().trim();
    var users = getUsers();
    var user  = users[uKey];

    if (!user) return { ok: false, msg: 'ไม่พบชื่อผู้ใช้นี้ในระบบ' };
    if (user.status === 'suspended') return { ok: false, msg: 'บัญชีนี้ถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ' };
    var storedPwd = String(user.password || user.pass || '');
    if (storedPwd !== String(password)) return { ok: false, msg: 'รหัสผ่านไม่ถูกต้อง' };

    var session = {
      username: uKey,
      name:     user.name,
      role:     user.role,
      initials: user.initials || user.name.charAt(0).toUpperCase(),
      password: storedPwd,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem('mck_user', JSON.stringify(session)); // backward compat
    return { ok: true, user: session };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('mck_user');
    window.location.href = 'index.html';
  }

  function hasAccess(pageKey) {
    var user = getUser();
    if (!user) return false;
    var up = (getPerms()[user.role] || []);
    return up.indexOf('all') !== -1 || up.indexOf(pageKey) !== -1;
  }

  function check(pageKey) {
    var user = getUser();
    if (!user) {
      document.documentElement.style.visibility = 'hidden';
      window.location.href = 'index.html';
      return false;
    }
    // Restore sessionStorage for pages that still read it
    sessionStorage.setItem('mck_user', JSON.stringify(user));
    if (!hasAccess(pageKey)) {
      document.documentElement.style.visibility = 'hidden';
      alert('⛔ ไม่มีสิทธิ์เข้าถึงหน้านี้\nRole ของคุณ: ' + user.role);
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }

  // Fill g-topbar user info by class name (works for all standardized pages)
  function fillTopbar() {
    var user = getUser();
    if (!user) return;
    document.querySelectorAll('.g-user-name').forEach(function(el) { el.textContent = user.name; });
    document.querySelectorAll('.g-user-role').forEach(function(el) { el.textContent = user.role; });
    document.querySelectorAll('.g-user-avatar').forEach(function(el) { el.textContent = user.initials; });
  }

  return {
    login, logout, getUser, getPerms, savePerms,
    hasAccess, check, fillTopbar,
    DEFAULT_PERMS, ALL_PAGES, getUsers,
  };
})();

// Global doLogout for pages that don't define their own
window.doLogout = function () { MCK_Auth.logout(); };

// Auto-fill topbar on every sub-page after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  MCK_Auth.fillTopbar();
});
