# 📦 Logisticbynamkhang - Export Management System (Invoice10)

ระบบเว็บแอปพลิเคชันสำหรับจัดการเอกสารส่งออกสินค้าแบบครบวงจร พัฒนาขึ้นเพื่อทดแทนการทำงานบน Excel (เดิมคือ Invoice 10-2.xlsx) เพื่อลดความซับซ้อน ลดข้อผิดพลาด (Human Error) และเพิ่มประสิทธิภาพในการออกเอกสาร

## 🚀 ภาพรวมระบบ (Project Overview)
ระบบนี้ถูกออกแบบมาเพื่อรองรับงานขนส่งทางเรือ รถไฟ (ไทย-จีน-ลาว) และการขนส่งชายแดน โดยเน้นการสร้าง Invoice, Packing List และ Shipping Documents ที่มีความถูกต้องแม่นยำสูงผ่านระบบ Validation อัตโนมัติ

## ✨ ฟีเจอร์หลัก (Key Features)

### 1. Invoice Management 🧾
รองรับการสร้างใบแจ้งหนี้ 7 รูปแบบในระบบเดียว:
*   **NK**: รูปแบบมาตรฐาน
*   **TRAIN-CN / TRAIN-LAO**: สำหรับการขนส่งทางรถไฟ
*   **THB / CNY / USD**: รองรับหลายสกุลเงิน
*   **MUK**: สำหรับด่านมุกดาหาร

### 2. ระบบตรวจสอบข้อมูล (Validation System)
ช่วยลดความผิดพลาดก่อนบันทึกเอกสาร:
*   **HS CODE Validation**: ตรวจสอบการระบุรหัสพิกัดศุลกากร
*   **Weight Validation**: ป้องกันการลืมใส่น้ำหนัก หรือน้ำหนักไม่ถูกต้อง
*   **Currency Check**: ตรวจสอบความถูกต้องของสกุลเงินที่ใช้
*   **Duplicate Detection**: ป้องกันรายการสินค้าซ้ำในใบเดียว

### 3. ระบบคำนวณอัตโนมัติ (Auto Calculation)
*   คำนวณยอดรวม (Grand Total) และน้ำหนักรวม (Total Weight)
*   รองรับการคำนวณเงื่อนไขราคา **FOB, CNF, และ CIF**
*   ระบบจัดการอัตราแลกเปลี่ยน (Exchange Rate) ในตัว

### 4. Document Management & Templates 📋
*   สร้างและจัดการ Packing List, Shipping Document, และ Export Document
*   มีระบบ Templates Library สำหรับเลือกรูปแบบเอกสารที่ต้องการ
*   Dashboard สรุปภาพรวมและสถิติเอกสารทั้งหมด

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
*   **UI Framework**: Responsive Design (รองรับทั้ง Desktop, Tablet, และ Mobile)
*   **Storage**: Browser LocalStorage (สำหรับการเก็บข้อมูลฝั่ง Client ใน Phase 1)
*   **Data Structure**: JSON-based storage

## 📂 โครงสร้างข้อมูล (Data Storage)
ระบบจัดเก็บข้อมูลใน `LocalStorage` โดยใช้ Keys หลักดังนี้:
*   `docInvoices`: ข้อมูลใบแจ้งหนี้
*   `docPacking`: ข้อมูลรายการบรรจุภัณฑ์
*   `docShipping`: ข้อมูลเอกสารการขนส่ง
*   `docSettings`: การตั้งค่าบริษัทและอัตราแลกเปลี่ยน

## ⚙️ การติดตั้งและเริ่มต้นใช้งาน

1.  **Clone Project**:
    ```bash
    git clone https://github.com/namkhang/Logisticbynamkhang.git
    ```
2.  **เปิดใช้งาน**:
    เปิดไฟล์ `DOCUMENTS.html` หรือ `INVOICE.html` ผ่านเว็บเบราว์เซอร์ (แนะนำ Google Chrome)
3.  **การตั้งค่า**:
    ไปที่เมนู **Settings** ⚙️ เพื่อตั้งค่าข้อมูลบริษัทและอัตราแลกเปลี่ยนก่อนเริ่มใช้งานครั้งแรก

## 📊 ขั้นตอนการทำงาน (Workflow)
1.  **Master Data**: เพิ่มข้อมูลลูกค้า (Customer) และสินค้า (Product) ในระบบ
2.  **Create**: เลือกประเภท Invoice และกรอกข้อมูลหัวเอกสาร
3.  **Add Items**: เลือกสินค้าและระบุจำนวน (ระบบจะดึง HS CODE และคำนวณราคาให้อัตโนมัติ)
4.  **Validate & Save**: ระบบตรวจสอบความถูกต้องและบันทึกลงในฐานข้อมูล
5.  **Print/Export**: พิมพ์เอกสารหรือบันทึกเป็น PDF ผ่านเบราว์เซอร์

## 🛣 Roadmap ในอนาคต
- [ ] เชื่อมต่อฐานข้อมูลฝั่ง Server (Node.js + PostgreSQL/MySQL)
- [ ] ระบบส่งเอกสารผ่าน Email และ SMS Notification
- [ ] ระบบ Export เป็น PDF โดยตรงจากระบบ
- [ ] ระบบ Authentication และ Role-based Access Control
- [ ] ระบบจัดการสต็อกสินค้า (Inventory Integration)

## 🔐 ความปลอดภัยและข้อแนะนำ
*   **Data Backup**: เนื่องจากปัจจุบันเก็บข้อมูลใน LocalStorage ควรหมั่นทำการ Backup หรือใช้ฟีเจอร์ Export ข้อมูลอย่างสม่ำเสมอ
*   **Security**: ข้อมูลจะถูกเก็บไว้ที่เครื่องของผู้ใช้งานเท่านั้น (Client-side)

---
**Version**: 1.0.0
**Last Updated**: 13 May 2024
**Developer**: ICL Logistics Development Team