# Handoff: Claude (frontend) → OpenCode (backend)

Timestamp: 2026-09-25 14:20 +07:00  
Task: Lab 04 Frontend — หน้า Home / About / Interests / Contact ตาม PROFILE + DECISIONS D1–D14 (issues #1–#5)  
Status: IMPLEMENTED (ยังไม่ commit — ผู้ใช้ตรวจ diff ก่อน)

## What changed

- `src/lib/profile.ts`: `parseProfile()` ใหม่ อ่านทุกย่อหน้า Bio / ทุก bullet · เพิ่ม `tagline`, `bioParagraphs`, `skills`, `contact` · ค่า `—` ไม่ถูกส่งออก (ปิด L2)
- Layout ธีมน้ำเงิน–ม่วง · เมนู 4 รายการ (D4) · ไม่มี Guestbook ในเมนู/footer (D9)
- Contact: ปุ่ม "ส่งอีเมล" (mailto) · ฟอร์ม POST `/api/contact` JSON `{name, email, message}` · ตอบ 2xx = ล้างฟอร์ม + ขอบคุณ · 400 = ให้ผู้ใช้ตรวจข้อมูล · อื่น ๆ (501/500/network) = ไม่ล้างช่อง + ข้อความ D6 + ลิงก์ส่งอีเมล · ไม่แสดง `error` จาก API ให้ผู้ใช้
- Guestbook page ยังอยู่ที่ `/guestbook` แต่ไม่ลิงก์ · client escape ทุกฟิลด์ก่อน render · API ไม่พร้อม = ข้อความสั้น

## Files

- src/lib/profile.ts · tests/profile.test.ts
- src/layouts/BaseLayout.astro
- src/pages/index.astro · about.astro · interests.astro · contact.astro · guestbook.astro
- ไม่แตะ `src/lib/db.ts` / `src/pages/api/**`

## Verification

- Unit / smoke: PASS — `npm test` 3 files · 10 tests
- Labs (`npm run test:labs`): FAIL — คาดไว้ (stub `NOT_IMPLEMENTED` รอ Lab 05)
- Manual / localhost: `npm run build` + `node dist/server/entry.mjs` → 5 หน้า 200 · เมนูไม่มี Guestbook · ที่อยู่อีเมลมีเฉพาะใน `href` · About 5 `<p>` · Interests 4 การ์ด · `POST /api/contact` → 501 `NOT_IMPLEMENTED`
- E2E: NOT_RUN — Chromium ของ Playwright ไม่ได้ติดตั้งบนเครื่อง (L8)

## Assumptions to challenge

1. Frontend ถือว่า 400 = ข้อมูลไม่ผ่าน validate และสถานะอื่นที่ไม่ใช่ 2xx = ระบบยังไม่พร้อม — ถ้า backend ใช้ 422/429 ให้แจ้ง (ตอนนี้ 422/429 จะได้ข้อความ "ยังไม่พร้อม")
2. Guestbook API คาดรูป `GET → { entries: [{ name, message, created_at }] }` ตาม template เดิม · D9 ยังเลื่อน Guestbook ไป Later — ไม่ต้องทำ UI เพิ่ม

## Request to next agent

**OpenCode agent `backend` — Lab 05:** implement `src/lib/db.ts` + `src/pages/api/contact.ts` (และ guestbook ถ้า Lab ต้องการ) จน `npm run test:labs` เขียว

- ทำตาม D11 / L5: validate ความยาว · **ไม่มี** `GET /api/contact` · `DATA_DIR` บน volume ถาวร · error ตอบสั้น ไม่ leak stack/SQL
- Guestbook (ถ้าทำ): เงื่อนไข D9 — escape, rate limit, honeypot, เพดานความยาว/จำนวนแถว, moderation
- **อย่าแตะ UI** (`src/pages/*.astro`, `src/layouts/`, `src/lib/profile.ts`) — ถ้าต้องการเปลี่ยนสัญญา request/response ให้เขียนลง handoff กลับมา

## Canonical state updated

- [x] `docs/STATUS.md`
- [x] `docs/OPEN_LOOPS.md` (ปิด L2 · เพิ่ม L8)
- [ ] `docs/DECISIONS.md` (ไม่มี decision ใหม่)
- [ ] อื่น ๆ: —

## Single-writer note

Writer รอบถัดไปของ STATUS/OPEN_LOOPS = OpenCode (backend) หลังผู้ใช้ commit งานรอบนี้
