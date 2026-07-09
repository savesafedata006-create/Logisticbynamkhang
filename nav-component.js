// nav-component.js — Shared Topbar Component with Google Sheets Sync Integration
// Usage: place <div id="topbar-root" data-title="..." data-subtitle="..." data-logo="..."></div>
// in the <body>, then include this script after auth.js in <head>.

// Inject sync-engine.js dynamically if not already present
if (!document.querySelector('script[src="sync-engine.js"]')) {
  const syncScript = document.createElement('script');
  syncScript.src = 'sync-engine.js';
  document.head.appendChild(syncScript);
}

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
      '<div class="g-topbar-right" style="display:flex; align-items:center; gap: 10px;">' +
        // Google Sheets Sync Badge
        '<button id="mck-sync-badge" onclick="MCK_Nav.openSyncSettings()" class="g-btn g-btn-ghost" style="padding: 0.35rem 0.75rem; display:flex; align-items:center; gap: 6px; font-size: 0.75rem; border-radius: 20px;">' +
          '<i class="fas fa-link" id="mck-sync-icon"></i>' +
          '<span id="mck-sync-text">เชื่อมต่อชีต</span>' +
        '</button>' +
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

    // Initialize Badge status on load
    updateBadgeStatus();
  }

  // Update subtitle text
  function setSubtitle(text) {
    var el = document.getElementById('nav-subtitle');
    if (el) el.textContent = text;
  }

  // Update sync badge UI based on MCK_Sync status
  function updateBadgeStatus(status) {
    const badge = document.getElementById('mck-sync-badge');
    const text = document.getElementById('mck-sync-text');
    const icon = document.getElementById('mck-sync-icon');
    if (!badge || !text || !icon) return;

    const currentStatus = status || (typeof MCK_Sync !== 'undefined' && MCK_Sync.getUrl() ? 'synced' : 'offline');

    if (currentStatus === 'synced') {
      badge.style.border = '1.5px solid #10b981';
      badge.style.background = 'rgba(16,185,129,0.18)';
      text.textContent = 'เชื่อม Google Sheet';
      icon.className = 'fas fa-check-circle text-emerald-400';
    } else if (currentStatus === 'syncing') {
      badge.style.border = '1.5px solid #3b82f6';
      badge.style.background = 'rgba(59,130,246,0.18)';
      text.textContent = 'กำลังบันทึก...';
      icon.className = 'fas fa-sync fa-spin text-blue-400';
    } else if (currentStatus === 'error') {
      badge.style.border = '1.5px solid #ef4444';
      badge.style.background = 'rgba(239,68,68,0.18)';
      text.textContent = 'การเชื่อมต่อขัดข้อง';
      icon.className = 'fas fa-exclamation-triangle text-rose-400';
    } else {
      badge.style.border = '1.5px solid rgba(255,255,255,.28)';
      badge.style.background = 'rgba(255,255,255,.14)';
      text.textContent = 'ต่อกับชีต (Offline)';
      icon.className = 'fas fa-link text-slate-300';
    }
  }

  // Listen to background sync engine updates
  window.addEventListener('mck_sync_status', function(e) {
    updateBadgeStatus(e.detail);
  });

  // Open Settings Modal
  function openSyncSettings() {
    let modal = document.getElementById('mck-sync-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'mck-sync-modal';
      modal.style = 'position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.6); backdrop-blur: 4px; font-family: Sarabun, sans-serif;';
      modal.innerHTML = `
        <div style="background:#fff; border-radius:16px; padding:24px; width:100%; max-width:420px; box-shadow:0 10px 25px rgba(0,0,0,0.2); border: 1px solid #e2e8f0; color:#1e293b;">
          <div style="display:flex; align-items:center; justify-content:between; border-bottom:1px solid #f1f5f9; padding-bottom:12px; margin-bottom:16px;">
            <strong style="font-size:1.1rem; display:flex; align-items:center; gap:8px;">
              <i class="fas fa-link" style="color:#2563eb;"></i> เชื่อมต่อ Google Sheets
            </strong>
            <button onclick="document.getElementById('mck-sync-modal').style.display='none'" style="border:none; background:none; cursor:pointer; font-size:1.2rem; color:#64748b; margin-left:auto;">&times;</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:0.85rem; line-height:1.5;">
            <p style="color:#64748b; margin:0;">ป้อน URL เว็บแอปของ Google Apps Script ที่ติดตั้งในสเปรดชีต "Profile Container" เพื่อให้ระบบเขียนและดึงข้อมูลแบบคลาวด์เรียลไทม์</p>
            <div>
              <label style="font-weight:700; color:#475569; display:block; margin-bottom:6px;">Google Apps Script Web App URL</label>
              <input type="text" id="mck-modal-url" placeholder="https://script.google.com/macros/s/.../exec" style="width:100%; border:2px solid #e2e8f0; border-radius:8px; padding:8px 12px; font-size:0.8rem; box-sizing:border-box;" />
            </div>
            <div id="mck-modal-status" style="padding:10px; border-radius:8px; display:none; font-size:0.75rem; font-weight:600;"></div>
            <div style="display:flex; gap:8px; border-top:1px solid #f1f5f9; padding-top:16px; margin-top:8px;">
              <button onclick="MCK_Nav.disconnectSync()" style="border:1px solid #fee2e2; background:#fef2f2; color:#b91c1c; border-radius:8px; padding:8px 12px; cursor:pointer; font-weight:700; font-size:0.8rem;">ตัดการเชื่อมต่อ</button>
              <button onclick="MCK_Nav.saveSync()" style="border:none; background:#2563eb; color:#fff; border-radius:8px; padding:8px 16px; cursor:pointer; font-weight:700; font-size:0.8rem; margin-left:auto;">เชื่อมต่อและดึงข้อมูล</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    document.getElementById('mck-modal-url').value = typeof MCK_Sync !== 'undefined' ? MCK_Sync.getUrl() : '';
    document.getElementById('mck-modal-status').style.display = 'none';
  }

  async function saveSync() {
    const url = document.getElementById('mck-modal-url').value.trim();
    const statusDiv = document.getElementById('mck-modal-status');
    
    if (!url) {
      alert('กรุณากรอก URL ของเว็บแอปก่อนกดเชื่อมต่อครับ');
      return;
    }

    statusDiv.style.display = 'block';
    statusDiv.style.background = '#eff6ff';
    statusDiv.style.color = '#1d4ed8';
    statusDiv.textContent = 'กำลังทดสอบเชื่อมต่อและดาวน์โหลดข้อมูลคลาวด์...';

    if (typeof MCK_Sync !== 'undefined') {
      MCK_Sync.setUrl(url);
      const res = await MCK_Sync.pull();
      if (res.ok) {
        statusDiv.style.background = '#dcfce7';
        statusDiv.style.color = '#15803d';
        statusDiv.textContent = 'เชื่อมโยงข้อมูลสำเร็จ! กำลังรีเฟรชหน้าจอ...';
        updateBadgeStatus('synced');
        setTimeout(() => {
          document.getElementById('mck-sync-modal').style.display = 'none';
          window.location.reload();
        }, 1500);
      } else {
        statusDiv.style.background = '#fee2e2';
        statusDiv.style.color = '#b91c1c';
        statusDiv.textContent = 'การเชื่อมต่อผิดพลาด: ' + res.msg;
        updateBadgeStatus('error');
      }
    }
  }

  function disconnectSync() {
    if (confirm('คุณต้องการตัดการเชื่อมต่อจาก Google Sheets และกลับไปใช้ข้อมูลออฟไลน์ใช่หรือไม่?')) {
      if (typeof MCK_Sync !== 'undefined') {
        MCK_Sync.setUrl('');
        updateBadgeStatus('offline');
        document.getElementById('mck-sync-modal').style.display = 'none';
        window.location.reload();
      }
    }
  }

  document.addEventListener('DOMContentLoaded', render);

  return { 
    render: render, 
    setSubtitle: setSubtitle, 
    openSyncSettings: openSyncSettings,
    saveSync: saveSync,
    disconnectSync: disconnectSync
  };
})();
