# MCK Logistics — ระบบจัดการโลจิสติกส์ครบวงจร

ระบบเว็บแอปพลิเคชันสำหรับบริหารงานโลจิสติกส์และส่งออกสินค้าแบบครบวงจร รองรับการขนส่งทางเรือ รถไฟ (ไทย–จีน–ลาว) และการขนส่งชายแดน พัฒนาด้วย Vanilla HTML/CSS/JS โดยไม่ต้องพึ่ง Server — ข้อมูลทั้งหมดเก็บใน Browser LocalStorage

## 🌐 ทดสอบระบบออนไลน์

> **Live Demo:** [https://silenttl.github.io/Logisticbynamkhang/](https://silenttl.github.io/Logisticbynamkhang/)

หน้าแรกคือหน้า **Login** — ใช้บัญชีทดสอบด้านล่างเพื่อเข้าใช้งาน

| Username   | Password    | Role       | สิทธิ์                            |
|------------|-------------|------------|-----------------------------------|
| `boss`     | `boss123`   | Boss       | ทุกหน้า                           |
| `admin`    | `admin123`  | Admin      | ทุกหน้า                           |
| `manager`  | `mgr123`    | Manager    | ทุกหน้า                           |
| `cs`       | `cs123`     | ประสานงาน  | Dashboard, Datacenter, Container, Quotation, Shipping |
| `doc`      | `doc123`    | เอกสาร     | Dashboard, Datacenter, Document, Shipping, SOP |
| `driver`   | `driver123` | Driver     | Driver Portal เท่านั้น            |
| `tech`     | `tech123`   | ช่าง        | Dashboard, Fleet, Container       |
| `dispatch` | `disp123`   | Dispatch   | Dashboard, Fleet, Container, Quotation |
| `finance`  | `fin123`    | Finance    | Dashboard, Invoice, Quotation, Fleet, HR |

---

## 📦 ภาพรวมโมดูล (12 หน้า)

| โมดูล | ไฟล์ | คำอธิบาย |
|-------|------|----------|
| 🏠 Dashboard | `dashboard.html` | ภาพรวมงาน สถิติ KPI รายวัน |
| 🗄 Datacenter | `datacenter.html` | ฐานข้อมูลลูกค้า สินค้า Consignee |
| 📄 ทีมเอกสาร | `document-team.html` | ติดตามสถานะงานเอกสาร |
| 📦 Container Hub | `container-hub.html` | จัดการตู้คอนเทนเนอร์ การจองและการใช้งาน |
| 🚛 Fleet Hub | `fleet-hub.html` | บริหารรถและคนขับ ติดตามทะเบียนรถ |
| 🧾 Invoice | `INVOICE.html` | ออกใบแจ้งหนี้ 7 รูปแบบ พร้อม Packing List |
| 💰 ต้นทุน/ราคา | `quotation-costing.html` | คำนวณต้นทุน ราคาขาย FOB/CNF/CIF |
| 🏛 เอกสารราชการ | `shipping-gov.html` | เอกสารส่งออก ใบขน Permit |
| 👥 HR & Perms | `hr-management.html` | จัดการพนักงาน สิทธิ์เข้าถึงแต่ละหน้า |
| 🚗 Driver Portal | `driver-portal.html` | พอร์ทัลสำหรับคนขับ งานและรายการจัดส่ง |
| 🔒 Security | `security-overview.html` | ภาพรวมความปลอดภัย Log การเข้าใช้ |
| 📋 SOP & WI | `SOP-WI.html` | คู่มือขั้นตอนการทำงานและ Work Instruction |

---

## 🔐 ระบบ Authentication (MCK Auth)

ระบบใช้ **MCK_Auth** — โมดูล JS ที่เขียนเป็น IIFE กลาง ไฟล์เดียว (`auth.js`) ใช้ร่วมกันทุกหน้า

**คุณสมบัติหลัก:**
- **Persistent Login** — session เก็บใน `localStorage` ไม่ต้อง login ซ้ำแม้ปิด browser
- **Role-Based Access Control (RBAC)** — แต่ละ role มีสิทธิ์เข้าหน้าต่างๆ ตามที่กำหนด
- **Auth Guard** — ทุกหน้าย่อยมี `MCK_Auth.check('pageKey')` ใน `<head>` ป้องกันการเข้าถึงโดยตรง
- **Permission Matrix UI** — หน้า HR มีตารางให้ Admin แก้ไขสิทธิ์ได้แบบ Real-time
- **Single User Database** — ผู้ใช้ทั้งหมดเก็บใน `localStorage` key `mck_users` ใช้ร่วมกันทุกหน้า

**LocalStorage Keys หลัก:**
| Key | เนื้อหา |
|-----|---------|
| `mck_session` | Session ของผู้ใช้ที่ login อยู่ |
| `mck_users` | ข้อมูลผู้ใช้ทั้งหมด (เพิ่มจาก HR ได้) |
| `mck_page_perms` | สิทธิ์เข้าถึงแต่ละหน้าต่อ role (แก้ไขจาก HR) |

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Styling:** Tailwind CSS (CDN) + `shared.css` design system ของโปรเจค
- **Storage:** Browser LocalStorage (Client-side, ไม่ต้องการ Server)
- **Auth:** Custom IIFE module (`auth.js`) — ไม่ใช้ library ภายนอก
- **Icons:** Font Awesome 6

---

## ⚙️ การติดตั้งและเริ่มต้นใช้งาน

```bash
# Clone
git clone https://github.com/Silenttl/Logisticbynamkhang.git
cd Logisticbynamkhang

# เปิดในเบราว์เซอร์ (แนะนำ Chrome / Edge)
open index.html
```

> ไม่ต้องติดตั้ง dependency หรือ build step — เปิดไฟล์ได้เลย

**ขั้นตอนแรก:**
1. เปิด `index.html` → หน้า Login จะปรากฏ
2. Login ด้วย `boss / boss123` เพื่อเข้าถึงทุกโมดูล
3. ไปที่ **HR & Perms** เพื่อจัดการสิทธิ์และเพิ่มผู้ใช้

---

## 📊 โครงสร้างไฟล์

```
Logisticbynamkhang/
├── index.html              ← หน้า Login + Module Launcher
├── auth.js                 ← MCK Auth — ระบบ Login กลาง
├── shared.css              ← Design system ร่วม
├── dashboard.html
├── datacenter.html
├── document-team.html
├── container-hub.html
├── fleet-hub.html
├── INVOICE.html
├── quotation-costing.html
├── shipping-gov.html
├── hr-management.html
├── driver-portal.html
├── security-overview.html
└── SOP-WI.html
```

---

## 🛣 Roadmap

- [x] ระบบ Authentication + Role-Based Access Control
- [x] Permission Matrix UI ใน HR Page
- [x] Persistent Login (localStorage session)
- [x] Auth Guard ทุกหน้า
- [ ] Export เอกสารเป็น PDF โดยตรง
- [ ] ระบบ Notification / แจ้งเตือนงาน
- [ ] เชื่อมต่อ Backend (Node.js + PostgreSQL)
- [ ] ระบบ Audit Log เต็มรูปแบบ
- [ ] Mobile App (PWA)

---

**Version:** 2.0.0 | **Last Updated:** May 2026 | **Author:** Silenttl
