# 📋 Document Management System - คู่มือการใช้งาน

## 📄 ภาพรวม

ระบบ Document Management System เป็นแอปพลิเคชั่นเว็บสำหรับจัดการเอกสารส่งออกสินค้าแบบครบวงจร

### 🎯 ฟีเจอร์หลัก

#### 1. **Dashboard** 📊
- แสดงสถิติเอกสารทั้งหมด (Invoice, Packing List, Shipping Doc)
- แสดงรายการเอกสารล่าสุด
- สรุปข้อมูลเพื่อให้ผู้บริหารติดตาม

#### 2. **Invoice Management** 🧾
- สร้างใบแจ้งหนี้พร้อมหลากหลายรูปแบบ
- รองรับ 7 ประเภท (NK, TRAIN-CN, TRAIN-LAO, THB, CNY, USD, MUK)
- ระบบตรวจสอบข้อมูลอัตโนมัติ:
  - ตรวจ HS CODE
  - ตรวจ Weight
  - ตรวจ Currency Compatibility
  - ตรวจ Duplicate Product
- การคำนวณอัตโนมัติ: FOB, CNF, CIF
- รองรับหลายสกุลเงิน (THB, CNY, USD)

#### 3. **Packing List** 📦
- สร้างใบรายการสินค้าในการ
- ติดตามจำนวนรายการ
- เชื่อมโยงกับ Invoice

#### 4. **Shipping Document** 🚢
- สร้างเอกสารเรือนส่ง (BL)
- ระบุผู้รับสินค้าและกำลัง (CBM)
- ระบุเส้นทางการขนส่ง

#### 5. **Export Document** 📤
- สร้างเอกสารการส่งออก
- ระบุผู้ส่งออกและประเทศปลายทาง
- ระบบติดตามการส่งออก

#### 6. **Templates** 🎨
- ห้องสมุดของ Templates
- Preview Template ก่อนใช้
- สามารถปรับแต่ง Template ตามต้องการ

#### 7. **Settings** ⚙️
- ตั้งค่าข้อมูลบริษัท
- ตั้งค่า Tax ID และข้อมูลบัญชี
- ตั้งค่า Exchange Rate
- ตั้งค่าผู้ใช้งาน

---

## 🚀 การใช้งาน

### ล็อกอิน

```
Username: admin / manager / doc
Password: (ตามระบบหลัก)
```

### ขั้นตอนการสร้าง Invoice

1. **เข้าไปที่ส่วน Invoice**
   - คลิก 🧾 Invoice ในเมนูด้านซ้าย

2. **กรอกข้อมูลหัวเอกสาร**
   - ประเภท Invoice (NK, TRAIN-CN, etc.)
   - ลำดับเอกสาร
   - วันที่
   - ลูกค้า
   - สกุลเงิน

3. **เพิ่มสินค้า**
   - คลิก "+ เพิ่มสินค้า"
   - เลือกสินค้า
   - ระบุ Qty, Weight, Unit Price
   - ระบบจะคำนวณ Total อัตโนมัติ

4. **ตรวจสอบข้อมูล**
   - ระบบจะตรวจสอบ:
     - HS CODE ขาดหายไป
     - Weight ไม่ถูกต้อง
     - Currency Error
     - Duplicate Product

5. **บันทึก**
   - คลิก "บันทึกใบแจ้งหนี้"
   - ระบบจะบันทึกถาวรใน LocalStorage

6. **ดูตัวอย่าง**
   - คลิก "ดูตัวอย่าง" เพื่อเห็น Invoice ก่อนพิมพ์
   - สามารถพิมพ์จาก Browser

---

## 💾 ข้อมูลที่เก็บ

### LocalStorage Keys

```javascript
// Invoice
docInvoices // ข้อมูล Invoice ทั้งหมด

// Packing List
docPacking // ข้อมูล Packing List

// Shipping
docShipping // ข้อมูล Shipping Document

// Export
docExport // ข้อมูล Export Document

// Settings
docSettings // ข้อมูลการตั้งค่าบริษัท
```

### ตัวอย่าง Invoice Object

```json
{
  "id": 1715600000000,
  "invoiceNo": "INV-2024-001",
  "invoiceType": "NK",
  "customerId": 1,
  "invoiceDate": "2024-05-13",
  "transportType": "ocean",
  "currency": "THB",
  "totalWeight": 1000,
  "grandTotal": 50000,
  "items": [
    {
      "productId": 1,
      "qty": 10,
      "weight": 100,
      "unitPrice": 5000,
      "total": 50000,
      "hsCode": "0901.11.00"
    }
  ],
  "notes": "หมายเหตุ",
  "status": "draft",
  "createdAt": "2024-05-13T10:00:00.000Z",
  "updatedAt": "2024-05-13T10:00:00.000Z"
}
```

---

## 📋 Validation Rules

### HS CODE Validation
- **ข้อกำหนด**: ทุกสินค้าต้องมี HS CODE
- **ตัวอย่าง**: 0901.11.00, 1006.30.00
- **ผลกระทบ**: ห้ามบันทึก หากขาดหายไป

### Weight Validation
- **ข้อกำหนด**: น้ำหนักต้อง > 0
- **ตัวอย่าง**: 100 kg, 1.5 ton
- **ผลกระทบ**: ห้ามบันทึก หากเป็น 0

### Currency Validation
- **ข้อกำหนด**: สกุลเงินต้องตรงกับสินค้า
- **ตัวอย่าง**: THB, CNY, USD
- **ผลกระทบ**: แจ้งเตือน (Warning) หากไม่ตรง

### Duplicate Validation
- **ข้อกำหนด**: ห้ามมีสินค้าชนิดเดียวกันซ้ำ
- **ผลกระทบ**: ห้ามบันทึก หากมีรายการซ้ำ

### Customer Validation
- **ข้อกำหนด**: ต้องเลือกลูกค้า
- **ผลกระทบ**: ห้ามบันทึก หากไม่เลือก

---

## 💱 Exchange Rates

### อัตราแลกเปลี่ยน (Default)

| Currency | Rate |
|----------|------|
| THB | 1.00 |
| CNY | 4.50 |
| USD | 33.50 |

### การแก้ไข Exchange Rate
1. ไปที่ Settings ⚙️
2. หา Exchange Rate
3. กรอกอัตราใหม่
4. บันทึก

---

## 🔄 Integration กับ INVOICE.html

### ความสามารถในการเชื่อมต่อ

```
DOCUMENTS.html → INVOICE.html
```

- คลิก "🧾 Invoice System" เพื่อไปยังระบบ Invoice Management แบบเต็ม
- ข้อมูล Invoice จะซิงค์โดยใช้ LocalStorage

### ข้อมูลที่ซิงค์

- **Customers**: ข้อมูลลูกค้า
- **Products**: ข้อมูลสินค้า
- **Invoices**: ข้อมูลใบแจ้งหนี้
- **Settings**: ข้อมูลการตั้งค่า

---

## 🔐 Security & Best Practices

### ด้านความปลอดภัย

✅ **ทำแล้ว**:
- Client-side Validation
- Data Validation on Save
- Error Handling
- Secure LocalStorage

⚠️ **ข้อควรระวัง**:
- ข้อมูลเก็บใน Browser LocalStorage เท่านั้น
- Refresh Page = Reset ข้อมูล (หากไม่มีการบันทึก)
- ไม่มี Server-side Validation

### Recommendations

1. **Backup Data**: ดาวน์โหลด JSON Backup
2. **Export PDF**: ใช้ Print to PDF สำหรับบันทึก
3. **Regular Save**: บันทึกบ่อยๆ ขณะกำลังใช้งาน
4. **Test Before Live**: ทดสอบใน Development ก่อน

---

## 📱 Responsive Design

### Device Support

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

### Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 🚀 Future Features

### Planned Enhancements

- [ ] Server-side Database Integration
- [ ] PDF Export with Design
- [ ] Email Sending
- [ ] SMS Notification
- [ ] Multi-language Support
- [ ] User Authentication
- [ ] Role-based Access Control
- [ ] Audit Log & History
- [ ] Bulk Import/Export
- [ ] API Integration

---

## 📞 Support

### Troubleshooting

**ปัญหา**: ข้อมูลหายไป หลังจาก Refresh
**วิธีแก้**: ข้อมูลจะต้องถูกบันทึกผ่าน "บันทึก" button ก่อน

**ปัญหา**: ไม่สามารถเพิ่มสินค้า
**วิธีแก้**: ตรวจสอบให้แน่ใจว่าได้เพิ่มสินค้าในส่วน Product Master ก่อน

**ปัญหา**: ข้อผิดพลาด Validation
**วิธีแก้**: ตรวจสอบตามข้อความแสดงข้อผิดพลาด และแก้ไขข้อมูล

---

## 📄 License

ระบบนี้เป็นส่วนหนึ่งของ ICL Logistics Management System

---

**Last Updated**: 13 May 2024
**Version**: 1.0.0
**Author**: ICL Logistics Development Team

