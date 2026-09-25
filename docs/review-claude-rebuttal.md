# Rebuttal — Claude Code · ตอบ `docs/review-opencode.md` (PR #7)

> ผู้ตอบ: Claude Code (frontend owner) · 2026-09-25
> Input: `docs/review-opencode.md` · `docs/DECISIONS.md` · `docs/STATUS.md` · `docs/OPEN_LOOPS.md` · PR #7 / #10 บน GitHub (ไม่มี comment/review thread บน GitHub ทั้งสอง PR — ใช้ไฟล์ review เป็นแหล่งเดียว)
> ไม่มี `docs/handoffs/07-opencode-to-claude.md` · ไม่ได้เรียก OpenCode · ไม่ได้ใช้ MCP เป็นท่อไป CLI อื่น
> ผลตรวจหลังแก้: `npm test` **14/14** · `npm run test:labs` **2/2 เขียว** · `npm run build` ผ่าน · ตรวจ UI ซ้ำด้วย Playwright MCP

## Must fix

| ID | คำตอบ | สิ่งที่ทำ |
|---|---|---|
| M1 — ลำดับ merge / conflict กับ PR #10 | **ยอมรับ (แก้แล้ว)** | ตกลงตามข้อเสนอ: #10 ก่อน แล้ว #7 · merge `lab-05-backend` เข้า `lab-04-frontend` แล้ว resolve conflict: `docs/fe-be-contract-check.md` = เวอร์ชันหลัง Lab 05 (ของ #10) · `OPEN_LOOPS.md` = L5 เวอร์ชัน backend + เก็บ L8 + คง L2 ในส่วนปิดแล้ว · `STATUS.md` เขียนใหม่ให้รวมทั้งสองฝั่ง · ตอนนี้ #7 ไม่มี conflict และ `test:labs` เขียวบน branch นี้แล้ว (R-2 หายไปด้วย) |

เพิ่มเติมที่พบเองระหว่างทำ M1: PR #10 มีไฟล์ `.playwright-mcp/*.yml` (snapshot ของ MCP) ติดมา → ลบออกจาก index + เพิ่ม `.playwright-mcp/` และ `docs/_pr-diff-*.txt` ใน `.gitignore` (commit `cf2753a` บน `lab-05-backend`)

## Should

| ID | คำตอบ | สิ่งที่ทำ |
|---|---|---|
| S1 — Guestbook 400 ถูกบอกว่า "ยังไม่เปิด" | **ยอมรับ (แก้แล้ว)** | `guestbook.astro`: `res.status === 400` → "กรุณาตรวจชื่อและข้อความ (ชื่อไม่เกิน 80 · ข้อความไม่เกิน 500 ตัวอักษร)" · ข้อความยังอยู่ในช่อง · ทดสอบจริงด้วยชื่อเป็นช่องว่าง → API 400 → ข้อความใหม่ขึ้นใน `role="status"` |
| S2 — href จาก PROFILE ไม่ตรวจ scheme | **ยอมรับ (แก้แล้ว)** | `parseContact()` รับเฉพาะ email ธรรมดา (ไม่มี `:`/`/`) และ `https?://` สำหรับ github/linkedin · เทสใหม่ `javascript:` ถูกตัดทิ้ง |
| S3 — เทส `loadProfile` ผูกกับจำนวนย่อหน้า | **ยอมรับ (แก้แล้ว)** | assert "ไม่ใช่ fallback + มี ≥1 ย่อหน้า" แทน `> 1` · เจ้าของตัด Bio เหลือย่อหน้าเดียวได้โดย CI ไม่แดง |
| S4 — FALLBACK interests ออกสาธารณะ | **ยอมรับ (แก้แล้ว)** · ตอบคำถาม 3: ค้างจาก template ไม่ได้ตั้งใจ | FALLBACK `interests: []` · `interests.astro` ไม่ render section เมื่อว่าง (แบบเดียวกับ Skills · D10) · เทสใหม่ครอบ |

## Nit

| ID | คำตอบ | สิ่งที่ทำ |
|---|---|---|
| N1 — แก้ไฟล์ prompt Lab 02 นอก scope | **ยอมรับ (แก้แล้ว)** | คืน `labs/lab-02-debate/prompts/05-agent-teams-fallback.md` เป็นเวอร์ชัน `main` · ถ้าเจ้าของอยากเก็บโน้ตนั้นให้ทำ commit แยกทีหลัง |
| N2 — process note ใน `DECISIONS.md` | **ปฏิเสธการย้าย (คงไว้)** | หัวข้อ "Lab 03 — MCP vs gh" แยกจากตาราง D-id ชัดเจน และ OpenCode เองระบุว่ายอมรับได้ · รับไว้เป็นกติกา: โน้ตใหม่ที่ไม่ใช่ decision ให้ลง `STATUS.md`/`docs/` อื่น |
| N3 — `paragraphs()` ไม่ filter placeholder | **ยอมรับ (แก้แล้ว)** | ย่อหน้า `—` ถูกตัด · เทสใหม่ครอบ |
| N4 — QA.md วัดบน template | **ยอมรับ (แก้แล้ว)** | `docs/QA.md` ## สถานะหลัง PR #7 — ไล่ QA-1..7 / A11Y-1..9 พร้อมหลักฐาน |

## นอกเหนือจาก review (พบตอนตรวจซ้ำ)

- **A11Y-1 ยังค้างในธีมใหม่ของ PR #7:** `--border #dcdff0` บนขาว = 1.32:1 → input/textarea ใช้ `#8589b3` (3.37:1 · WCAG 1.4.11)
- **A11Y-3 ป้องกันซ้ำ:** `tests/public-site.test.ts` เดิมตัด frontmatter ทิ้งทั้งก้อน จึงจับ default description ที่อ้างคอร์สไม่ได้ → เพิ่มเทส scan string literal ใน frontmatter (ยืนยันว่า RED เมื่อใส่ข้อความเดิมกลับ แล้วคืนค่า)
- **QA-6 / A11Y-4 ที่ Guestbook:** `<title>` ใส่ชื่อเจ้าของ + `autocomplete="name"`

## คำตอบคำถามของ OpenCode

1. **Guestbook 400** — ยอมรับ S1 และแก้ใน PR #7 เองแล้ว (UI = ownership ของ Claude)
2. **ลำดับ merge** — ตกลง #10 ก่อน แล้ว #7 · ไม่มีเหตุผลให้ frontend ไปก่อน
3. **FALLBACK interests** — ค้างจาก template · D8 อ่านครอบ (FALLBACK ห้ามออกสาธารณะ) → แก้แล้วตาม S4
4. **`_pr-diff.txt`** — ผู้เปิด PR (ฝั่งที่ขอรีวิว) เป็นคน generate ก่อนเรียก reviewer · ไฟล์เป็นของชั่วคราว อยู่ใน `.gitignore` แล้ว (`docs/_pr-diff.txt` เดิม + `docs/_pr-diff-*.txt` ใหม่)
5. **L8 / Playwright** — a11y ตรวจผ่าน Playwright MCP ได้ (ทำแล้วใน QA.md) · `npm run test:e2e` ยังเป็น L8 ของ human — ไม่บล็อก merge

## Follow-up (ยังไม่ปิด)

| เรื่อง | Owner | ที่บันทึก |
|---|---|---|
| R-3: `/guestbook` เข้าถึงได้ทาง URL ตรงและ list ทุกแถวหลัง #10 merge — เงื่อนไข D9 (moderation) ยังไม่ผ่าน | OpenCode + human | issue #9 · OPEN_LOOPS L9 |
| A11Y-8: API คืน field ที่ผิด → `aria-invalid` รายช่อง | OpenCode (backend) | OPEN_LOOPS L10 |
| A11Y-9: skip link | Claude (frontend) | OPEN_LOOPS L10 |
| QA-7: ใช้ SQLite ใหม่ตอน deploy (ข้อมูล demo local มีคำว่า Lab) | OpenCode / human | OPEN_LOOPS L5 |
| Nit ใน #10: คอมเมนต์หัว `db.ts` ยังเขียนว่า "Stubs return null until finishe." ทั้งที่ implement แล้ว | OpenCode (backend) | ไม่แก้เอง — ownership backend |

## สรุป round-trip (ร่างสำหรับวางบน PR)

- **มุมมองต่างกันจับของที่เจ้าของโค้ดมองข้าม:** OpenCode (เจ้าของ backend) เห็นทันทีว่า UI Guestbook ตีความ 400 ของ API ว่า "ระบบยังไม่เปิด" และ PR #7 กับ #10 ชนกันที่ 3 ไฟล์ ซึ่งฝั่ง frontend ที่ดูแค่งานตัวเองไม่เห็น
- **รีวิวเป็นไฟล์ที่ตรวจสอบได้ ไม่ใช่แชท:** ทุก Must/Should ถูกตอบว่า "ยอมรับ + แก้" หรือ "ปฏิเสธ + เหตุผล" ใน `docs/review-*.md` พร้อมเทสที่ RED→GREEN (4 เทสใหม่) — อีกฝั่งอ่านต่อได้โดยไม่ต้องรู้บทสนทนา
- **ต่อยอดเกินข้อที่ถูกชี้:** ระหว่างตอบรีวิว Claude ตรวจซ้ำแล้วเจอว่าเทส public-site จับ meta description ที่อ้างคอร์สไม่ได้ และขอบ input ในธีมใหม่ยังไม่ผ่าน contrast — cross-model ทำให้ต้องพิสูจน์ด้วยหลักฐาน แทนที่จะเชื่อว่า "CI เขียวแล้ว"

## Canonical state updated

- [x] docs/STATUS.md
- [x] docs/OPEN_LOOPS.md
- [ ] docs/DECISIONS.md (ถ้ามี decision ใหม่) — ไม่มี decision ใหม่: M1/S1–S4 เป็นการ implement ตาม D6/D8/D9/D10 เดิม · ลำดับ merge เป็น process ไม่ใช่ product decision
