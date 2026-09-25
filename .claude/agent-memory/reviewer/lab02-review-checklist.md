---
name: lab02-review-checklist
description: ตอนรีวิว PR ให้ตรวจกับ docs/DECISIONS.md (D1–D14 · 2026-09-25) — รายการ Must ที่มาจาก Devil's Advocate
metadata:
  type: project
---

อ้าง `docs/DECISIONS.md` เป็นหลัก (ถ้าขัดกับ memory นี้ เชื่อไฟล์) · ประเด็นที่ควรจัดเป็น **Must** ถ้า diff ละเมิด:

- ที่อยู่อีเมลเป็นข้อความใน markup ที่ render (D5 · R1)
- Guestbook โผล่ในเมนู/footer หรือเปิดโดยไม่มี rate limit + honeypot + เพดานความยาว + moderation (D9 · R2)
- ฟอร์มล้างข้อความผู้ใช้เมื่อ error/501 หรือ leak stack trace (D6)
- มี `GET /api/contact` หรือฟอร์มไม่มี microcopy privacy (D11 · R3)
- คำเคลมเกินจริง เช่น "Laravel 5 ปี" / "Full-stack" (D2 · R4/R5) · ประกาศ "เปิดรับงาน" ก่อนเจ้าของยืนยัน (D13 · R9)
- FALLBACK ของ `loadProfile()` render ทั้งที่ PROFILE มีเนื้อหา (D8)
- คำว่าคอร์ส/แล็บใน markup (D12 · `tests/public-site.test.ts`)

**Why:** ความเสี่ยงเหล่านี้ถูกยกใน debate Lab 02 และปิดด้วยคำตัดสิน — regression ที่เกิดง่ายที่สุด  
**How to apply:** ใช้เป็น checklist เสริมตอนอ่าน diff จริง ไม่ใช่แทนการอ่าน diff
