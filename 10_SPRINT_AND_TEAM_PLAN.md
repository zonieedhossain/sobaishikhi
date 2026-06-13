# 10 — Sprint & Team Execution Plan

Turns the 10–12 week technical plan (Doc 09) into an executable schedule: team, ceremonies, and **six 2-week sprints** with tickets, owners, and acceptance criteria. Written for a lean founding team.

---

## Team & roles
| Role | Count | Owns |
|---|---|---|
| Tech lead / full-stack | 1 | architecture, review gate, payments, code review |
| Backend engineer | 1 | API, data model, media, webhooks |
| Frontend engineer | 1 | SPA, panels, player, builder UIs |
| Designer (part-time) | 0.5 | already delivered prototype; QA + polish |
| QA / moderation | 1 | test plans, content review SOP, launch ops |
| PM / founder | 1 | scope, priorities, instructor seeding, demos |
| DevOps (fractional) | 0.25 | infra, CI/CD, monitoring, backups |

> ~4 builders. Designer front-loaded (prototype done), QA ramps from Sprint 2.

---

## Cadence & ceremonies
- **2-week sprints**, 6 sprints to soft-launch.
- Daily 15-min standup · Sprint planning (Mon wk1) · Demo + retro (Fri wk2).
- Definition of Ready: ticket has acceptance criteria + design ref. Definition of Done: merged, tested, on staging, AC verified, audit-logged where stateful.
- **Trunk-based** + short-lived PRs; every PR reviewed by tech lead.

---

## Sprint 0 — Foundation (Week 1–2)
**Goal:** skeleton everyone can build on.
- `INFRA-1` Repo, monorepo or FE/BE split, CI/CD, lint/format — *DevOps*
- `INFRA-2` Staging + prod envs, Postgres, Redis, S3 buckets — *DevOps*
- `AUTH-1` Phone-OTP request/verify + JWT access/refresh — *Backend*
- `AUTH-2` RBAC middleware + role model (learner/instructor/expert/vendor/technician/admin) — *Tech lead*
- `FE-1` Port design system + app shell + role-switch routing — *Frontend*
- `FE-2` Auth screens (OTP), session handling — *Frontend*

**Demo:** sign up via OTP, land in the correct panel by role.

---

## Sprint 1 — Catalog & Browse (Week 3–4)
**Goal:** the public marketplace reads.
- `CAT-1` Course/Section/Lesson + Category schema + migrations — *Backend*
- `CAT-2` `GET /courses` filter/sort/search (PG FTS, Bangla) — *Backend*
- `CAT-3` Browse page + filters + search UI — *Frontend*
- `CAT-4` Course detail (curriculum, instructor, reviews) — *Frontend*
- `QA-1` Test plan + seed script (demo courses/categories) — *QA*

**Demo:** browse, filter, search (Bangla), open a course detail.

---

## Sprint 2 — Authoring & the 3 models (Week 5–6)
**Goal:** instructors create; nothing public yet.
- `AUTH-3` Instructor dashboard shell + my-courses (status) — *Frontend*
- `BUILD-1` Course builder (sections/lessons, pricing) → save draft — *Frontend*
- `BUILD-2` Three production models: self (20%) / managed (50–60%) / buy-out; request + pitch forms — *Frontend*
- `BUILD-3` `POST /courses`, `PATCH`, `POST /:id/submit` + server state machine — *Backend*
- `QA-2` Authoring E2E + state-transition tests — *QA*

**Demo:** build a course, pick a model, submit for review.

---

## Sprint 3 — Review Gate & Media (Week 7–8)  ← the trust core
**Goal:** admin approval works; video plays.
- `REV-1` ReviewTask queue + inspect + flag + notes — *Tech lead*
- `REV-2` approve / request-revision / reject transitions + **audit log** — *Tech lead*
- `REV-3` Admin Review Center UI (all content types) — *Frontend*
- `MED-1` Upload + transcode worker (Go + `asynq`) + status — *Backend*
- `MED-2` Signed HLS playback; previews public, lessons gated — *Backend*
- `QA-3` Verify no item reaches `published` without admin approve — *QA*

**Demo:** submit → admin approves → course goes live → gated video plays.

---

## Sprint 4 — Payments, Learning & Repair Hub (Week 9–10)
**Goal:** money in, learning out, guides live.
- `PAY-1` Checkout + SSLCommerz/ShurjoPay (bKash/Nagad) sandbox — *Backend*
- `PAY-2` Webhook (idempotent) → enrollment + commission ledger split — *Tech lead*
- `LRN-1` Progress tracking, learner dashboard, certificate gen — *Frontend*
- `RPH-1` Repair guide schema + contributor builder + submit — *Backend/FE*
- `RPH-2` Repair Hub browse/search + guide page + helpful/success vote — *Frontend*
- `QA-4` Payment sandbox + webhook replay + enroll E2E — *QA*

**Demo:** pay (sandbox) → enroll → watch → progress → certificate; author + publish a repair guide.

---

## Sprint 5 — Admin Controls & Hardening (Week 11–12)
**Goal:** admin controls everything; ready to seed.
- `ADM-1` Platform settings: commissions (per model), sections, payments, banner — *Frontend/BE*
- `ADM-2` Orders view (buyer/item/amount/status) + payouts — *Frontend/BE*
- `ADM-3` Suspend/ban users, feature/unpublish courses — *Backend*
- `HARD-1` Security pass (RBAC audit, rate-limit, signed URLs) — *Tech lead*
- `HARD-2` Perf + low-bandwidth + Bangla QA + mobile — *QA/Frontend*
- `LAUNCH-1` Seed 50–100 courses + repair guides; moderation SOP — *PM/QA*

**Demo / soft launch:** invite-only beta with real seeded catalog.

---

## Critical path (don't reorder)
`Auth+RBAC → Catalog → Authoring → Review Gate → Media → Payments → Admin`
Review Gate and Payments are the two highest-risk items — staffed to the tech lead.

---

## Parallelization
- FE and BE run in parallel each sprint against an agreed API contract (stub endpoints early).
- Media worker and Payments can develop behind feature flags before UI wiring.
- QA writes tests one sprint ahead of the feature where possible.

---

## Risk burn-down (engineering)
| Risk | Sprint addressed | Mitigation |
|---|---|---|
| Payment integration unknowns | S4 (start spike in S2) | early sandbox spike, idempotent webhooks |
| Video cost/latency in BD | S3 | provider trial, adaptive bitrate, CDN |
| Review-queue bottleneck | S3 | bulk actions, clear SOP, reputation fast-track later |
| Bangla search quality | S1→S4 | PG FTS first, Meilisearch upgrade path |
| Scope creep (P1 features) | every sprint | strict MVP gate; P1 backlog parked |

---

## Post-launch (Sprint 6+)
- Triage beta feedback; fix top drop-offs in the funnel.
- Instrument KPIs (signup→first lesson, review turnaround, payment success).
- Begin P1 backlog: tools/parts store + vendor panel (next epic).
