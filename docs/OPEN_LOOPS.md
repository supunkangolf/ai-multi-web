# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L2 | `src/lib/profile.ts` อ่านได้แค่บรรทัดแรกของแต่ละ section: regex ใช้ flag `m` คู่กับ `$` ใน lookahead ทำให้ Bio ได้แค่ย่อหน้าแรก และ Interests ได้แค่ bullet แรก | Claude (frontend) | P1 | Lab 04 | เจอตอน Lab 01 · ยังไม่แก้ เพราะรอบนั้นทำแค่เอกสาร |
| L3 | PROFILE ยังไม่มี `## Skills` และ LinkedIn เป็น `—` (DECISIONS D5/D10) | human | P2 | ก่อน Lab 04 จบ | เจ้าของเว็บเติมข้อมูล · Claude ไม่เดาแทน |
| L4 | เลือกอีเมลที่จะแสดงบนเว็บ: Gmail ส่วนตัว (ค่าปัจจุบัน) หรืออีเมลงานแยก (DECISIONS D5 · Devil R5) | human | P3 | ก่อน ship | v1 ใช้ค่าใน PROFILE ไปก่อน |
| L5 | เงื่อนไขก่อนเปิดฟอร์ม Contact: แจ้งเตือนเจ้าของเมื่อมีข้อความใหม่ · `DATA_DIR` บน volume ถาวร · ไม่มี `GET /api/contact` · ระยะเวลาเก็บ/วิธีลบ (DECISIONS D11) | OpenCode (backend) | P2 | Lab 05 / Lab 08 | Guestbook เลื่อนไป Later (D9) — ถ้าจะเปิดต้องผ่านเงื่อนไข D9 |
| L6 | ยืนยันจะประกาศ "เปิดรับงาน (ประจำ/ฟรีแลนซ์)" บนเว็บหรือไม่ (DECISIONS D13 · Devil R9) | human | P3 | ก่อน ship | ระหว่างนี้ CTA ใช้ถ้อยคำกลาง |
| L7 | Case study 1 ชิ้นไม่ระบุชื่อลูกค้า (ปัญหา → สิ่งที่ทำ → ผลลัพธ์) + บรรทัดอธิบาย Interests (DECISIONS D14 / D7) | human | P2 | v1.1 · ไม่บล็อก Lab 04 | Claude ไม่แต่งเนื้อหาแทน |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | 2026-09-24 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
