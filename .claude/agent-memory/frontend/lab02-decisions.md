---
name: lab02-decisions
description: Lab 02 ปิดแล้ว (2026-09-25) — UI ต้องทำตาม docs/DECISIONS.md D1–D14 · แหล่งจริงคือไฟล์นั้น ไม่ใช่ memory นี้
metadata:
  type: project
---

Lab 02 ปิด 2026-09-25 · คำตัดสินอยู่ที่ `docs/DECISIONS.md` (D1–D14) + "เกณฑ์พร้อม Frontend (Lab 04)" — อ่านไฟล์นั้นทุกครั้ง ถ้าขัดกับ memory นี้ ให้เชื่อไฟล์

จุดที่พลาดง่ายตอน implement (ตรวจกับ DECISIONS ก่อนใช้):
- เริ่มจาก L2 (`src/lib/profile.ts` อ่านได้แค่ย่อหน้า/bullet แรก) — About/Interests ต้องแสดงครบ และ FALLBACK ห้ามหลุด (D7, D8)
- ไม่มี Guestbook ในเมนู/footer (D9) · เมนู 4 รายการ (D4)
- อีเมลเป็นลิงก์ "ส่งอีเมล" — ไม่พิมพ์ที่อยู่เป็นข้อความใน markup · ช่อง `—` ไม่ render (D5)
- ฟอร์ม Contact เจอ 501 → ไม่ล้างข้อความ + ชี้ไปอีเมล · ไม่แตะ `db.ts` / `api/**` (D6)
- ไม่ประกาศ "เปิดรับงาน" (D13) · ห้ามคำว่าคอร์ส/แล็บใน markup (D12)

**Why:** debate 3 บทบาทจบแล้ว เซสชันถัดไปของ frontend ไม่มี context รอบนั้น  
**How to apply:** ก่อนงาน UI เปิด DECISIONS + OPEN_LOOPS · เนื้อหาที่เจ้าของยังไม่ให้ (Skills, case study, บรรทัด Interests — L3/L7) ห้ามแต่งเอง
