# Agents — Build AI Multi-Agent Lab (V4) · seed

กติการ่วมสำหรับ **Claude Code** และ **OpenCode** (`CLAUDE.md` import ไฟล์นี้ผ่าน `@AGENTS.md`)
สินค้า = เว็บ personal branding (Astro SSR + SQLite) · repo เดียวมีทั้งสินค้า + Labs + กติกาคอร์ส

หลัง Lab 00: `/init` แล้ว **merge** — อย่าลบ Ownership / สี่เสา / Native harness

## คำสั่ง (ตรวจกับ package.json แล้ว)

```powershell
npm install          # Node >= 22.12 (engines)
npm test             # vitest: tests/** — ไม่รวม tests/labs/**
npm run test:labs    # เฉพาะ tests/labs/** — RED ตั้งแต่ template (stub โยน NOT_IMPLEMENTED รอ Lab 05)
npm run test:e2e     # Playwright (testDir ./playwright) — ต้องมี server ที่ 127.0.0.1:4321 ก่อน (หรือตั้ง PLAYWRIGHT_BASE_URL)
npm run build        # astro build (SSR · node adapter standalone)
npm start            # node ./dist/server/entry.mjs — ต้อง build ก่อน
node scripts/create-course-issues.mjs
```

- **ไม่มี script lint / typecheck** — CI (.github/workflows/ci.yml) = `npm ci` → `npm test` → `npm run build`
- แก้/เขียน API (`src/lib/db.ts`, `src/pages/api/*`) → เป้าหมายคือ `npm run test:labs` เขียว; ก่อน Lab 05 มัน RED **โดยดีไซน์** อย่า "แก้เทสให้ผ่าน" โดยลบ stub

## ข้อเท็จจริงของโค้ด (แอปพลาดได้ง่าย)

- **เว็บสาธารณะต้องไม่ mention คอร์ส/แล็บ** — `tests/public-site.test.ts` สแกน rendered markup ทุก `.astro`/`.html` หา `lab(s) N` และคำไทย "แล็บ" (frontmatter + HTML comment ถูก strip ก่อนสแกน — ใส่ใน comment/frontmatter ได้ แต่ห้ามใน markup ที่ render)
- **`docs/PROFILE.md` → `src/lib/profile.ts`**: เนื้อหาต้องติดกับ heading (`## Bio` แล้วบรรทัดถัดไปเป็นเนื้อหา) — มี blank line คั่น = `loadProfile()` ใช้ FALLBACK และ fallback ถูก render สู่สาธารณะ · ตัว parser ยังอ่านได้แค่ย่อหน้า/bullet แรกต่อ section (Open loop L2 — ตรวจ `docs/OPEN_LOOPS.md` ก่อนถือว่าแก้แล้ว)
- **SQLite (`src/lib/db.ts`)**: path = `DATA_DIR` env (default `./data`) · connection เป็น module-level singleton — เทสต์ที่ต้องการ DATA_DIR อื่นต้องตั้ง env **ก่อน** import
- `.env` ไม่ถูก commit — copy จาก `.env.example` (`STUDENT_SLUG`, `SITE_URL`, `DATA_DIR`, PAT, Coolify webhook)
- `opencode.json` และ `.claude/settings.json` ไม่ได้ commit — copy จาก `*.example` ใน Lab 00 (MCP: github + playwright)
- เปิด OpenCode ด้วย **v2** (`npm i -g @opencode/cli` · ทดสอบ 2.0.16+) — winget ติดตั้ง v1 ซึ่ง TUI พัง (ดู SETUP.md)

## สี่เสาหลัก

1. **Multi-Agent** — หน้าที่และความจำแยก (`.claude/agents/`, `.opencode/agents/` + คนละ CLI)
2. **Sub-Agent** — spawn ใช้แล้วทิ้ง; สิ่งที่ต้องจำต่อ = เขียนลง `docs/` เท่านั้น
3. **การประสานงาน** — handoff ผ่าน docs / issues / PR / review สำคัญกว่าแชทเดียว
4. **Swarm** — หลายตัวได้; เพดาน **20 turns** แล้วหยุดสรุปช่องว่าง (Lab 05b)

ใช้ skill **`public-site-safe`** (มีทั้ง `.claude/skills/` และ `.opencode/skills/`) ทุกงาน implement / swarm / ship

## สี่ชั้นความรู้ (อ่านก่อนลงมือ)

| ชั้น | ไฟล์ |
|---|---|
| Rules | ไฟล์นี้ · `CLAUDE.md` · skill `public-site-safe` |
| Context | `COURSE.md` · `docs/PROFILE.md` · `docs/DECISIONS.md` |
| State (Hot) | `docs/STATUS.md` · `docs/OPEN_LOOPS.md` |
| Artifacts | `src/` · tests · `docs/QA.md` (Lab 06) · PR |

- **Hot / Warm / Cold:** Hot = STATUS + OPEN_LOOPS + handoff ล่าสุด · Warm = PROFILE/DECISIONS/Ownership · Cold = `_cli-*` / logs เก่า
- **Proposed vs Approved:** `DEBATE.md` = ยังไม่ปิด · `DECISIONS.md` = อนุมัติแล้วเท่านั้น
- Adapter (`AGENTS.md` / `CLAUDE.md`) ชี้ไปไฟล์กลาง — **อย่า**คัดลอกเนื้อหา STATUS/DECISIONS ซ้ำใน adapter

### Start-of-session (≤ 8 บรรทัด)

1. อ่าน `docs/STATUS.md` และ `docs/OPEN_LOOPS.md`
2. มี handoff ล่าสุดใน `docs/handoffs/` ที่ส่งถึงคุณ — อ่านด้วย
3. สรุปให้คนดู: Current goal · Latest D-id · Open loops · Blockers — **ไม่เกิน 8 บรรทัด**
4. ข้อมูลขัดแย้งระหว่างไฟล์ — หยุดวิเคราะห์ก่อนแก้โค้ด
5. **ห้าม**สมมุติว่ารู้สิ่งที่เกิดในแชทของ CLI อีกฝั่ง — ถ้าไม่มีใน `docs/` ถือว่าไม่รู้

จบงานที่เปลี่ยนสถานะ: อัปเดต `STATUS.md` / `OPEN_LOOPS.md` (สลับ harness → เขียน handoff ตาม `docs/handoffs/TEMPLATE.md`)

## Single-writer + Ownership

- `docs/STATUS.md` / `docs/OPEN_LOOPS.md`: **writer คนเดียวต่อรอบ** — สลับ Claude ↔ OpenCode หลัง commit หรือหลังเขียน handoff
- อย่าให้สอง agent แก้ไฟล์เดียวกันพร้อมกันโดยไม่แยก branch; reviewer อ่านอย่างเดียวจนกว่าจะโอนงานชัดใน handoff

| Artifact | Owner |
|---|---|
| UI (`src/pages/*.astro`, `src/layouts/`, styles) | Claude · `.claude/agents/frontend.md` |
| API + SQLite (`src/lib/db.ts`, `src/pages/api/*`) | OpenCode · `.opencode/agents/backend.md` |
| E2E / a11y (`docs/QA.md`) | Playwright MCP + either CLI |
| Profile / debate docs | Claude (Lab 01–02 · subagents) |
| Hot state (`STATUS.md` · `OPEN_LOOPS.md`) | ผู้ถืองานรอบนั้น (single-writer) |
| Handoffs (`docs/handoffs/`) | ผู้ส่งงานก่อนสลับ harness |
| Review artifacts | Lab 07 · agent `reviewer` (Claude) / OpenCode review |
| Ship (`docs/SHIP.md`) | Lab 08 |

## ความจำ

| ชนิด | อยู่ที่ |
|---|---|
| ร่วม (shared) | `docs/`, git, PR (STATUS, OPEN_LOOPS, PROFILE, DECISIONS, QA, handoffs) |
| แยก (agent-local) | เซสชัน + ไฟล์ agent (frontend ไม่ถือ context backend) |
| Harness persistent | Claude: `memory: project` → `.claude/agent-memory/<name>/` (ตรวจมีไฟล์ MEMORY) · OpenCode: `AGENTS.md` + agent file + **resume session** |
| ทิ้งได้ | Sub-Agent รอบเดียว (Brand/UX/Devil จบ Lab 02) |

- ความจำร่วมของคอร์ส (`docs/`) คนละชั้นกับ harness memory — สิ่งที่ต้องโชว์ข้ามคน/CLI เขียนลง `docs/`
- เซสชัน OpenCode ใหม่ไม่บังคับ recall ปากเปล่า — ต่องานด้วย docs/โค้ด หรือ resume session เดิม
- **ห้ามสร้าง memory bus เอง — ใช้ของที่ harness มีให้**

## Native harness only

harness = ความสามารถถาวรที่ CLI มีให้ในตัว (memory, plugin, session) — ใช้ของเดิม ไม่สร้างชั้นเอง

- Plugins project scope: superpowers (oh-my-openagent ยังไม่รองรับ OpenCode v2 — ใช้ native agents)
- **Call ข้าม harness ทำได้** — แต่ละตัวยังรันบน harness ตนเอง: OpenCode เรียก `claude -p` · Claude เรียก `opencode run` (headless one-shot · ท่อ = ไฟล์ใน `docs/`)
- **กติกา call:** ฝั่งที่ถูกเรียกเขียนได้**เฉพาะไฟล์รายงาน**ที่ prompt ระบุ (เช่น `docs/review-*.md`) — ห้ามแตะไฟล์ ownership ของผู้เรียก · อย่าให้สอง harness เขียน working tree พร้อมกัน (commit ก่อน)
- ห้ามสร้างระบบส่งข้อความ/สถานะระหว่าง CLI เอง (ไฟล์ JSON เป็นท่อส่งงาน) · ห้าม daemon/loop ถาวร
- MCP = งานผลิต — **ไม่ใช่**ท่อระหว่างสอง CLI
- Swarm หยุดเมื่อ done **หรือ** ครบ **20 turns**

## ห้าม

- Commit `.env`, PAT, Coolify webhook, `node_modules`
- เคลม deploy สำเร็จโดยไม่มี URL 200 จริง
- บังคับ tmux บน Windows (Agent Teams ใช้ in-process)
- PR เข้า `Onto-IQ/*` — เข้า learner repo เท่านั้น
- ปล่อย swarm เกิน 20 turns โดยไม่สรุปหยุด

## Labs

[`SETUP.md`](./SETUP.md) → [`labs/lab-00-project-init`](./labs/lab-00-project-init/README.md) → [`labs/README.md`](./labs/README.md)
