# ตรวจสัญญา FE ↔ BE — ฟอร์ม Contact/Guestbook vs API stub

> ผู้ตรวจ: OpenCode (backend) · วันที่: 2026-09-25 · ตรวจก่อน implement Lab 05
> ขอบเขต: `docs/DECISIONS.md` (D5, D6, D9, D11) · `src/pages/contact.astro` · `src/pages/guestbook.astro` · `src/pages/api/contact.ts` · `src/pages/api/guestbook.ts` · `src/pages/api/interests.ts` · `src/lib/db.ts` (stub ก่อน implement)
> สถานะปัจจุบัน: ข้อ Mismatch ใน §2 แก้แล้วใน Lab 05 (ดู STATUS.md) · ข้อใน §3 ยังเปิดเป็น issue #9

## 1. สรุปผลสั้น

| จุดต่อ | สถานะ (ตอนตรวจ) |
|---|---|
| Contact: ฟอร์ม → `POST /api/contact` | ✅ Match (payload + status code) — เหลือ BE ต้อง validate จริงใน Lab 05 |
| Contact: พฤติกรรมเมื่อ 501/error ตาม D6 | ✅ Match |
| Guestbook: `GET /api/guestbook` + `POST /api/guestbook` | ✅ Match รูปทรงข้อมูล — ⚠️ ขัด D9 เรื่อง moderation/เพดานแถว |
| Error response ของทั้งสอง endpoint | ❌ Mismatch กับหลักความปลอดภัย — ส่ง `err.message` ออกนอก server |
| `GET /api/interests` | ⚠️ Orphan — ไม่มีหน้าไหนเรียกใช้ |

---

## 2. Contact (`contact.astro` → `POST /api/contact`)

### ✅ Match

- **Payload:** ฟอร์มยิง JSON `{ name, email, message }` (จาก `FormData` → `Object.fromEntries` — ค่าเป็น string ทั้งหมด) ตรงกับ type ของ `insertContact({ name, email, message })` ใน `db.ts`
- **Success path:** ฟอร์มถือว่าสำเร็จเมื่อ `res.ok` (2xx) — stub ตอบ `201` + JSON row → เข้ากัน; ฟอร์ม `form.reset()` เฉพาะกรณีสำเร็จ ตรง D6
- **D6 เครื่องหมาย 501:** stub โยน `NOT_IMPLEMENTED` → handler แปลงเป็น `501` → ฟอร์ม (สาขา `else` และ `catch`) แสดง `NOT_READY` + ลิงก์ "ส่งอีเมล" และ**ไม่ล้างช่อง** — ตรงข้อความที่ D6 กำหนดคำต่อคำ
- **D6 เครื่องหมาย 400:** ฟอร์มมีสาขาเฉพาะ `res.status === 400` แสดง "กรุณาตรวจ…" โดยยังเก็บข้อความไว้ — สอดคล้องกับที่ stub แปลง error ที่ไม่ใช่ NOT_IMPLEMENTED เป็น 400 (แต่ดู Mismatch ข้อ 2.2 ด้านล่าง)
- **D11 "ไม่มี `GET /api/contact`":** stub มีเฉพาะ `POST` ✅
- **Microcopy privacy (D11):** `<p class="muted-small">ใช้ข้อมูลนี้เพื่อตอบกลับคุณเท่านั้น</p>` มีใต้ฟอร์มแล้ว
- **D5:** อีเมลเป็นลิงก์ `mailto` ตัวลิงก์เขียนว่า "ส่งอีเมล" ทั้งใน markup และใน JS (`a.textContent = 'ส่งอีเมล'`) — ไม่พิมพ์ที่อยู่เป็นข้อความ

### ❌ Mismatch (แก้แล้วใน Lab 05)

1. **`err.message` หลุดออก client:** เดิม `api/contact.ts` และ `api/guestbook.ts` ตอบ `{ error: err.message }` ของจริง (เช่น parse error ของ `request.json()`, ข้อความจาก better-sqlite3, path ของไฟล์) → แก้เป็นข้อความคงที่ `{ error: "invalid" }` / `{ error: "server error" }` + log ฝั่ง server เท่านั้น
2. **400 ใช้เป็นถังขยะ error ทุกชนิด:** เดิม error ใด ๆ ที่ไม่ใช่ NOT_IMPLEMENTED ถูกตอบ 400 ทั้งที่บางอันควรเป็น 500 (DB ล้ม, table ไม่มี) → แก้: validation fail = 400 · server fail = 500 · NOT_IMPLEMENTED = 501 (คงไว้เพราะเทส labs อ้างอิง)
3. **ยังไม่มี validation ฝั่ง server (D11):** ฟอร์มกำหนด `maxlength` name=80 / email=120 / message=2000 และ `type="email"` แต่เป็น client-side ล้วน → implement แล้วใน `insertContact` (trim, บังคับความยาวตาม maxlength, ตรวจรูปแบบอีเมลแบบหลวม ๆ)

### 💡 ข้อเสนอแนะ (สรุป — ทำแล้วใน Lab 05)

- `insertContact`: ตรวจ body เป็น string ทั้ง 3 ช่อง, `trim`, name ≤ 80 / email ≤ 120 / message ≤ 2000 (ตรง maxlength ฟอร์ม), email format — ไม่ผ่านโยน `VALIDATION: ...` แยกจาก error ระบบ
- `api/contact.ts` แยกสถานะ: validation fail → `400 { error: "invalid" }` · DB/server fail → `500 { error: "server error" }` · NOT_IMPLEMENTED → `501`
- FE ไม่ต้องแก้ — ฟอร์มเขียนรอ 400 กับ 500 แยกกันอยู่แล้ว

---

## 3. Guestbook (`guestbook.astro` → `GET/POST /api/guestbook`)

### ✅ Match

- **GET:** ฟอร์มอ่าน `data.entries` เป็น array, แต่ละแถวใช้ `name` / `message` / `created_at` — ตรงกับ `GuestbookEntry` และ shape `{ entries: rows }` ของ stub
- **POST:** ฟอร์มยิง `{ name, message }` — ตรง type ของ `insertGuestbook`
- **201 / res.ok:** ฟอร์ม reset ช่อง + โหลดรายการใหม่เมื่อสำเร็จ — เข้ากับ stub ที่ตอบ 201
- **Error path:** ทุกกรณี `!res.ok` หรือ throw → ฟอร์มโชว์ข้อความคงที่ "สมุดเยี่ยมยังไม่เปิดใช้งาน — ข้อความของคุณยังอยู่ในช่อง" และไม่ล้างช่อง (จิตวิญญาณเดียวกับ D6)
- **Escape output:** client escape `name` / `message` / `created_at` ด้วย `esc()` ก่อน `innerHTML` — ปิดข้อแรกของ D9 (escape output) ฝั่งแสดงผล
- **D9 เรื่องลิงก์:** ไม่มี Guestbook ใน nav/footer (BaseLayout ยืนยันแล้ว) — หน้ายัง reachable ตามที่งาน backend ต้องใช้

### ❌ Mismatch (ขัด D9 — เงื่อนไขก่อนเปิดจริง) → เปิดเป็น issue #9

| เงื่อนไข D9 | สถานะ stub ปัจจุบัน |
|---|---|
| escape output | ✅ ทำที่ client แล้ว (BE ก็ควร sanitize ตอน render ซ้ำถ้ามีหน้าอื่น render) |
| rate limit | ❌ ไม่มี — POST ยิงได้ไม่อั้น |
| honeypot | ❌ ฟอร์มไม่มีช่อง honeypot และ stub ไม่รองรับ |
| เพดานความยาว | ⚠️ client มี maxlength (80/500) — server validate แล้วใน Lab 05 (`insertGuestbook`) |
| moderation/อนุมัติก่อนแสดง | ❌ `GET` list ทุกแถวทันทีที่ insert — ไม่มีคอลัมน์ "approved" |
| เพดานจำนวนแถว | ✅ บางส่วน — `listGuestbook()` LIMIT 100 แล้ว (Lab 05) · การลบแถวเก่ายังไม่มี |

### 💡 ข้อเสนอแนะ (Later — ตาม issue #9)

- เพิ่มคอลัมน์ `approved INTEGER NOT NULL DEFAULT 0` ในตาราง `guestbook` และให้ `listGuestbook()` คืนเฉพาะ `approved = 1` — สัญญา `GET` รูปทรงไม่เปลี่ยน FE ไม่ต้องแก้
- รองรับ honeypot field ไว้ก่อน (ปัดทิ้งถ้ามา) แม้ FE ยังไม่มีช่อง
- Rate limit อย่างง่าย (ต่อ IP/ช่วงเวลา) + กำหนดระยะเก็บ/วิธีลบ (D11)
- **ห้ามลิงก์ Guestbook เข้า nav/footer จนครบทุกข้อของ D9**

---

## 4. `GET /api/interests` — ⚠️ Orphan endpoint

- ไม่มีหน้า `.astro` ไหนเรียก `/api/interests` (grep ทั้ง `src/` เจอแค่ตัว endpoint เอง) — หน้า Interests อ่านผ่าน `loadProfile()` ตอน SSR อยู่แล้ว
- **ไม่ใช่ mismatch** เพราะไม่มีใครพึ่งมัน แต่เป็น endpoint ที่ expose ข้อมูล profile โดยไม่มีผู้ใช้
- **ข้อเสนอ:** ปล่อยไว้ได้ (ข้อมูลเดียวกับที่หน้าเว็บโชว์อยู่แล้ว) หรือลบถ้ายืนยันว่าไม่ใช้ — ไม่เร่งด่วน

---

## 5. ข้อสังเกตความสอดคล้องกับ DECISIONS (สรุป)

- **D5 / D6 / D11 (ฝั่ง FE ของ Contact):** ตรวจแล้วตรง — ฟอร์มเก็บข้อความไว้เมื่อ error, มีทางไปอีเมล, ไม่ render ที่อยู่อีเมลเป็นข้อความ, ไม่โชว์ stack trace (ใช้ข้อความคงที่เท่านั้น)
- **D9:** หน้า Guestbook ยัง reachable และ client escape แล้ว แต่ API ยังไม่ผ่านเงื่อนไข D9 ครบ — ติดตามที่ issue #9
- **D11:** ข้อ "แจ้งเตือนเจ้าของเมื่อมีข้อความใหม่" และ "DATA_DIR บน volume ถาวร" เป็นงาน deploy (L5 → Lab 08)

## ขอบเขตที่รายงานนี้ไม่ได้แตะ

- ไม่แก้หน้า `.astro` ทุกไฟล์ (UI/copy/สี เป็นของ frontend)
- ส่วน `src/lib/db.ts` / `src/pages/api/*` implement แล้วใน Lab 05 ตามข้อเสนอในรายงานนี้