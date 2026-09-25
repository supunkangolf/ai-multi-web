# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00  
Updated by: Claude Code

## Current goal

- Lab 07 cross-model review: ตอบ `docs/review-opencode.md` (PR #7) → merge PR #10 (backend) ก่อน แล้ว PR #7 (frontend) ตาม M1

## Done

- Lab 00 project init (commit f215da6)
- Lab 01: สัมภาษณ์ 9 ข้อแล้ว และเขียน `docs/PROFILE.md` ภาษาไทยเสร็จ
- Lab 02: `docs/DEBATE.md` + `docs/DECISIONS.md` D1–D14 (Subagents 3 บทบาท × 2 รอบ)
- Lab 03: issues #1–#5 (map D1–D6) · โน้ต MCP vs gh ใน DECISIONS
- Lab 04 (Claude · PR #7): L2 ปิด (`parseProfile` + `tests/profile.test.ts`) · Layout/เมนูไทย 4 รายการ ไม่มี Guestbook (D4, D9) · Home/About/Interests/Contact ตาม D1–D11 · Guestbook page (ไม่ลิงก์) escape output
- Lab 05 (OpenCode · PR #10): `insertContact` / `insertGuestbook` / `listGuestbook` + validation (D11) · API แยก 400/500/501 ด้วยข้อความคงที่ · `test:labs` เขียว
- Lab 05b swarm: `docs/SWARM.md` (4/20 turns · done ครบ)
- Lab 06 E2E (Claude): `docs/QA.md` ## E2E Playwright ผ่าน Playwright MCP — ทุก step ผ่าน · a11y debate + action items A11Y-1..9

## In progress

- Lab 07: ดู `docs/review-claude-rebuttal.md`

## Blocked

- —

## Next actions

1. merge PR #10 → แล้ว PR #7 (branch `lab-04-frontend` merge `lab-05-backend` ไว้แล้ว — ไม่มี conflict ค้าง)

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- PROFILE.md: ควรเขียนเนื้อหาติด heading (parser ใหม่ทน blank line ได้แล้ว)
- Guestbook ยังไม่เปิดใช้จริง (D9 · issue #9) · ห้ามลิงก์เข้า nav/footer
