# 06 — Roadmap & Milestones

Sequences the P0 / P1 / P2 scope (Step 2) into shippable phases with timelines, team, and exit criteria. Assumes a lean team and a phased "curated → open marketplace" growth strategy.

---

## Phasing at a glance
| Phase | Theme | Duration | Outcome |
|---|---|---|---|
| 0 | Foundation | 2–3 wks | Repo, design system, auth, infra |
| 1 | Course marketplace MVP | 6–8 wks | Learn + teach + admin review, **launch** |
| 2 | Repair Knowledge Hub | 3–4 wks | iFixit-style guides live |
| 3 | Commerce (tools & parts) | 5–6 wks | Store + vendor panel |
| 4 | Services (consult + booking) | 6–7 wks | Experts + technicians |
| 5 | Community + AI | 5–6 wks | Forum, blog/vlogs, AI assistant |
| 6 | Scale & monetize | ongoing | Subscriptions, ads, growth |

---

## Phase 0 — Foundation (2–3 weeks)
- Design system + component library (done in prototype), responsive shell.
- Auth: phone-OTP + email, RBAC for panels.
- Core data layer: Users, Categories, PlatformSettings; audit log.
- CI/CD, staging, object storage, video provider account.

**Exit:** a user can sign up, log in, and land in the right panel.

---

## Phase 1 — Course Marketplace MVP (6–8 weeks)  ← LAUNCH
- Browse / search / filter; course detail; preview + player.
- Enrollment + payments (bKash/Nagad) + learner dashboard.
- Instructor dashboard + course builder + submit-for-review.
- **Admin Review Center** (content inspection, flag, approve/revise) + core controls (verify, suspend, feature/unpublish, commissions, banner).
- Certificates.

**Exit (MVP success criteria from Step 2):** learner discovers→enrolls→learns; instructor builds→submits→published; admin controls everything; works in Bangla with local payments.
**Go-live:** invite-only curated launch — 50–100 premium courses (matches Phase-1 growth strategy).

---

## Phase 2 — Repair Knowledge Hub (3–4 weeks)
- Repair categories + problem search; guide cards (difficulty, cost, time, success rate).
- Step-by-step guide page; contributor guide builder → review.
- "Was this helpful?" + success rate + save guide.

**Exit:** a visitor searches a problem and follows an approved step-by-step guide.

---

## Phase 3 — Commerce: Tools & Parts (5–6 weeks)
- Product catalog, detail (specs, compatibility, OEM, warranty), reviews.
- Vendor panel: add/manage products → review → publish; stock & sales.
- Cart, checkout, **Orders** in admin, commission + payouts.

**Exit:** a buyer purchases a tool/part; vendor fulfills; admin sees the order + commission.

---

## Phase 4 — Services: Consultation + Booking (6–7 weeks)
- Expert profiles, availability, 15/30/60-min pricing, booking + (mock→real) video calls; expert console.
- Technician "list your service" + **admin verification**; service booking, scheduling, **escrow**, warranty, ratings.

**Exit:** a user books and completes both a video consultation and a technician visit, with escrow release.

---

## Phase 5 — Community + AI (5–6 weeks)
- Q&A forum (upvotes, verified-expert/best-answer badges, leaderboards).
- Blog & vlogs (creator → review → publish).
- **AI Repair Assistant** over the guide/course/product corpus → causes + linked guides/courses/tools/parts/experts/technicians + cost estimate.

**Exit:** the cross-sell loop works — a problem query routes to learn / buy / consult / hire.

---

## Phase 6 — Scale & Monetize (ongoing)
- Open instructor applications (Phase-2 growth), ratings/reviews everywhere, nationwide expansion.
- Subscriptions, premium certifications, corporate training.
- Advertising: sponsored products, featured vendors/experts.
- Recommendation engine; performance, SEO, app wrappers.

---

## Lean team (suggested)
- 1 PM/founder · 2 full-stack · 1 frontend · 1 designer (prototype done) · 1 QA/moderation · part-time DevOps.
- Moderation/admin staff scales with content volume.

---

## Critical path & dependencies
1. Auth + PlatformSettings + Review gate → **everything** depends on these.
2. Payments + payouts ledger → needed before any paid feature (courses, store, services).
3. Video pipeline → courses + consultations + vlogs.
4. Search index → browse + repair hub + AI assistant.
5. Escrow ledger → service bookings.

---

## Top risks & mitigations
| Risk | Mitigation |
|---|---|
| Content quality/trust at scale | Mandatory review gate, verification, reputation weighting, audit log |
| Cold-start (no courses/experts) | Curated invite-only launch; seed 50–100 courses + key repair guides |
| Payment friction in BD | bKash/Nagad/Rocket first; OTP auth; clear refunds + escrow |
| Moderation overload | Bulk review actions, flagging, trusted-contributor fast-track |
| Low bandwidth / devices | Adaptive video, light pages, downloadable guides (text-first) |

---

## Suggested KPIs by phase
- **P1:** signups, enrollments, course completion %, instructor activation, review-queue turnaround.
- **P3:** GMV, AOV, vendor count, refund rate.
- **P4:** consultations booked, technician jobs completed, escrow disputes.
- **P5:** forum answers, AI-assistant → conversion (guide/course/order), retention/streaks.
