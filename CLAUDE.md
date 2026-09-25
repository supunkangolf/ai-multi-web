@AGENTS.md

# Claude Code — seed คอร์ส (อย่าลบตอน /init)

หลัง Lab 00 ให้ `/init` **merge** — เก็บกฎด้านล่างไว้เสมอ

## สี่เสา (ย่อ)

1. Multi-Agent แยกหน้าที่/ความจำ · 2. Sub-Agent ใช้แล้วทิ้ง · 3. ประสานผ่าน docs/PR · 4. Swarm เพดาน **20 turns**

## Ownership (บังคับ)

| Artifact | Owner |
|---|---|
| UI | Claude · `.claude/agents/frontend.md` |
| API + SQLite | OpenCode · `.opencode/agents/backend.md` |
| docs PROFILE / DEBATE / DECISIONS | Claude (Lab 01–02) |
| Hot state STATUS / OPEN_LOOPS | ผู้ถืองานรอบนั้น (single-writer) |

## Canonical context (อ่านก่อน · อย่าคัดลอกซ้ำในไฟล์นี้)

ก่อนลงมือ:

1. `docs/STATUS.md`
2. `docs/OPEN_LOOPS.md`
3. handoff ล่าสุดใน `docs/handoffs/` (ถ้ามี)
4. ตามงาน: `docs/PROFILE.md` · `docs/DECISIONS.md`

สรุป Goal / Latest D-id / Open loops / Blockers **ไม่เกิน 8 บรรทัด**  
ห้ามสมมุติจากแชท OpenCode ถ้าไม่มีใน `docs/`  
จบงานที่เปลี่ยนสถานะ → อัปเดต STATUS / OPEN_LOOPS · สลับ harness → เขียน handoff จาก [`docs/handoffs/TEMPLATE.md`](docs/handoffs/TEMPLATE.md)

## กฎสั้น

- Root เท่านั้น · plugin **project scope**
- Skill **`public-site-safe`**
- Agent ถาวรใช้ `memory: project` (harness) — ตรวจใน Lab 00 · ห้ามสร้าง memory bus เอง
- MCP ไม่ใช่ท่อ Claude ↔ OpenCode · Cross-CLI เฉพาะ Lab 07
- ห้าม commit `.env` · PR เข้า learner repo เท่านั้น
- Swarm: หยุดเมื่อ done หรือครบ 20 turns
- STATUS/OPEN_LOOPS = single-writer · commit ก่อนสลับ harness

## ฝั่ง Claude Code (เพิ่มจาก /init · คำสั่ง + ข้อเท็จจริงโค้ดอยู่ใน `@AGENTS.md` แล้ว)

- **รันเทสไฟล์เดียว:** `npx vitest run tests/smoke.test.ts` · กรองชื่อ: `npx vitest run -t "<name>"` · lab: `npx vitest run --config vitest.labs.config.ts`
- **Agents** (`.claude/agents/`): `frontend` (UI · Lab 04) · `reviewer` (Lab 07 · เขียนได้เฉพาะ `docs/review-*.md`) — ทั้งคู่ `memory: project`
- **Skills** (`.claude/skills/`): `public-site-safe` (ทุกงาน implement/swarm/ship) · `opencode` (เรียก `opencode run` headless · Lab 07)
- **Config ที่ไม่ commit:** `.claude/settings.json` ← `settings.json.example` (plugin superpowers) · `.mcp.json` ← `.mcp.json.example` (github + playwright — **งานผลิตเท่านั้น ไม่ใช่ท่อไป OpenCode**)

### แผนที่โค้ด (ขอบเขต ownership)

```text
docs/PROFILE.md ──loadProfile()── src/lib/profile.ts ──► index / about / interests.astro   (Claude)
contact.astro, guestbook.astro ──fetch──► src/pages/api/{contact,guestbook,interests}.ts    (OpenCode)
                                                └──► src/lib/db.ts (better-sqlite3 · stub NOT_IMPLEMENTED → API ตอบ 501)
src/layouts/BaseLayout.astro = layout เดียวของทุกหน้า
```

- Frontend แตะได้แค่ฝั่ง fetch/ฟอร์ม — ถ้า API ตอบ 501 = รอ Lab 05 (OpenCode) อย่า implement `db.ts` เอง
- `profile.ts` อยู่ใต้ `src/lib/` แต่เป็นงาน UI (Claude · open loop L2)

## Labs

ดู [`labs/README.md`](labs/README.md) · เริ่ม [`lab-00-project-init`](labs/lab-00-project-init/README.md)
