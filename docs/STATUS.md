# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00  
Updated by: Claude Code

## Current goal

- Lab 07 cross-model review ตอบครบแล้ว (`docs/review-claude-rebuttal.md`) · เหลือ merge PR #10 → PR #7 (ต้องให้เจ้าของ repo กด merge)

## Done

- Lab 00 project init (commit f215da6)
- Lab 01: สัมภาษณ์ 9 ข้อแล้ว และเขียน `docs/PROFILE.md` ภาษาไทยเสร็จ
- Lab 02: `docs/DEBATE.md` + `docs/DECISIONS.md` D1–D14 (Subagents 3 บทบาท × 2 รอบ)
- Lab 03: issues #1–#5 (map D1–D6) · โน้ต MCP vs gh ใน DECISIONS
- Lab 04 (Claude · PR #7): L2 ปิด (`parseProfile` + `tests/profile.test.ts`) · Layout/เมนูไทย 4 รายการ ไม่มี Guestbook (D4, D9) · Home/About/Interests/Contact ตาม D1–D11 · Guestbook page (ไม่ลิงก์) escape output
- Lab 05 (OpenCode · PR #10): `insertContact` / `insertGuestbook` / `listGuestbook` + validation (D11) · API แยก 400/500/501 ด้วยข้อความคงที่ · `test:labs` เขียว
- Lab 05b swarm: `docs/SWARM.md` (4/20 turns · done ครบ)
- Lab 06 E2E (Claude): `docs/QA.md` ## E2E Playwright ผ่าน Playwright MCP — ทุก step ผ่าน · a11y debate + action items A11Y-1..9
- Lab 07 (Claude): ตอบ `docs/review-opencode.md` — M1 ✅ (merge `lab-05-backend` เข้า `lab-04-frontend` + resolve conflict) · S1–S4 ✅ · N1/N3/N4 ✅ · N2 คงไว้พร้อมเหตุผล · เพิ่ม A11Y-1 (ขอบ input 3.37:1) + เทส frontmatter กันคำว่า course · `npm test` 14/14 · `test:labs` 2/2 · build ผ่าน

## In progress

- —

## Blocked

- —

## Next actions

1. เจ้าของ repo merge PR #10 → แล้ว PR #7 (#7 รวม #10 ไว้แล้ว ไม่มี conflict) · ปิด issue #8 / #1–#5 ตามที่อ้าง
2. วางสรุป round-trip จาก `docs/review-claude-rebuttal.md` บน PR #7
3. ก่อน ship: L9 (guestbook route / moderation) · L5 (DATA_DIR + DB ใหม่)

## Files changed in latest session

- `src/lib/profile.ts` · `src/pages/interests.astro` · `src/pages/guestbook.astro` · `src/layouts/BaseLayout.astro`
- `tests/profile.test.ts` · `tests/public-site.test.ts`
- `docs/review-opencode.md` (commit ไฟล์ของ OpenCode ตามเดิม) · `docs/review-claude-rebuttal.md` · `docs/QA.md` · `docs/STATUS.md` · `docs/OPEN_LOOPS.md`
- `.gitignore` (`.playwright-mcp/`, `docs/_pr-diff-*.txt`)

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- PROFILE.md: ควรเขียนเนื้อหาติด heading (parser ใหม่ทน blank line ได้แล้ว)
- Guestbook ยังไม่เปิดใช้จริง (D9 · issue #9) · ห้ามลิงก์เข้า nav/footer
