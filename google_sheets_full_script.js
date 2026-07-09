/**
 * ====================================================================
 * โค้ด Google Apps Script แบบไดนามิก (Universal Apps Script Backend)
 * ====================================================================
 * 
 * สคริปต์รุ่นนี้ถูกออกแบบมาเป็นพิเศษเพื่อให้รองรับข้อมูลทุกหน้าในระบบ MCK Logistics (12 โมดูล)
 * โดยจะเขียนและอ่านข้อมูลแบบออโต้ตามรายชื่อชีตในตารางกูเกิลชีตของท่านโดยอัตโนมัติ
 * 
 * ขั้นตอนติดตั้ง:
 * 1. เปิด Google Sheets "Profile Container.ICL 2024" (หรือสร้างชีตใหม่)
 * 2. ไปที่เมนู "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 3. วางโค้ดนี้ทั้งหมดแทนที่โค้ดเก่า แล้วกดบันทึก
 * 4. กดปุ่ม "การทำให้ใช้งานได้" (Deploy) -> "การทำให้ใช้งานได้ใหม่" (New Deployment)
 * 5. เลือกประเภทเป็น "เว็บแอป" (Web App) ตั้งสิทธิ์การเข้าถึงเป็น "ทุกคน" (Anyone) แล้วกด Deploy
 * 6. คัดลอก "URL ของเว็บแอป" ไปใส่ในหน้าต่างตั้งค่าเชื่อมโยงของระบบเว็บ
 */

// เปิดใช้งาน CORS สำหรับ GET
function doGet(e) {
  const action = e.parameter.action;
  let result = {};
  
  try {
    if (action === 'getData') {
      result = getAllSheetData();
    } else {
      result = { status: 'error', message: 'ไม่พบชุดคำสั่ง GET' };
    }
  } catch (error) {
    result = { status: 'error', message: error.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// เปิดใช้งาน CORS สำหรับ POST
function doPost(e) {
  let result = {};
  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;
    
    if (action === 'syncData') {
      result = syncAllSheetData(postData.data);
    } else if (action === 'logScan') {
      result = recordScanLog(postData.log);
    } else {
      result = { status: 'error', message: 'ไม่พบคำสั่งบันทึก POST' };
    }
  } catch (error) {
    result = { status: 'error', message: error.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ฟังก์ชันดึงข้อมูลจากทุกชีตแบบไดนามิก
function getAllSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const allData = {};
  
  sheets.forEach(sheet => {
    const name = sheet.getName().toLowerCase(); // ทำชื่อชีตเป็นตัวเล็กเพื่อซิงค์ง่าย
    allData[name] = getSheetDataAsJson(sheet);
  });
  
  return { status: 'success', data: allData };
}

function getSheetDataAsJson(sheet) {
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  
  const headers = rows[0];
  const jsonData = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    headers.forEach((header, index) => {
      if (header) {
        let val = row[index];
        // แปลงค่าสตริง JSON กลับเป็น Object หรือ Array เช่น ในคอลัมน์ checklist หรือ photos
        if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
          try {
            val = JSON.parse(val);
          } catch(e) {}
        }
        item[header] = val;
      }
    });
    jsonData.push(item);
  }
  return jsonData;
}

// ฟังก์ชันซิงค์ข้อมูลทุกตารางจากหน้าเว็บลงชีตย่อยแบบออโต้
function syncAllSheetData(datasets) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  for (let sheetName in datasets) {
    // ปรับรูปแบบชื่อชีตจริง เช่น container -> Container, parts -> Parts
    const formattedName = sheetName.charAt(0).toUpperCase() + sheetName.slice(1);
    let sheet = ss.getSheetByName(formattedName);
    
    // หากไม่มีชีตนี้ ให้สร้างใหม่เลยแบบอัตโนมัติ!
    if (!sheet) {
      sheet = ss.insertSheet(formattedName);
    }
    
    const dataList = datasets[sheetName];
    if (dataList && Array.isArray(dataList)) {
      writeJsonToSheet(sheet, dataList);
    }
  }
  
  return { status: 'success', message: 'ซิงค์ข้อมูลทุกโมดูลลงชีตย่อยสำเร็จ' };
}

function writeJsonToSheet(sheet, jsonArray) {
  sheet.clearContents();
  if (jsonArray.length === 0) return;
  
  // รวบรวมหัวตารางจากคีย์ทั้งหมดในออบเจกต์แรก
  const headers = Object.keys(jsonArray[0]);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  const values = jsonArray.map(item => {
    return headers.map(header => {
      let val = item[header];
      if (val !== null && typeof val === 'object') {
        return JSON.stringify(val); // แปลงออบเจกต์เป็นสตริงเพื่อบันทึกใน 1 ช่อง
      }
      return val === undefined ? '' : val;
    });
  });
  
  sheet.getRange(2, 1, values.length, headers.length).setValues(values);
}

// ฟังก์ชันบันทึกประวัติการแสกน GPS แบบต่อท้ายแถว (Append Row)
function recordScanLog(log) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('ScanLogs');
  
  if (!sheet) {
    sheet = ss.insertSheet('ScanLogs');
    sheet.appendRow(['Timestamp', 'ContainerNo', 'Latitude', 'Longitude', 'GoogleMapsLink', 'ScannedBy', 'DeviceInfo', 'IPAddress']);
  }
  
  const timestamp = new Date().toLocaleString('th-TH');
  const mapsLink = `https://www.google.com/maps?q=${log.lat},${log.lng}`;
  
  sheet.appendRow([
    timestamp,
    log.containerNo || '-',
    log.lat || '-',
    log.lng || '-',
    mapsLink,
    log.scannedBy || 'บุคคลภายนอก',
    log.deviceInfo || '-',
    log.ipAddress || '-'
  ]);
  
  return { status: 'success', message: 'บันทึกพิกัดสแกนตู้เรียบร้อย' };
}
