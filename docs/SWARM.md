# Swarm — Lab 05b (to green)

> วันที่: 2026-09-25 · Coordinator: OpenCode · เพดาน: 20 turns

## Turns used

**4 / 20** — จบก่อนเพดาน (done ครบทุกข้อ)

| Turn | งาน | Agent/เครื่องมือ | ผล |
|---|---|---|---|
| 1 | ยืนยัน `npm run test:labs` เขียว 2/2 และอ่าน DECISIONS ที่เกี่ยว (D6/D9/D11) | OpenCode (backend) | ✅ |
| 2 | Start server (`npm start` · dist ล่าสุด) + HTTP smoke | OpenCode + pwsh | ✅ |
| 3 | ส่งฟอร์มจริงผ่าน browser (playwright MCP): `/contact` และ `/guestbook` | playwright MCP | ✅ |
| 4 | เขียนไฟล์นี้ + อัปเดต STATUS.md | OpenCode (single-writer) | ✅ |

## Outcome — done criteria

1. **`npm run test:labs` เขียว** — 2/2 (`insertContact` persist · guestbook roundtrip) ✅
2. **ส่งฟอร์ม demo บน localhost ได้จริง** ✅
   - API level: `POST /api/contact` → 201 · `POST /api/guestbook` → 201 (ข้อความไทยครบ) · `GET /api/guestbook` → 200 รายการเรียงใหม่→เก่า · payload ว่าง/อีเมลผิด → 400 `{"error":"invalid"}` (ไม่ leak รายละเอียด)
   - UI level (ผ่านฟอร์มจริงใน browser): Contact "Sent. Thank you!" · Guestbook ลงสมุดแล้วแถวโผล่ทันที (id 3) · ข้อมูล persist ลง SQLite (`data/site.sqlite`)
   - พิสูจน์ persist ข้าม request: แถวจาก POST ผ่าน `Invoke-WebRequest` (08:19) ปรากฏในหน้า guestbook ที่โหลดใหม่ทีหลัง

## Gaps (ช่องว่างที่เหลือ — ไม่บล็อก done criteria)

- **UI บน localhost ยังเป็น template stub (English)** — งาน UI ของ Lab 04 (หน้าไทยตาม D5/D6) ที่เคยอยู่ใน working tree ถูก revert หายไประหว่างเซสชัน (ร่วมกับ `docs/fe-be-contract-check.md` ที่หายแล้วเขียนคืน) → Lab 04 (Claude/frontend) ต้องทำใหม่บน `src/pages/*.astro` · ผล demo นี้ยืนยันว่า API รองรับฟอร์มเดิมของ template ได้ทันที
- **Guestbook ยังโผล่ใน nav/footer ของ template** — ขัด D9 เมื่อทำ UI จริง; เงื่อนไข D9 (rate limit · honeypot · moderation · ลบแถวเก่า) ยังเปิด = issue #9
- **Minor:** template guestbook render ข้อความติด timestamp ไม่มีช่องว่าง — หายไปพร้อม UI ใหม่ของ Lab 04
- **L5 (deploy side):** แจ้งเตือนเจ้าของเมื่อมีข้อความใหม่ · `DATA_DIR` บน volume ถาวร · ระยะเก็บ/วิธีลบ → Lab 08

## Notes

- Ownership เคารพตลอด: แตะเฉพาะ `src/lib/db.ts` + `src/pages/api/*` (OpenCode) — ไม่แก้ `.astro` ใด
- ไม่แก้ไฟล์เทส · ไม่มี secret หลุด · MCP ใช้เป็นเครื่องมือทดสอบ UI เท่านั้น ไม่ใช่ท่อระหว่าง harness
- Issue #8 ยังเปิดไว้จน PR merge (เกณฑ์ในนั้นครบแล้วทางโค้ด)