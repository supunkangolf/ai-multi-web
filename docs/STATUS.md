# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00  
Updated by: Claude (frontend)

## Current goal

- Lab 04 Frontend เสร็จตาม "เกณฑ์พร้อม Frontend" ใน `docs/DECISIONS.md` · ถัดไป Lab 05 Backend (OpenCode) — ดู `docs/handoffs/04-claude-to-opencode.md`

## Done

- Lab 00 project init (commit f215da6)
- Lab 01: สัมภาษณ์ 9 ข้อแล้ว และเขียน `docs/PROFILE.md` ภาษาไทยเสร็จ
- Lab 02: `docs/DEBATE.md` + `docs/DECISIONS.md` D1–D14
- Lab 03: issues #1–#5 (map D1–D6) · โน้ต MCP vs gh ใน DECISIONS
- Lab 04 (branch `lab-04-frontend` · ยังไม่ commit):
  - L2 ปิด: `src/lib/profile.ts` เขียน parser ใหม่ (`parseProfile`) อ่านทุกย่อหน้า/bullet · เพิ่ม tagline, bioParagraphs, skills, contact · ช่อง `—` ถูกตัด · `tests/profile.test.ts`
  - Layout ธีมน้ำเงิน–ม่วง (PROFILE Tone) · เมนูไทย 4 รายการ ไม่มี Guestbook (D4, D9) · footer ไม่มี Guestbook
  - Home: headline + tagline + CTA "ติดต่อผม" / "ดู GitHub" (D1, D2, D4) · ไม่มี Audience/Bio บน Home (D3)
  - About: Bio ครบทุกย่อหน้า (D8) · Interests: การ์ดครบ 4 ชิ้น · Skills ไม่ render เมื่อไม่มี section (D7, D10)
  - Contact: ปุ่ม "ส่งอีเมล" (mailto · ไม่มีที่อยู่เป็นข้อความ) · LinkedIn `—` ไม่ render (D5) · 501/error ไม่ล้างช่อง + ข้อความตาม D6 + ลิงก์ส่งอีเมล · microcopy privacy (D11)
  - Guestbook page (ไม่ลิงก์): escape output + ข้อความสั้นเมื่อ API ไม่พร้อม
  - `npm test` 10/10 PASS · `npm run build` ผ่าน · `test:labs` RED (คาดไว้ · รอ Lab 05)

## In progress

- —

## Blocked

- —

## Next actions

1. ผู้ใช้ตรวจ diff แล้ว commit บน `lab-04-frontend` + เปิด PR เข้า learner repo (อ้าง #1–#5)
2. สลับไป OpenCode agent `backend` ทำ Lab 05 ตาม handoff `docs/handoffs/04-claude-to-opencode.md`
3. `npx playwright install` ก่อนรัน `npm run test:e2e` (เครื่องนี้ยังไม่มี Chromium)

## Files changed in latest session

- src/lib/profile.ts · tests/profile.test.ts (L2)
- src/layouts/BaseLayout.astro
- src/pages/index.astro · about.astro · interests.astro · contact.astro · guestbook.astro
- docs/STATUS.md · docs/OPEN_LOOPS.md · docs/handoffs/04-claude-to-opencode.md

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- Parser ใหม่ทนบรรทัดว่างหลัง heading ได้แล้ว แต่ยังควรเขียน PROFILE ให้เนื้อหาติด heading ตามเดิม
- โจทย์ Lab 04 ขอ "ลิงก์ Guestbook" แต่ D9 (อนุมัติแล้ว) สั่งไม่ใส่ในเมนู/footer → ทำตาม D9 · ถ้าจะเปลี่ยนต้องออก decision ใหม่
