# ตรวจสัญญา FE ↔ BE — ฟอร์ม Contact/Guestbook vs API stub

> ผู้ตรวจ: OpenCode (backend) · วันที่: 2026-09-25 · **ไม่แก้ไฟล์ใดใน `src/`** — รายงานอย่างเดียว
> ขอบเขต: `docs/DECISIONS.md` (D5, D6, D9, D11) · `src/pages/contact.astro` · `src/pages/guestbook.astro` · `src/pages/api/contact.ts` · `src/pages/api/guestbook.ts` · `src/pages/api/interests.ts` · `src/lib/db.ts` (stub)

## 1. สรุปผลสั้น

| จุดต่อ | สถานะ |
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

### ❌ Mismatch

1. **`err.message` หลุดออก client:** ทั้ง `contact.ts` และ `guestbook.ts` ตอบ `JSON.stringify({ error: message })` โดย `message = err.message` ของจริง (เช่น parse error ของ `request.json()`, ข้อความจาก better-sqlite3, path ของไฟล์) — ตรงกับสิ่งที่กติกาห้ามคือ "error ที่ไม่ leak stack/รายละเอียดภายใน"
2. **400 ใช้เป็นถังขยะ error ทุกชนิด:** stub แปลง "error ใด ๆ ที่ไม่ใช่ NOT_IMPLEMENTED" เป็น 400 ทั้งที่บางอันควรเป็น 500 (DB ล้ม, table ไม่มี) — ทำให้ฟอร์มโชว์ "กรุณาตรวจชื่อ อีเมล และข้อความ" ทั้งที่ผู้ใช้กรอกถูกแล้ว = สัญญาณหลอก
3. **ยังไม่มี validation ฝั่ง server (D11):** ฟอร์มกำหนด `maxlength` name=80 / email=120 / message=2000 และ `type="email"` แต่เป็น client-side ล้วน — stub `insertContact` รับอะไรก็ได้ (type เป็นแค่ annotation) — D11 กำหนดให้ backend "validate ความยาว" ซึ่งยังไม่มี

### 💡 ข้อเสนอแนะ (Lab 05)

- `insertContact` ต้อง: ตรวจว่า `body` เป็น object มีแค่ 3 คีย์ string, ตัดช่องว่าง (`trim`), บังคับความยาว name ≤ 80 / email ≤ 120 / message ≤ 2000 (ให้ตรง `maxlength` ของฟอร์ม), ตรวจรูปแบบอีเมลแบบหลวม ๆ — ไม่ผ่านโยน error ชนิด "VALIDATION" แยกจาก error ระบบ
- ใน `api/contact.ts` แยกสถานะ: validation fail → `400 { error: "invalid" }` (ข้อความคงที่ ไม่ใช่ `err.message`) · DB/server fail → `500 { error: "server error" }` · NOT_IMPLEMENTED → `501` (คงไว้เพราะเทส labs อ้างอิง)
- ฟอร์มฝั่ง FE เขียนรอรับ 400 และ 500 แยกกันแล้ว — BE แค่อย่าส่ง 500 มาเป็น 400 ก็ต่อกันได้ทันที **ไม่ต้องแก้ FE**

---

## 3. Guestbook (`guestbook.astro` → `GET/POST /api/guestbook`)

### ✅ Match

- **GET:** ฟอร์มอ่าน `data.entries` เป็น array, แต่ละแถวใช้ `name` / `message` / `created_at` — ตรงกับ `GuestbookEntry` และ shape `{ entries: rows }` ของ stub
- **POST:** ฟอร์มยิง `{ name, message }` — ตรง type ของ `insertGuestbook`
- **201 / res.ok:** ฟอร์ม reset ช่อง + โหลดรายการใหม่เมื่อสำเร็จ — เข้ากับ stub ที่ตอบ 201
- **Error path:** ทุกกรณี `!res.ok` หรือ throw → ฟอร์มโชว์ข้อความคงที่ "สมุดเยี่ยมยังไม่เปิดใช้งาน — ข้อความของคุณยังอยู่ในช่อง" และไม่ล้างช่อง (จิตวิญญาณเดียวกับ D6)
- **Escape output:** client escape `name` / `message` / `created_at` ด้วย `esc()` ก่อน `innerHTML` — ปิดข้อแรกของ D9 (escape output) ฝั่งแสดงผล
- **D9 เรื่องลิงก์:** ไม่มี Guestbook ใน nav/footer (BaseLayout ยืนยันแล้ว) — หน้ายัง reachable ตามที่งาน backend ต้องใช้

### ❌ Mismatch (ขัด D9 — เงื่อนไขก่อนเปิดจริง)

| เงื่อนไข D9 | สถานะ stub ปัจจุบัน |
|---|---|
| escape output | ✅ ทำที่ client แล้ว (BE ก็ควร sanitize ตอน render ซ้ำถ้ามีหน้าอื่น render) |
| rate limit | ❌ ไม่มีใน stub — POST ยิงได้ไม่อั้น |
| honeypot | ❌ ฟอร์มไม่มีช่อง honeypot และ stub ไม่รองรับ |
| เพดานความยาว | ⚠️ client มี maxlength (80/500) แต่ server ยังไม่ validate |
| moderation/อนุมัติก่อนแสดง | ❌ `GET` ออกแบบให้ list **ทุกแถว** ทันทีที่ insert — ไม่มีคอลัมน์/เงื่อนไข "approved" |
| เพดานจำนวนแถว | ❌ ไม่มี — ตารางโตได้ไม่จำกัด |

### 💡 ข้อเสนอแนะ (Lab 05 — ให้ตรง D9 ก่อนเปิดใช้จริง)

- เพิ่มคอลัมน์ `approved INTEGER NOT NULL DEFAULT 0` ในตาราง `guestbook` และให้ `listGuestbook()` คืนเฉพาะ `approved = 1` — สัญญา `GET` รูปทรงไม่เปลี่ยน FE ไม่ต้องแก้
- `insertGuestbook` validate: name ≤ 80, message ≤ 500 (ตาม maxlength ฟอร์ม), trim, ปัด honeypot field ทิ้งถ้ามา (FE ยังไม่มีช่องนี้ — ให้ BE รองรับไว้ก่อนไม่ทำให้ contract แตก)
- Rate limit อย่างง่าย (เช่นจำกัดต่อ IP/ช่วงเวลาใน SQLite เอง) + ลบแถวเก่าเกินเพดาน — เก็บเป็นหมายเหตุใน `docs/` ตาม D11 (กำหนดระยะเก็บ/วิธีลบ)
- แก้ error handler ให้ไม่ส่ง `err.message` ออกนอก (เหมือนข้อเสนอ Contact) — `GET` ตอบ `500 { error: "server error" }` แทน message จริง

---

## 4. `GET /api/interests` — ⚠️ Orphan endpoint

- ไม่มีหน้า `.astro` ไหนเรียก `/api/interests` (grep ทั้ง `src/` เจอแค่ตัว endpoint เอง) — หน้า Interests อ่านผ่าน `loadProfile()` ตอน SSR อยู่แล้ว
- **ไม่ใช่ mismatch** เพราะไม่มีใครพึ่งมัน แต่เป็น endpoint ที่ expose ข้อมูล profile โดยไม่มีผู้ใช้
- **ข้อเสนอ:** ปล่อยไว้ได้ (ไม่มีความเสี่ยง เพราะข้อมูลเดียวกับที่หน้าเว็บโชว์อยู่แล้ว) หรือลบใน Lab 05 ถ้ายืนยันว่าไม่ใช้ — ตัดสินใจเป็น D-note ได้ ไม่เร่งด่วน

---

## 5. ข้อสังเกตความสอดคล้องกับ DECISIONS (สรุป)

- **D5 / D6 / D11 (ฝั่ง FE ของ Contact):** ตรวจแล้วตรง — ฟอร์มเก็บข้อความไว้เมื่อ error, มีทางไปอีเมล, ไม่ render ที่อยู่อีเมลเป็นข้อความ, ไม่โชว์ stack trace (ใช้ข้อความคงที่เท่านั้น)
- **D9:** หน้า Guestbook ยัง reachable และ client escape แล้ว แต่ **stub API ยังไม่ผ่านเงื่อนไข D9 อีก 4 ข้อ** (rate limit, honeypot, moderation, เพดานแถว) — สอดคล้องกับที่ D9 เลื่อนไป Later อยู่แล้ว Lab 05 ควรทำตามรายการใน §3 ก่อนพิจารณา "เปิดจริง"
- **D11:** ข้อ "แจ้งเตือนเจ้าของเมื่อมีข้อความใหม่" และ "DATA_DIR บน volume ถาวร" เป็นงาน deploy/Lab ที่เกิน stub ปัจจุบัน — จดไว้เป็นช่องว่างของ Lab 05

## ขอบเขตที่รายงานนี้ไม่ได้แตะ

- ไม่แก้ `src/lib/db.ts` / `src/pages/api/*` / หน้า `.astro` ทุกไฟล์ (ตามคำขอ)
- ไม่แตะ UI/copy/สี — เห็นว่า FE ทำครบตาม D5/D6/D11 ฝั่งตัวเองแล้ว