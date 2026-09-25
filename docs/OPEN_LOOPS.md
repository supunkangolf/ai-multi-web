# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ  
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-24 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L2 | `src/lib/profile.ts` อ่านได้แค่บรรทัดแรกของแต่ละ section: regex ใช้ flag `m` คู่กับ `$` ใน lookahead ทำให้ Bio ได้แค่ย่อหน้าแรก และ Interests ได้แค่ bullet แรก | Claude (frontend) | P1 | Lab 04 | เจอตอน Lab 01 · ยังไม่แก้ เพราะรอบนั้นทำแค่เอกสาร |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | 2026-09-24 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
