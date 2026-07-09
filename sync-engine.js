/**
 * ====================================================================
 * MCK Sync Engine - ระบบซิงค์ข้อมูลกูเกิลชีตอัตโนมัติ (Global Sync)
 * ====================================================================
 * 
 * โมดูลนี้ทำหน้าที่ดักจับการเขียนข้อมูลลง LocalStorage ของทุกๆ หน้าจอโดยอัตโนมัติ
 * และส่งข้อมูลไปซิงค์บน Google Sheets ทำให้พนักงานทั้ง 20 คนแชร์ข้อมูลกันได้แบบเรียลไทม์
 */

const MCK_Sync = (function() {
  const SHEET_URL_KEY = 'mck_sheet_url';
  let debounceTimeout = null;

  // รายชื่อคีย์ข้อมูลที่จะซิงค์ขึ้นชีตย่อย
  const SYNC_KEYS = [
    'mck_users',
    'mck_page_perms',
    'mck_jobs',
    'mck_shipments',
    'mck_buyers',
    'mck_products',
    'mck_rates',
    'mck_audit_logs',
    'mck_checkins',
    'mck_additional_work',
    'mck_messages',
    'mck_driver_repairs',
    'mck_containers',
    'mck_parts',
    'mck_repairs',
    'mck_inspections',
    'invoiceInvoices',
    'invoiceCustomers',
    'invoiceProducts',
    'invoiceExchangeRates',
    'invoiceSettings'
  ];

  function getSheetUrl() {
    return localStorage.getItem(SHEET_URL_KEY) || '';
  }

  function setSheetUrl(url) {
    if (url) {
      localStorage.setItem(SHEET_URL_KEY, url.trim());
    } else {
      localStorage.removeItem(SHEET_URL_KEY);
    }
  }

  // ดึงข้อมูลทั้งหมดจาก Google Sheets มาเซฟลงเครื่องย่อย
  async function pullData() {
    const url = getSheetUrl();
    if (!url) return { ok: false, msg: 'ยังไม่มีการตั้งค่า URL Google Sheets' };

    try {
      const response = await fetch(`${url}?action=getData`);
      const res = await response.json();
      
      if (res.status === 'error') {
        throw new Error(res.message);
      }

      // บันทึกลง LocalStorage ทีละคีย์
      const data = res.data || {};
      for (const sheetName in data) {
        // หาคีย์ LocalStorage ที่ตรงกับชื่อชีต (ไม่คิด Case Sensitive)
        const matchedKey = SYNC_KEYS.find(k => k.toLowerCase() === sheetName.toLowerCase());
        if (matchedKey) {
          localStorage.setItem(matchedKey, JSON.stringify(data[sheetName]));
        }
      }
      return { ok: true, msg: 'โหลดข้อมูลจาก Google Sheets สำเร็จ' };
    } catch (e) {
      console.error('MCK Sync Pull Error:', e);
      return { ok: false, msg: e.toString() };
    }
  }

  // ส่งข้อมูลทั้งหมดจากเครื่องย่อยขึ้น Google Sheets
  async function pushData() {
    const url = getSheetUrl();
    if (!url) return;

    // รวบรวมข้อมูลทั้งหมดที่ต้องการซิงค์
    const payload = {};
    SYNC_KEYS.forEach(key => {
      let val = [];
      try {
        val = JSON.parse(localStorage.getItem(key)) || [];
      } catch (err) {
        val = localStorage.getItem(key) || '';
      }
      // ลบคำว่า mck_ ด้านหน้าออกเพื่อให้ชื่อชีตย่อยดูสะอาด
      const sheetName = key.replace(/^mck_/, '');
      payload[sheetName] = val;
    });

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'syncData',
          data: payload
        })
      });
      console.log('MCK Sync: ส่งข้อมูลอัปเดตขึ้น Google Sheets เรียบร้อย');
    } catch (e) {
      console.error('MCK Sync Push Error:', e);
    }
  }

  // ฟังก์ชันหน่วงเวลาบันทึก (Debounce) เพื่อไม่ให้ยิงขอเซฟถี่เกินไป
  function triggerPush() {
    if (!getSheetUrl()) return;
    
    if (debounceTimeout) clearTimeout(debounceTimeout);
    
    // ตั้งเวลาส่งประวัติห่างจากขยับล่าสุด 2.5 วินาที
    debounceTimeout = setTimeout(() => {
      pushData();
      // ยิง Event แจ้งเตือนหน้าย่อยว่ากำลังซิงค์
      const event = new CustomEvent('mck_sync_status', { detail: 'synced' });
      window.dispatchEvent(event);
    }, 2500);

    const event = new CustomEvent('mck_sync_status', { detail: 'syncing' });
    window.dispatchEvent(event);
  }

  // ทำลายและเขียนทับคำสั่ง localStorage.setItem เพื่อดักการเขียนข้อมูลแบบออโต้
  function hijackLocalStorage() {
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      // หากมีการแก้ข้อมูลสำคัญ ให้สั่งซิงค์ขึ้นคลาวด์ชีตอัตโนมัติ
      if (SYNC_KEYS.includes(key)) {
        triggerPush();
      }
    };
  }

  // ดำเนินการแทรกสคริปต์
  hijackLocalStorage();

  return {
    getUrl: getSheetUrl,
    setUrl: setSheetUrl,
    pull: pullData,
    push: pushData,
    triggerPush: triggerPush
  };
})();
