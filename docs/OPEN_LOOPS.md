# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 +07:00 (Claude Code · Lab 07)

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L3 | PROFILE ยังไม่มี `## Skills` และ LinkedIn เป็น `—` (DECISIONS D5/D10) | human | P2 | ก่อน Lab 04 จบ | เจ้าของเว็บเติมข้อมูล · Claude ไม่เดาแทน |
| L4 | เลือกอีเมลที่จะแสดงบนเว็บ: Gmail ส่วนตัว (ค่าปัจจุบัน) หรืออีเมลงานแยก (DECISIONS D5 · Devil R5) | human | P3 | ก่อน ship | v1 ใช้ค่าใน PROFILE ไปก่อน |
| L5 | เงื่อนไขก่อนเปิดฟอร์ม Contact: ~~ไม่มี `GET /api/contact`~~ ✅ · ~~validate ความยาว~~ ✅ (Lab 05) · ยังเหลือ: แจ้งเตือนเจ้าของเมื่อมีข้อความใหม่ · `DATA_DIR` บน volume ถาวร · ระยะเวลาเก็บ/วิธีลบ (DECISIONS D11) | OpenCode (backend) | P2 | Lab 08 (deploy) | ส่วน validation/error ทำแล้วใน Lab 05 ตาม `docs/fe-be-contract-check.md` + issue #8 · deploy ด้วย SQLite ใหม่ (ข้อมูล demo local มีคำว่า Lab — QA-7) |
| L8 | ติดตั้ง browser ของ Playwright (`npx playwright install`) แล้วรัน `npm run test:e2e` ยืนยันหน้าใหม่ (label ฟอร์มยังมีคำ Name/Email/Message) | human | P3 | ก่อน Lab 06 | เครื่องนี้ไม่มี Chromium · ไม่ใช่บั๊กโค้ด |
| L6 | ยืนยันจะประกาศ "เปิดรับงาน (ประจำ/ฟรีแลนซ์)" บนเว็บหรือไม่ (DECISIONS D13 · Devil R9) | human | P3 | ก่อน ship | ระหว่างนี้ CTA ใช้ถ้อยคำกลาง |
| L7 | Case study 1 ชิ้นไม่ระบุชื่อลูกค้า (ปัญหา → สิ่งที่ทำ → ผลลัพธ์) + บรรทัดอธิบาย Interests (DECISIONS D14 / D7) | human | P2 | v1.1 · ไม่บล็อก Lab 04 | Claude ไม่แต่งเนื้อหาแทน |
| L9 | `/guestbook` เข้าถึงได้ทาง URL ตรง และหลัง PR #10 merge `GET /api/guestbook` list ทุกแถวโดยไม่มี moderation (review R-3 · D9) | OpenCode (backend) + human | P2 | ก่อน ship | ทางเลือก: ปิด route ตอน deploy หรือทำ moderation ตาม issue #9 |
| L10 | a11y follow-up: API คืน field ที่ผิด → `aria-invalid` รายช่อง (A11Y-8 · OpenCode) · skip link (A11Y-9 · Claude) | OpenCode / Claude | P2 | หลัง ship | ดู `docs/QA.md` ## สถานะหลัง PR #7 |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | 2026-09-24 |
| L2 | parser `profile.ts` อ่านได้แค่ย่อหน้า/bullet แรก → เขียน `parseProfile` ใหม่ + `tests/profile.test.ts` | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
