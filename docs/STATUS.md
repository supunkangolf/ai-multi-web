# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ  
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-24 +07:00  
Updated by: Claude

## Current goal

- Lab 01 Interview: สร้าง `docs/PROFILE.md` จากการสัมภาษณ์ผู้เรียน

## Done

- Lab 00 project init (commit f215da6)
- Lab 01: สัมภาษณ์ 9 ข้อแล้ว และเขียน `docs/PROFILE.md` ภาษาไทยเสร็จ

## In progress

- —

## Blocked

- —

## Next actions

1. Lab 02 Debate (Brand / UX / Devil subagents) → `docs/DEBATE.md` / `docs/DECISIONS.md`
2. Lab 04: แก้ parser ใน `src/lib/profile.ts` ที่ตอนนี้อ่านได้แค่บรรทัดแรกของแต่ละ section (ดู OPEN_LOOPS L2)

## Files changed in latest session

- docs/PROFILE.md
- docs/STATUS.md
- docs/OPEN_LOOPS.md

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- PROFILE.md: ห้ามมีบรรทัดว่างคั่นระหว่าง heading กับเนื้อหา ไม่อย่างนั้น `loadProfile()` จะไปใช้ค่า fallback
