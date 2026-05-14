# INVOICE10.md

# DOCUMENT CATEGORY: INVOICE

## PROJECT NAME
Invoice10 Export Management System

---

# PROJECT OVERVIEW

ระบบนี้คือ Web Application สำหรับจัดการเอกสารส่งออกสินค้า  
อ้างอิงจากระบบ Excel เดิมชื่อ:

```text
Invoice 10-2.xlsx
```

ใช้สำหรับ:

- สร้าง Invoice
- Packing List
- Shipping Document
- Export Document
- ระบบงาน Shipping
- ระบบงาน Export

รองรับ:

- รถไฟจีน
- รถไฟลาว
- ขนส่งชายแดน
- ส่งออกผลไม้
- หลาย Currency

---

# BUSINESS OBJECTIVE

เปลี่ยนระบบจาก:

```text
Excel-Centric
```

เป็น:

```text
Database-Centric Web Application
```

เพื่อลด:

- สูตร Excel จำนวนมาก
- การ copy sheet
- Human Error
- การแก้ไขยาก
- ความช้าในการใช้งาน

---

# CURRENT SYSTEM ANALYSIS

ระบบเดิมใช้ Excel หลายชีต เช่น:

- Invoice NK
- Invoice รถไฟจีน
- Invoice THB
- Invoice มุกดาหาร
- ตรวจเอกสาร
- UNIT
- SET WEIGHT
- CONSIGNEE LIST
- EXPORTER LIST

---

# CURRENT PROBLEMS

## 1. มีชีตซ้ำจำนวนมาก

แต่ละชีตต่างกันเพียง:

- ภาษา
- Currency
- Header
- ลูกค้า
- ด่านส่งออก

แต่ Logic เหมือนกัน

---

## 2. ใช้สูตรจำนวนมาก

เช่น:

- VLOOKUP
- IFERROR
- IFS
- IMPORTRANGE

ทำให้:

- ไฟล์ช้า
- Maintenance ยาก
- เสี่ยงสูตรเสีย

---

## 3. ไม่มี Database จริง

ข้อมูลกระจายหลายชีต

---

# SYSTEM REQUIREMENTS

# FRONTEND

ใช้:

- HTML
- CSS
- JavaScript

หรือ:

- React
- Next.js

---

# BACKEND

ใช้:

- Node.js + Express

หรือ:

- Laravel

หรือ:

- Django

---

# DATABASE

ใช้:

- PostgreSQL
- MySQL

---

# MAIN FEATURES

# 1. LOGIN SYSTEM

Roles:

- Admin
- Staff
- Viewer

---

# 2. DASHBOARD

แสดง:

- จำนวน Invoice
- จำนวนลูกค้า
- จำนวนสินค้า
- ยอดรวม
- Invoice ล่าสุด

---

# 3. CUSTOMER MASTER

จัดการ:

- Customer Name
- Country
- Address
- Consignee
- Currency

CRUD:

- Create
- Read
- Update
- Delete

---

# 4. PRODUCT MASTER

จัดการ:

- Product Name
- HS CODE
- Unit
- Weight
- Currency

---

# 5. CREATE INVOICE

ฟอร์มสร้าง Invoice

## Header Fields

- Invoice No
- Date
- Customer
- Country
- Invoice Type
- Currency
- Transport Type

---

## Item Fields

- Product
- Qty
- Weight
- Unit Price
- Total

---

## Auto Calculation

ระบบต้องคำนวณ:

- Total Amount
- Total Weight
- CIF
- CNF
- FOB
- Exchange Rate

---

# 6. INVOICE TYPES

รองรับ:

- NK
- TRAIN-CN
- TRAIN-LAO
- THB
- CNY
- USD
- MUK

IMPORTANT:

ห้ามสร้างหลายหน้า

ใช้:

```text
dynamic invoice template
```

โดยเปลี่ยน Layout ตาม:

```text
invoice_type
```

---

# 7. VALIDATION SYSTEM

ระบบตรวจ:

- Missing HS CODE
- Missing Weight
- Currency Error
- Duplicate Product
- Empty Customer

---

# 8. PDF EXPORT

Export:

- Invoice PDF
- Packing List
- Shipping Document

รองรับ:

- A4
- ภาษาไทย
- ภาษาอังกฤษ
- ภาษาจีน

---

# DATABASE STRUCTURE

# TABLE: customers

```sql
id
name
country
address
consignee
currency
created_at
```

---

# TABLE: products

```sql
id
product_name
hs_code
unit
default_weight
currency
created_at
```

---

# TABLE: invoices

```sql
id
invoice_no
customer_id
invoice_type
transport_type
currency
total_weight
total_amount
status
created_at
```

---

# TABLE: invoice_items

```sql
id
invoice_id
product_id
qty
weight
unit_price
total
```

---

# TABLE: exchange_rates

```sql
id
currency
rate
updated_at
```

---

# FILE STRUCTURE

```text
project/
│
├── index.html
├── assets/
│   ├── style.css
│   └── app.js
│
├── data/
│   ├── customers.json
│   ├── products.json
│   ├── invoices.json
│   └── exchange_rates.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── models/
│
└── exports/
```

---

# SOP

# SOP-01 CREATE INVOICE

## FLOW

```text
Login
    ↓
Create Invoice
    ↓
Select Customer
    ↓
Add Product
    ↓
Auto Calculate
    ↓
Validation
    ↓
Save Invoice
    ↓
Export PDF
```

---

# SOP-02 VALIDATION

ระบบตรวจ:

- HS CODE
- Weight
- Currency
- Duplicate Product
- Empty Customer

---

# WI

# WI-01 CREATE INVOICE

1. เปิด Create Invoice
2. กรอก Header
3. เลือกลูกค้า
4. เลือกประเภท Invoice
5. เพิ่มสินค้า
6. กรอก Qty / Price
7. Save
8. Export PDF

---

# SYSTEM LOGIC

# LOGIC-01

เปลี่ยน Layout ตาม:

```text
invoice_type
```

---

# LOGIC-02

ระบบรองรับหลาย Currency:

- THB
- CNY
- USD

---

# LOGIC-03

Calculation:

```text
total = qty × unit_price
```

---

```text
grand_total = sum(all items)
```

---

```text
total_weight = sum(weight)
```

---

# IMPORTANT DEVELOPMENT RULES

## RULE-01

ห้าม:

```text
copy page
copy sheet
```

---

## RULE-02

ใช้:

```text
dynamic template
dynamic form
```

---

## RULE-03

ข้อมูลทั้งหมดต้องอยู่ใน Database

---

## RULE-04

Frontend และ Backend ต้องแยกกัน

---

# FUTURE FEATURES

- OCR
- AI Validation
- QR Code
- Shipping Tracking
- Exchange Rate API

---

# FINAL GOAL

ระบบต้อง:

- ใช้งานง่าย
- โหลดเร็ว
- รองรับมือถือ
- ขยายได้
- ลด Human Error
- ลดการใช้ Excel
- รองรับงาน Export จริง
