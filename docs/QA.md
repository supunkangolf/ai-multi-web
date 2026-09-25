# QA — Personal Site

> Lab 06

## E2E Playwright

- วันที่: 2026-09-25 · ผู้รัน: Claude Code
- Target: `http://localhost:4321` (`astro dev` · PORT=4321 จาก `.env`)
- เครื่องมือ: **Playwright MCP** (`mcp__playwright__*` · navigate / snapshot / fill_form / click / network_requests / take_screenshot) — รอบนี้รันผ่าน MCP จริง (รอบแรกของวันเดียวกันใช้ Playwright script จาก `node_modules` เพราะ MCP ยังถูก disable อยู่ · screenshot ชุดเดิมยังเก็บไว้)
- ไม่ได้แก้ `src/` ในรอบนี้

| # | Step | Result | หมายเหตุ |
|---|---|---|---|
| 1 | เปิด Home `/` | ✅ 200 | snapshot: `h1` = "Supunkan Keawmeesri" (Name) · ย่อหน้าถัดมา = "PHP Developer ที่เปลี่ยนโจทย์ธุรกิจให้เป็นเว็บที่ใช้งานได้จริง" (Headline) → ตรงกับ `docs/PROFILE.md` |
| 2 | คลิก nav → `/about` | ✅ 200 | ไม่มี 404 · `h1` = "About" |
| 3 | เปิด `/interests` | ✅ 200 | ไม่มี 404 · `h1` = "Interests" |
| 4 | เปิด `/contact` | ✅ 200 | ไม่มี 404 · `h1` = "Contact" |
| 5 | Control: fetch `/does-not-exist` | ✅ 404 (ตามคาด) | ยืนยันว่า 200 ของหน้าจริงไม่ใช่ catch-all |
| 6 | ส่งฟอร์ม Contact (Demo Tester (MCP) / demo@example.com / ข้อความ demo) | ✅ `POST /api/contact` → 201 | `role="status"` แสดง "Sent. Thank you!" |
| 7 | `POST /api/contact` email ผิดรูปแบบ (ผลที่คาด: 400) | ✅ 400 (ตามคาด) | body `{"error":"invalid"}` ข้อความคงที่ ไม่ leak (D11) |
| 8 | ส่งฟอร์ม Guestbook (Demo Guest (MCP) / "Hello from Playwright MCP") | ✅ `POST /api/guestbook` → 201 → `GET` 200 | entry ใหม่ขึ้นบนสุดของรายการ |
| 9 | Console errors | ✅ เฉพาะที่คาด | มีแค่ 404 (step 5) และ 400 (step 7) ที่ตั้งใจยิง · ไม่มี JS error |
| 10 | Screenshot (full page) | ✅ | [`mcp-home`](screenshots/mcp-home.png) · [`mcp-about`](screenshots/mcp-about.png) · [`mcp-contact-submitted`](screenshots/mcp-contact-submitted.png) · [`mcp-guestbook`](screenshots/mcp-guestbook.png) |

### Findings (ยังไม่แก้ — รอสั่งหลัง a11y)

| ID | ระดับ | เรื่อง | อ้างอิง |
|---|---|---|---|
| QA-1 | สูง | `guestbook.astro` render รายการด้วย `innerHTML` โดยไม่ escape `name`/`message` → stored XSS ได้ถ้าเปิดใช้ guestbook | `src/pages/guestbook.astro` ฟังก์ชัน `load()` · skill `public-site-safe` |
| QA-2 | กลาง | nav (`BaseLayout.astro`) และการ์ดบน Home ยังลิงก์ไป Guestbook ซึ่งขัดกับ D9 (ห้ามใส่ใน nav/footer จนกว่าผ่านเงื่อนไข) | `docs/DECISIONS.md` D9 · issue #9 |
| QA-3 | ต่ำ | About / Interests `h1` ยังเป็นภาษาอังกฤษแบบ template (Lab 04 ยังไม่ทำใหม่ ตาม STATUS) | `docs/STATUS.md` Next actions #2 |
| QA-4 | ต่ำ | ฟอร์ม Guestbook ไม่แสดงสถานะ success/error ให้ผู้ใช้ (ไม่มี `role="status"`) — จะตรวจต่อในรอบ a11y | `src/pages/guestbook.astro` |
| QA-5 | ต่ำ | หน้า Contact / Guestbook แสดงข้อความสำหรับนักพัฒนาต่อสาธารณะ ("ฟอร์มนี้โพสต์ไปที่ `POST /api/contact`", "อ่าน/เขียนผ่าน `/api/guestbook`") | `src/pages/contact.astro` · `guestbook.astro` |
| QA-6 | ต่ำ | `<title>` ของ Contact / Guestbook เป็นแค่ "Contact" / "Guestbook" ไม่มีชื่อเจ้าของ (หน้าอื่นเป็น "About · Supunkan Keawmeesri") | `src/pages/contact.astro` · `guestbook.astro` |
| QA-7 | ต่ำ | รายการ guestbook ต่อ timestamp ติดข้อความ (เช่น "Hello from E2E demo2026-09-25 09:01:51") · และข้อมูล demo ใน SQLite local มีคำว่า "(Lab 05b)" ซึ่งถ้า DB นี้หลุดไป deploy จะ render ออกหน้าเว็บ — ใช้ DB ใหม่ตอน ship | `guestbook.astro` `load()` · skill `public-site-safe` |

ข้อมูล demo ถูกเขียนลง `data/site.sqlite` (อยู่ใน `.gitignore` ไม่ถูก commit)

## a11y Debate

- วันที่: 2026-09-25 · ผู้รัน: Claude Code (จำลอง 2 บทบาท) · ยังไม่แก้ `src/`
- Input: ผล E2E ด้านบน + หน้า `/contact` ตรวจสดผ่าน Playwright MCP (evaluate computed style / labels / focus · screenshot [`a11y-contact-focus`](screenshots/a11y-contact-focus.png) ตอน Email ถูก focus ด้วย Tab)
- Contrast คำนวณตามสูตร WCAG 2.x จาก token ใน `src/layouts/BaseLayout.astro` (พื้น card จริง = `color-mix(#141a2f 92%, white 8%)` ≈ `#272c40`)

| จุดตรวจ | ค่าที่วัดได้ | เกณฑ์ | ผล |
|---|---|---|---|
| ข้อความ `--muted #a5b4d4` บน card | 6.63:1 | 4.5:1 (1.4.3) | ✅ |
| ข้อความ `--text #eef2ff` บน card | 12.35:1 | 4.5:1 | ✅ |
| nav `--muted` บนพื้น (`#0b1020` / `#17203a`) | 9.09 / 7.73:1 | 4.5:1 | ✅ |
| ลิงก์ `--accent #7c9cff` บน card | 5.3:1 | 4.5:1 | ✅ |
| ปุ่ม Send (`#081018` บน `#7c9cff`) | 7.34:1 | 4.5:1 | ✅ |
| ขอบ input `#243056` เทียบ card / พื้น input | **1.07 / 1.41:1** | 3:1 (1.4.11 non-text) | ❌ มองไม่เห็นขอบช่องกรอก |
| Focus ring | ไม่มี style กำหนดเอง → ใช้ `outline: auto` ของ Chromium (เส้นเข้ม `rgb(16,16,16)` + ขอบขาวบาง ~1px) | 2.4.7 เห็นได้ · 2.4.11 (2.2) ชัดพอ | ⚠️ เห็นได้ แต่บางมากบนธีมมืด (ดู screenshot) |
| Label ฟอร์ม | `name`/`email`/`message` ผูก `<label for>` ครบ · ชื่อ accessible ถูก | 1.3.1 / 4.1.2 | ✅ |
| `autocomplete` | ไม่มีทั้ง 3 ช่อง | 1.3.5 (AA) | ❌ |
| บอกช่องบังคับ | มี `required` แต่ไม่มีตัวบ่งชี้ที่มองเห็น | 3.3.2 | ⚠️ |
| ข้อความ error | server 400 แสดง "Error: invalid" (ไม่บอกช่องไหน/ทำอย่างไร) · ไม่มี `aria-invalid` | 3.3.1 / 3.3.3 | ⚠️ |
| สถานะหลังส่ง | `role="status"` + `aria-live="polite"` | 4.1.3 | ✅ (Contact) · ❌ Guestbook (QA-4) |
| Heading order | Contact: `h1` เดียว · Home: `h1` → `h2` การ์ด | 1.3.1 | ✅ |
| Skip link | ไม่มี (nav 5 ลิงก์ก่อนถึง main) | 2.4.1 | ⚠️ มี `<main>` landmark ช่วยได้บางส่วน |
| `lang` / `<title>` | `lang="th"` แต่ label/heading เป็นอังกฤษ · title Contact = "Contact" (QA-6) | 3.1.1 / 2.4.2 | ⚠️ |
| `<meta name="description">` | **"Personal branding site for the multi-agent course"** — default ใน BaseLayout ใช้กับทุกหน้า | public-site-safe (ห้ามอ้างคอร์ส) | ❌ ไม่ใช่ a11y แต่หลุดสาธารณะ · `tests/public-site.test.ts` ไม่จับเพราะไม่ตรง pattern `lab N` |

### Advocate

- **ขอบ input 1.07:1 คือปัญหาจริงอันดับหนึ่ง** — ผู้ใช้สายตาเลือนรางหรือจอสว่างน้อยจะไม่รู้ว่าช่องกรอกอยู่ตรงไหน เห็นแค่ label ลอย ๆ และพื้นเข้มกว่านิดหน่อย (1.31:1) ผิด 1.4.11 ชัดเจน
- **Focus ring พึ่ง default ของเบราว์เซอร์** ซึ่งบนธีมมืดเหลือเส้นขาว ~1px — คนใช้คีย์บอร์ดหาตำแหน่งยาก และ Firefox/Safari หน้าตาจะต่างกันอีก ต้องมี `:focus-visible` ของเราเองที่หนา ≥2px และ contrast ≥3:1 (ใช้ `--accent` ได้ 5.3:1)
- **`autocomplete="name"` / `"email"`** เป็น AA (1.3.5) ช่วยคนพิมพ์ลำบากและผู้ใช้มือถือโดยตรง แก้ 2 attribute
- **Error ต้องบอกว่าผิดตรงไหน** — "Error: invalid" ไม่พอ ควรเป็นข้อความไทยที่บอกวิธีแก้ และถ้ารู้ช่อง ให้ตั้ง `aria-invalid` + `aria-describedby`
- Guestbook ไม่มี live region (QA-4) — คนใช้ screen reader กด Sign แล้วไม่รู้ว่าสำเร็จ
- Skip link และ `lang` ที่ปนภาษาควรทำ แต่ยอมรับว่ากระทบน้อยกว่า เพราะ nav สั้นและมี `<main>`
- ยอมรับว่า **text contrast ทั้งเว็บผ่านสบาย** และ label ฟอร์มผูกถูกทุกช่อง — พื้นฐานดีกว่าเว็บ template ทั่วไป

### Pragmatist

- เห็นด้วยว่า **ขอบ input + focus ring** ต้องแก้ก่อน ship: เป็น CSS ไม่กี่บรรทัดใน `BaseLayout.astro` ที่เดียวแล้วได้ทุกหน้า เสี่ยงต่ำ ไม่แตะ API
- **`autocomplete`** — 2 attribute ใน `contact.astro` ทำได้ใน 2 นาที ใส่ก่อน ship
- **meta description ที่อ้างคอร์ส** ไม่ใช่ a11y แต่ **ต้องแก้ก่อน ship** เพราะผิดกติกา public-site-safe และขึ้นใน Google snippet · ควรเพิ่ม test ให้จับคำว่า "course" ด้วย
- **Error message แบบรายช่อง**: ต้องให้ API คืน field ที่ผิด ซึ่งเป็นฝั่ง OpenCode (backend) — ก่อน ship ทำแค่เปลี่ยนข้อความฝั่ง UI เป็นไทยที่อ่านรู้เรื่อง ("กรุณาตรวจชื่อ อีเมล และข้อความอีกครั้ง") ส่วน `aria-invalid` รายช่อง → หลัง ship ผ่าน handoff
- **Guestbook live region (QA-4)**: Guestbook ยังไม่เปิดสาธารณะ (D9) และมี XSS (QA-1) ค้าง → ไม่บล็อก ship ถ้าหน้าไม่ถูกลิงก์ แต่ต้องแก้คู่กับ QA-1 ก่อนเปิดใช้
- **Skip link / `lang` / ตัวบ่งชี้ required** — หลัง ship (P2) หรือทำพร้อม Lab 04 รอบใหม่ที่จะแปล heading เป็นไทยอยู่แล้ว (QA-3) จะได้ไม่ทำซ้ำ
- ไม่ต้องรื้อธีมสี — text contrast ผ่านหมดแล้ว

## a11y Action items (prioritized P0/P1/P2)

> P0 = ต้องแก้ก่อน ship · P1 = ควรแก้ก่อน ship (≤30 นาที) · P2 = หลัง ship · ⏱ = ประเมินเวลา

| ID | Pri | งาน | ⏱ | ไฟล์ | Owner | เกณฑ์ปิด |
|---|---|---|---|---|---|---|
| A11Y-1 | P0 | ขอบ input/textarea ให้ ≥3:1 — เปลี่ยน border เป็น `#7482ad` (3.64:1 บน card · 4.78:1 บนพื้น input) | 5 นาที | `src/layouts/BaseLayout.astro` | Claude (frontend) | วัดซ้ำได้ ≥3:1 |
| A11Y-2 | P0 | เพิ่ม `:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px }` (5.3:1 บน card · 7.26:1 บนพื้น) | 5 นาที | `src/layouts/BaseLayout.astro` | Claude (frontend) | Tab ผ่าน nav → ฟอร์ม เห็น ring ชัดใน screenshot |
| A11Y-3 | P0 | เปลี่ยน default `description` ใน BaseLayout ให้ไม่อ้างคอร์ส (ใช้ Headline จาก PROFILE) + เพิ่มคำ `course` ใน `tests/public-site.test.ts` | 10 นาที | `BaseLayout.astro` · `tests/public-site.test.ts` | Claude (frontend) | `npm test` เขียว และ test ใหม่ RED ก่อนแก้ |
| A11Y-4 | P1 | `autocomplete="name"` / `autocomplete="email"` ในฟอร์ม Contact (และ `name` ใน Guestbook) | 2 นาที | `src/pages/contact.astro` · `guestbook.astro` | Claude (frontend) | evaluate เห็น attribute ครบ |
| A11Y-5 | P1 | ข้อความ error ฝั่ง UI เป็นไทยที่บอกวิธีแก้ แทน "Error: invalid" / "Network error" | 5 นาที | `src/pages/contact.astro` | Claude (frontend) | ส่ง email ผิด → เห็นข้อความใหม่ใน `role="status"` |
| A11Y-6 | P1 | `<title>` Contact/Guestbook ใส่ชื่อเจ้าของ (QA-6) | 2 นาที | `contact.astro` · `guestbook.astro` | Claude (frontend) | title = "Contact · Supunkan Keawmeesri" |
| A11Y-7 | P2 | Guestbook: `role="status"` + escape output — ทำคู่ QA-1/QA-4 ก่อนเปิดใช้ (D9) | 15 นาที | `src/pages/guestbook.astro` | Claude (frontend) | ไม่ใช้ `innerHTML` กับข้อมูลผู้ใช้ |
| A11Y-8 | P2 | API คืน field ที่ผิด → UI ตั้ง `aria-invalid` + `aria-describedby` รายช่อง | 30+ นาที | `src/pages/api/contact.ts` + `contact.astro` | OpenCode (backend) → handoff | เทส 400 มี field |
| A11Y-9 | P2 | Skip link "ข้ามไปเนื้อหา" · ตัวบ่งชี้ช่องบังคับ · แปล label/heading เป็นไทยให้ตรง `lang="th"` (ทำพร้อม Lab 04 / QA-3) | 20 นาที | `BaseLayout.astro` · pages | Claude (frontend) | Tab แรกเจอ skip link |

P0 + P1 (A11Y-1..6) รวม ≈ 30 นาที · ไม่ต้องแตะ API
