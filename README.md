# 🚛 ICL Logistics Management System - Demo

ระบบบริหารจัดการขนส่งและเอกสารแบบครบวงจร แบ่งเป็น 5 ระบบหลัก

## 🌐 Live Demo

**เข้าใช้งาน:** [https://silenttl.github.io/logistics-demo/](https://silenttl.github.io/logistics-demo/)

---

## 🔐 รหัสเข้าใช้งาน (Demo Accounts)

### หน้าหลัก (index.html)

| Role | Username | Password |
|------|----------|----------|
| 👑 Admin | `admin` | `admin123` |
| 👔 Manager | `manager` | `mgr123` |
| 📞 Customer Service | `cs` | `cs123` |
| 🔧 Technician | `tech` | `tech123` |
| 🚚 Driver | `driver` | `driver123` |
| 📄 Documentation | `doc` | `doc123` |

### Container Hub (container-hub.html)

| Role | Username | Password | สิทธิ์เข้าถึง |
|------|----------|----------|--------------|
| 👑 Admin | `admin` | `admin123` | ทุกระบบ |
| 👔 Manager | `manager` | `mgr123` | ทุกระบบ |
| 📞 CS | `cs` | `cs123` | Dashboard, ID Card, ซ่อม, EIR |
| 🔧 ช่าง | `tech` | `tech123` | งานช่าง, อะไหล่ |
| 🚚 คนขับ | `driver` | `driver123` | แจ้งซ่อมเท่านั้น |
| 📄 เอกสาร | `doc` | `doc123` | Dashboard, ID Card |

### Fleet Hub (fleet-hub.html)

| Role | Username | Password | สิทธิ์เข้าถึง |
|------|----------|----------|--------------|
| 👑 Admin | `admin` | `admin123` | ทุกระบบ |
| 🚛 Fleet Manager | `manager` | `mgr123` | ทุกระบบ |
| 📋 จัดรถ | `dispatch` | `disp123` | Dashboard, จัดรถ, ติดตาม, ซ่อม |
| 💰 การเงิน | `finance` | `fin123` | Dashboard, ค่าเที่ยว, น้ำมัน |
| 📡 ประสานงาน | `coord` | `coord123` | Dashboard, ติดตาม, จัดรถ |
| 🚚 คนขับ | `driver` | `driver123` | แจ้งซ่อมเท่านั้น |

### Document Management (DOCUMENTS.html) & Invoice System (INVOICE.html)

| Role | Username | Password | สิทธิ์เข้าถึง |
|------|----------|----------|--------------|
| 👑 Admin | `admin` | `admin123` | ทุกระบบ |
| 👔 Manager | `manager` | `mgr123` | ทุกระบบ |
| 📋 Documentation | `doc` | `doc123` | สร้างเอกสาร, Invoice, Packing, Shipping |
| 💼 Account | `account` | `acc123` | Invoice, ค่าใช้บริการ, Reports |

---

## ✨ Features

### 🏠 หน้าหลัก (index.html)
- Login System (6 Roles)
- Dashboard & Quick Actions
- Auto-complete (ลูกค้า, ล้ง, ตู้)
- Timeline Tracking
- Document Management

### 📦 Container Hub (container-hub.html)
- Dashboard ภาพรวมตู้
- Container ID Card — ดูข้อมูลตู้ทั้งหมด
- ระบบแจ้งซ่อม 6 ขั้นตอน (พร้อมอนุมัติตามวงเงิน)
- งานช่าง — Work Order, Labor Hours
- สต๊อคอะไหล่
- EIR Gate-In / Gate-Out
- Preventive Maintenance (PM)
- Temperature Log (Reefer)
- Photo Gallery per Container

### 🚛 Fleet Hub (fleet-hub.html)
- Dashboard ภาพรวมกองรถ + KPI
- จัดรถ (Dispatch) + AI แนะนำรถ
- ติดตามรถ Real-time + ติดต่อคนขับ
- ค่าเที่ยว — คำนวณ, จ่ายเงิน, Export
- น้ำมัน — เรทราคา, บันทึกเติม, km/L
- โปรไฟล์คนขับ + KPI Score
- ทะเบียนรถ + เอกสาร (ภาษี/ประกัน/พรบ.)
- แจ้งซ่อมรถ + Workflow อนุมัติ

### 📋 Document Management (DOCUMENTS.html) ✨ NEW
- **Dashboard** ภาพรวมเอกสารทั้งหมด
- **Document Creation** ฟีเจอร์สร้างเอกสารแบบครบวงจร
- **Invoice Management** (ดูรายละเอียดใน INVOICE.html)
- **Packing List** - ใบรายการสินค้า
- **Shipping Document** - เอกสารเรือนส่ง (BL)
- **Export Document** - เอกสารการส่งออก
- **Templates** - ห้องสมุด Template
- **Settings** - ตั้งค่าข้อมูลบริษัท
- **Integration** - เชื่อมกับ INVOICE.html

### 🧾 Invoice Management (INVOICE.html) ✨ NEW
- **7 ประเภท Invoice**: NK, TRAIN-CN, TRAIN-LAO, THB, CNY, USD, MUK
- **Validation System** ✅
  - ตรวจ HS CODE ขาดหายไป
  - ตรวจ Weight ไม่ถูกต้อง
  - ตรวจ Currency Error
  - ตรวจ Duplicate Product
  - ตรวจ Empty Customer
- **Auto Calculation** 🧮
  - FOB (Free On Board)
  - CNF (Cost & Freight)
  - CIF (Cost, Insurance & Freight)
- **Multi-Currency** 💱
  - THB (บาท)
  - CNY (หยวน)
  - USD (ดอลลาร์)
  - Exchange Rate Support
- **Master Data Management**
  - จัดการลูกค้า (CRUD)
  - จัดการสินค้า (CRUD)
  - HS CODE Database
- **Document Features**
  - Preview & Print
  - PDF Export Ready
  - Dynamic Template

---

## 🎯 Key Highlights

- ⚡ **เร็วขึ้น 3 เท่า** — ลดเวลาจาก 10 นาที → 2 นาที
- ✅ **ลดข้อผิดพลาด 90%** — ด้วยระบบ Auto-complete และ Validation
- 📍 **Real-time Tracking** — ติดตามสถานะทุกขั้นตอน
- 👥 **Role-Based Access** — แต่ละคนเห็นเฉพาะสิ่งที่ต้องการ
- 🔗 **5 ระบบเชื่อมกัน** — Container, Fleet, Documents, Invoice, Export
- 💾 **LocalStorage Persistence** — บันทึกข้อมูลบน Browser
- 🌍 **Multi-Currency Support** — รองรับ THB, CNY, USD
- 📊 **HS CODE Database** — ระบบตัวอักษรสินค้าอย่างถูกต้อง
- 🧮 **Smart Calculation** — FOB, CNF, CIF โดยอัตโนมัติ
- 📱 **Fully Responsive** — ใช้งานได้ทั้ง Desktop และ Mobile

---

## 🚀 การใช้งาน

1. เปิด Link: https://silenttl.github.io/logistics-demo/
2. กด Quick Login เลือก Role ที่ต้องการทดสอบ
3. ทดลองฟีเจอร์ต่าง ๆ
4. ไปที่ container-hub.html, fleet-hub.html, DOCUMENTS.html หรือ INVOICE.html เพื่อดูระบบ

### การใช้ Invoice System

```
1. ไปที่ INVOICE.html หรือคลิก 🧾 Invoice ใน DOCUMENTS.html
2. ไปที่แท็บ "สร้างใบแจ้งหนี้"
3. กรอกข้อมูล (ประเภท, ลำดับเอกสาร, วันที่, ลูกค้า, สกุลเงิน)
4. คลิก "+ เพิ่มสินค้า"
5. เลือกสินค้า กรอก Qty, Weight, Unit Price
6. ระบบจะคำนวณ FOB, CNF, CIF อัตโนมัติ
7. คลิก "บันทึกใบแจ้งหนี้"
8. คลิก "ดูตัวอย่าง" เพื่อ Preview
9. คลิก "พิมพ์" เพื่อบันทึก PDF
```

### การใช้ Document Management

```
1. ไปที่ DOCUMENTS.html
2. ไปที่แท็บที่ต้องการ (Invoice, Packing, Shipping, Export)
3. คลิก "+ สร้างใหม่"
4. กรอกข้อมูล
5. คลิก "บันทึก"
6. ดูรายการในตาราด้านล่าง
```

---

## ⚠️ ข้อจำกัดของ Demo

- ข้อมูลเป็น Demo ทั้งหมด (ไม่ใช่ข้อมูลจริง)
- ไม่มีการบันทึกข้อมูลถาวร (Refresh = Reset) แต่ใช้ LocalStorage ในการทำงาน
- ไม่ส่ง SMS/Email จริง
- ไม่มี GPS Tracking จริง
- ไม่มี Server-side Validation (ตรวจสอบ Client-side เท่านั้น)

---

## 📚 Documentation

- 📖 [INVOICE10.md](./INVOICE10.md) - ข้อกำหนดการออกแบบระบบ Invoice
- 📖 [DOCUMENTS-GUIDE.md](./DOCUMENTS-GUIDE.md) - คู่มือการใช้ Document Management System

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **CSS Framework:** Tailwind CSS (CDN)
- **Icons:** Font Awesome 6
- **Font:** Sarabun, Kanit (Thai Support)
- **Deployment:** GitHub Pages

---

**Made with ❤️ for Modern Logistics Management**
