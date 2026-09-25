# Review — OpenCode · PR #7 [Lab 04] Frontend

> ผู้รีวิว: OpenCode (backend) · วันที่: 2026-09-25 · รีวิวแบบอิสระ (อ่านอย่างเดียว — ไม่แก้ `src/` ในรอบนี้)
> เป้าหมาย: [PR #7](https://github.com/supunkangolf/ai-multi-web/pull/7) `lab-04-frontend` → `main` (head `3d06ed7`)
> Input จริงที่ใช้: diff ของ PR #7 จาก GitHub (ไฟล์ 14 ชิ้น) · `docs/DECISIONS.md` · `docs/STATUS.md` · `docs/OPEN_LOOPS.md` · `docs/QA.md` · `docs/PROFILE.md`
> หมายเหตุ: `docs/_pr-diff.txt` ยังไม่มีใน repo — รีวิวจาก `get_files` ของ PR โดยตรง · ไม่สมมุติจากแชท Claude

## สรุป

PR #7 ทำงาน Lab 04 ครบตาม "เกณฑ์พร้อม Frontend" ใน DECISIONS และ**ปิด open loop L2** ด้วย parser ใหม่ที่มี unit test ครอบ ทุกข้อ D1–D11 ที่เกี่ยวกับ UI ถูก implement จริงเมื่ออ่านจาก diff (ไม่ใช่แค่อ้างใน description) รวมถึงแก้ findings จาก `docs/QA.md` ที่รันบน `main` (template) ไปด้วยโดยตั้งใจหรือไม่ก็ตาม: QA-1 (XSS ใน guestbook), QA-2 (Guestbook ใน nav/Home), QA-5 (ข้อความ developer สู่สาธารณะ), QA-6 (`<title>`), A11Y-2 (focus-visible), A11Y-3 บางส่วน (meta description อ้างคอร์ส)

**ความเสี่ยงหลักที่พบไม่ได้อยู่ในโค้ด แต่อยู่ที่การ merge:** PR #7 ชนกับ PR #10 (Lab 05 backend) ที่ 3 ไฟล์ รวมถึงไฟล์ใหม่ชื่อเดียวกันคนละเนื้อหา — ต้องกำหนดลำดับ merge ก่อนกดปุ่ม

## จุดแข็ง

1. **L2 ปิดสมบูรณ์:** `parseProfile()` อ่านทุกย่อหน้า/bullet · ทน blank line หลัง heading (เคสที่ `loadProfile()` เดิมพัง) · ทน CRLF · `—` placeholder ถูกตัดก่อน render (D5/D8) — เทสครอบทุกเคสใน `tests/profile.test.ts`
2. **Security ฝั่ง FE ทำถูกตำแหน่ง:** `esc()` escape `name`/`message`/`created_at` ก่อน `innerHTML` (แก้ stored XSS ของ template — QA-1) · FE ไม่เคยแสดง `error` จาก API body ให้ผู้ใช้ (ใช้ข้อความคงที่) · ไม่มี secret/คำว่าคอร์สใน markup (CI `lab-04-frontend` success ยืนยัน `npm test` ผ่าน)
3. **ตรง DECISIONS เกือบครบเมื่อเช็คจาก diff:** D1/D2/D4 (hero + 2 CTA · เมนูไทย 4 รายการ) · D3 (ไม่มี audience บน Home) · D5 (mailto text "ส่งอีเมล" · `—` ไม่ render) · D6 (400 → เก็บข้อความ · else → NOT_READY + ลิงก์ส่งอีเมล) · D7 (การ์ดครบ 4 bullet · แสดงชื่ออย่างเดียวตามกำหนดระหว่างรอเจ้าของ) · D9 (ไม่มี Guestbook ใน nav/footer/การ์ด Home แม้โจทย์ Lab 04 ขอ — ทำถูกตามลำดับชั้น Proposed < Approved) · D10 (Skills render เมื่อมี section เท่านั้น) · D11 (microcopy)
4. **สัญญา FE↔BE ตรงกับ PR #10:** payload `{name,email,message}` · รอ 2xx/400/else แยกสาขา · ไม่สน body error — ต่อกันได้ทันทีเมื่อ backend merge

## ความเสี่ยง

| # | เรื่อง | ระดับ |
|---|---|---|
| R-1 | **Merge conflict กับ PR #10:** ทั้งสอง PR แก้ `STATUS.md` · `OPEN_LOOPS.md` และ **add ไฟล์เดียวกัน** `docs/fe-be-contract-check.md` (PR #7 = เวอร์ชันแรก 92 บรรทัด · PR #10 = เวอร์ชันอัปเดตสถานะ 93 บรรทัด) — merge PR ที่สองไม่ได้โดยไม่ rebase | สูง |
| R-2 | **test:labs ยังแดงบน PR #7 โดด ๆ** (stub ยังไม่ implement) — ถ้า merge #7 ก่อน #10, `main` จะอยู่สถานะ RED ชั่วคราว (คาดหมายไว้ตาม course แต่ต้องรู้ลำดับ) | กลาง |
| R-3 | **`/guestbook` reachable + `load()` ดึง `GET` ทันที:** เมื่อ PR #10 merge (list ทุกแถว ยังไม่มี moderation) ข้อความใด ๆ ที่ POST เข้ามาจะ render สาธารณะทันทีผ่าน URL ตรง แม้ไม่มีลิงก์ — เงื่อนไข D9 (moderation) ยังไม่ผ่าน | กลาง (ผูกกับ issue #9) |
| R-4 | **FALLBACK ออกสาธารณะเมื่อ section ว่าง:** `interests`/`contact` ถ้า section ว่างจะได้ค่า FALLBACK ของ template (`['AI agents','Web','Teaching']`) — ขัดจิตวิญญาณ D8 "FALLBACK ห้ามออกสู่สาธารณะเมื่อ PROFILE มีเนื้อหา" | ต่ำ (edge case — PROFILE ปัจจุบันไม่ trigger) |

## Must fix / Should / Nit

### Must fix (ก่อน merge)

- **M1 (R-1):** ตกลงลำดับ merge — แนะนำ **merge PR #10 ก่อน** (ทำให้ `test:labs` เขียว แล้ว CI ของ #7 หลัง rebase จะเขียวเต็ม) จากนั้น update branch `lab-04-frontend` ด้วย `update_pull_request_branch` แล้ว resolve conflict ที่ `docs/fe-be-contract-check.md` (เลือกเวอร์ชันหลัง Lab 05 ที่มีสถานะ) · `STATUS.md` · `OPEN_LOOPS.md` (reconcile เป็นเวอร์ชันล่าสุดต่อรอบ writer)

### Should

- **S1:** `guestbook.astro` สาขา POST error รวม 400 เข้ากับข้อความ "สมุดเยี่ยมยังไม่เปิดใช้งาน — ข้อความของคุณยังอยู่ในช่อง" — ตอน backend (PR #10) ตอบ 400 สำหรับ validation (ว่าง/เกิน 80/500) ผู้ใช้จะโดนบอกว่า "ระบบยังไม่เปิด" ทั้งที่ระบบเปิดแล้ว ควรแยก `res.status === 400` → "กรุณาตรวจชื่อและข้อความ (ชื่อไม่เกิน 80 · ข้อความไม่เกิน 500 ตัวอักษร)" เหมือนที่ contact.astro ทำอยู่แล้ว
- **S2:** href ของ `github`/`linkedin`/`mailto` มาจาก PROFILE โดยไม่ตรวจ scheme — ถ้า PROFILE มีค่าเช่น `javascript:...` จะ render ออก (owner-authored จึงเสี่ยงต่ำ แต่เว็บนี้ต้อง public) — เพิ่ม guard เฉพาะ `https?://` / `mailto:` ใน `parseContact()` ได้ไม่กี่บรรทัด
- **S3:** เทส `loadProfile()` อ่าน PROFILE จริงและ assert `bioParagraphs.length > 1` — ถ้าเจ้าของตัด Bio เหลือย่อหน้าเดียว (ไม่ผิดกติกา PROFILE) เทสจะแดงทั้ง CI — ควรล็อกเป็น "ไม่ fallback + มีอย่างน้อย 1 paragraph" หรือแยกเคส fallback ไว้ใน unit เท่านั้น
- **S4:** (R-4) เปลี่ยน fallback ของ `interests` เป็น `[]` และให้หน้า Interests ไม่ render หัวข้อว่าง — สอดคล้อง D7/D8/D10 เงื่อนไข "ไม่มีหัวข้อว่างเปล่า" เดียวกับที่ Skills ทำถูกแล้ว

### Nit

- **N1:** `labs/lab-02-debate/prompts/05-agent-teams-fallback.md` — แก้นอก scope ของ Lab 04 + ประโยคค้างเสร็จครึ่ง ("…เพื่อใช้ใน Session ถัด") + typo "Persistant" — ควรเป็น commit แยกหรือตัดออก
- **N2:** section "Lab 03 — MCP vs gh" เพิ่มใน `DECISIONS.md` — ไฟล์นี้กติกาบอกว่า "Approved เท่านั้น" · เนื้อหาเป็น process note ไม่ใช่ decision — ยอมรับได้เพราะเป็นหัวข้อบันทึกแยก แต่ควรระวังไม่ให้ไฟล์นี้กลายเป็นที่ทิ้งโน้ต
- **N3:** `paragraphs()` ไม่ filter `isPlaceholder` — Bio ที่มีย่อหน้าเป็น `—` จะ render (ไม่เกิดจริงใน PROFILE ปัจจุบัน)
- **N4:** เมื่อ merge #10 แล้ว ควรอัปเดต `docs/QA.md` findings QA-1/QA-2/QA-5/QA-6 + A11Y-3/A11Y-4 ว่า "แก้แล้วโดย PR #7" — ตอนนี้ QA วัดบน `main` (template) ซึ่งเก่ากว่า PR #7

## คำถามต่อ Claude

1. **Guestbook 400:** ยอมรับ S1 ไหม — ถ้าใช่ จะแก้ใน PR #7 เองหรือเปิด open loop ให้ Lab 04 รอบหน้า (ผมไม่แตะ UI ตาม ownership)?
2. **ลำดับ merge:** ตกลง merge PR #10 (backend) ก่อนแล้ว rebase #7 ไหม — หรือมีเหตุผลให้ frontend ไปก่อน (เช่น อยากได้หน้าเว็บจริงก่อน demo 501)?
3. **FALLBACK `interests` (S4):** เป็นการตั้งใจเพื่อกันหน้าว่าง หรือค้างจาก template? D8 อ่านครอบไหม?
4. **`_pr-diff.txt`:** prompt Lab 07 อ้างไฟล์นี้แต่ไม่มีใน repo — ใครควรเป็นคน generate (frontend ตอนสร้าง PR?) จะได้ไม่เป็น loop ที่รีวิวเซสชันถัดไปเจอปัญหาซ้ำ
5. **L8 (Playwright Chromium):** `test:e2e` ยังไม่รันได้บนเครื่อง — ให้ผมถือว่า a11y action items ต้องรอเทสจริง หรือผ่าน MCP ตรวจแทนได้ตามที่ QA.md ทำมาแล้ว?

## ขอบเขตที่รีวิวนี้ไม่ปิด

- โค้ด backend ของ PR #10 รีวิวไม่ได้เพราะเป็นงานของผมเอง (self-review) — แนะนำให้ฝั่ง Claude หรือรอบ cross-review ถัดไปเป็นผู้รีวิวตาม prompt เดียวกัน
- SQL injection อยู่ใน scope ของ PR #10 (`db.ts`) — ยืนยันเชิงข้อเท็จจริงเท่านั้นว่า PR #7 ไม่มี query ใด ๆ ฝั่ง FE

## Canonical state updated

- [ ] docs/STATUS.md (รอบนี้ read-only ตามโจทย์ — reviewer เขียนรายงานอย่างเดียว ไม่แตะ hot state)
- [ ] docs/OPEN_LOOPS.md (เหตุผลเดียวกัน)
- [ ] docs/DECISIONS.md (ไม่มี decision ใหม่จากผลรีวิว — ข้อเสนอ S1–S4 ยังเป็น Proposed จนกว่าเจ้าของจะอนุมัติ)