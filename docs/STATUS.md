# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00  
Updated by: Claude Code

## Current goal

- Lab 05 Backend ปิดแล้ว (`test:labs` เขียว) · ถัดไป: PR รวมงาน backend + ตามติด Lab 04 Frontend ตาม "เกณฑ์พร้อม Frontend" ใน `docs/DECISIONS.md`

## Done

- Lab 00 project init (commit f215da6)
- Lab 01: สัมภาษณ์ 9 ข้อแล้ว และเขียน `docs/PROFILE.md` ภาษาไทยเสร็จ
- Lab 02 (รอบใหม่ 2026-09-25): ไฟล์ DEBATE/DECISIONS เดิมว่าง 0 byte ทั้งที่ STATUS บอกว่าเสร็จ → รันใหม่ด้วย Subagents 3 บทบาท × 2 รอบ · `docs/DEBATE.md` ครบ 3 หัวข้อ + ตารางจุดขัดแย้ง · `docs/DECISIONS.md` D1–D14 (เลขเดิม D5/D9/D10/D11 ตรงกับ OPEN_LOOPS) · PROFILE: Tagline + Bio ย่อหน้า 3–4 (D2) · Headline คงเดิม (D1)
- Lab 05 (OpenCode): implement `insertContact` / `insertGuestbook` / `listGuestbook` ใน `src/lib/db.ts` + validation ตาม D11 (ความยาวตาม maxlength ฟอร์ม, email format) · `api/contact.ts` + `api/guestbook.ts`: แยก 400 (validation) / 500 (server) / 501 และ error body เป็นข้อความคงที่ไม่ leak `err.message` · `npm run test:labs` 2/2 เขียว · `npm test` เขียว · `npm run build` ผ่าน
- Lab 06 E2E (Claude): `docs/QA.md` ## E2E Playwright — รันซ้ำผ่าน **Playwright MCP** แล้ว ทุก step ผ่าน (Home/About/Interests/Contact 200 · contact 201 · invalid 400 · guestbook 201 · control 404) · screenshots `docs/screenshots/mcp-*.png` · findings QA-1..7 ยังไม่แก้ (รอหลัง a11y)

## In progress

- Lab 05b swarm: ปิดแล้ว — `docs/SWARM.md` (4/20 turns · done ครบ)

## Blocked

- —

## Next actions

1. สร้าง PR จากงาน Lab 05 (ข้อความ PR body เตรียมไว้แล้ว — ดูบันทึกในเซสชันนี้) · ownership Backend / OpenCode · ปิด issue #8 เมื่อ merge
2. **Lab 04 Frontend (Claude) — ทำใหม่:** งาน UI ที่เคยอยู่ใน working tree ถูก revert หาย (`src/pages/*.astro` กลับเป็น template English) · ทำตาม "เกณฑ์พร้อม Frontend" ใน `docs/DECISIONS.md` · ไม่มี Guestbook ในเมนู/footer (D9) · API พร้อมรองรับฟอร์มเดิมแล้ว (demo ผ่านทั้ง API และ UI แล้วใน `docs/SWARM.md`)

## Files changed in latest session

- `src/lib/db.ts` (implement insertContact / insertGuestbook / listGuestbook — แทน stub)
- `src/pages/api/contact.ts` · `src/pages/api/guestbook.ts` (safe error mapping 400/500/501)
- `docs/fe-be-contract-check.md` (รายงานตรวจสัญญา FE↔BE — หายจากดิสก์แล้วเขียนคืนพร้อมสถานะ)
- `docs/SWARM.md` (Lab 05b — turns 4/20 · outcome · gaps)
- `docs/STATUS.md` · `docs/OPEN_LOOPS.md` (รอบนี้)

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- PROFILE.md: ห้ามมีบรรทัดว่างคั่นระหว่าง heading กับเนื้อหา ไม่อย่างนั้น `loadProfile()` จะไปใช้ค่า fallback
- Guestbook ยังไม่เปิดใช้จริง (D9 — ผ่านแค่ 2/6 เงื่อนไข ดู issue #9) · ห้ามลิงก์เข้า nav/footer
- ตรวจสอบผ่าน GitHub MCP แล้ว (user `supunkangolf`) — PAT อยู่ที่ MCP config ไม่ใช่ `.env`
