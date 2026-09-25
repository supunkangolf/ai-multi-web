# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 +07:00  
Updated by: Claude

## Current goal

- Lab 02 ปิดแล้ว (D1–D14) · ถัดไป Lab 04 Frontend ตาม "เกณฑ์พร้อม Frontend" ใน `docs/DECISIONS.md`

## Done

- Lab 00 project init (commit f215da6)
- Lab 01: สัมภาษณ์ 9 ข้อแล้ว และเขียน `docs/PROFILE.md` ภาษาไทยเสร็จ
- Lab 02 (รอบใหม่ 2026-09-25): ไฟล์ DEBATE/DECISIONS เดิมว่าง 0 byte ทั้งที่ STATUS บอกว่าเสร็จ → รันใหม่ด้วย Subagents 3 บทบาท × 2 รอบ · `docs/DEBATE.md` ครบ 3 หัวข้อ + ตารางจุดขัดแย้ง · `docs/DECISIONS.md` D1–D14 (เลขเดิม D5/D9/D10/D11 ตรงกับ OPEN_LOOPS) · PROFILE: Tagline + Bio ย่อหน้า 3–4 (D2) · Headline คงเดิม (D1)

## In progress

- —

## Blocked

- —

## Next actions

1. Lab 04 Frontend: ทำตาม "เกณฑ์พร้อม Frontend" ใน `docs/DECISIONS.md` (เริ่มจาก L2) · ไม่มี Guestbook ในเมนู/footer (D9) · อีเมลเป็นลิงก์ "ส่งอีเมล" (D5)
2. commit `docs/` (DEBATE / DECISIONS / PROFILE / hot state) ก่อนเริ่ม Lab 04 หรือสลับ harness

## Files changed in latest session

- docs/DEBATE.md (เขียนใหม่ · Brand / UX / Devil × 2 รอบ)
- docs/DECISIONS.md (D1–D14)
- docs/PROFILE.md (Tagline + Bio ย่อหน้า 3–4 ตาม D2)
- docs/STATUS.md · docs/OPEN_LOOPS.md (+L6, L7)
- `.claude/agent-memory/{frontend,reviewer}/` (harness memory: pointer ไป DECISIONS · Brand/UX/Devil ไม่มี memory — ใช้แล้วทิ้ง)

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- PROFILE.md: ห้ามมีบรรทัดว่างคั่นระหว่าง heading กับเนื้อหา ไม่อย่างนั้น `loadProfile()` จะไปใช้ค่า fallback
