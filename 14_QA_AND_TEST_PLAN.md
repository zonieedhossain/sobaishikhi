# 14 — QA & Test Plan (MVP)

How we verify the MVP works before and after launch. Maps to the flows (Doc 04), API (Doc 11), and sprints (Doc 10). The bar: **no content reaches `published` without an admin approve transition**, payments are safe, and the three critical journeys work on low-bandwidth mobile.

---

## A. Test strategy (the pyramid)

- **Unit (most):** commission math, state-machine transitions, validators, money/paisa formatting, RBAC guards.
- **Integration:** API + DB per module (auth, catalog, authoring, review, payments, repair hub).
- **E2E (few, critical):** Playwright on the 3 journeys below + the admin gate.
- **Manual/exploratory:** Bangla rendering, mobile, low-bandwidth, accessibility.

---

## B. Three critical E2E journeys (must always pass)

1. **Learner:** browse → search (Bangla) → open course → preview → checkout (sandbox) → enroll → watch gated lesson → progress → certificate.
2. **Instructor:** build course (each of 3 models) → submit → (admin approves) → appears live → earnings reflect a sale.
3. **Repair:** contributor authors guide → submit → (admin approves) → searchable in hub → "helpful" vote updates success rate.

Plus the **gate test:** attempt to publish without approval via API → must be rejected (`FORBIDDEN`/state error).

---

## C. Test cases by module

### Auth

- OTP request rate-limited (6th request in an hour → `RATE_LIMITED`).
- Wrong/expired OTP → `VALIDATION_ERROR`; correct → tokens issued.
- Refresh rotates token; old refresh invalid; logout revokes.
- RBAC: learner hitting `/admin/*` → `403`.

### Catalog & search

- Filters (cat/level/price/sort) return correct subsets; empty state renders.
- Bangla query matches Bangla titles (FTS tokenization).
- `GET /courses/:slug` hides `videoUrl` when not enrolled; preview returns short clip.

### Authoring & 3 models

- Self-produced: submit with 0 lessons → `VALIDATION_ERROR`; with lessons → `under_review`.
- Managed/buy-out: request creates `pending_admin`; no course auto-publishes.
- Non-owner PATCH on a course → `403`.
- Commission stamped correctly per model (self 20 / managed 55 / buyout one-time).

### Review gate (highest priority)

- Approve → status `published` + audit row written.
- Request revision → status `revision` + notes delivered + creator can resubmit.
- Reject → status `rejected`, reason logged.
- **Negative:** any non-admin or non-approve path cannot set `published` (service + API tests).
- Bulk actions affect only selected items.

### Payments & enrollment

- Checkout returns gateway redirect; amount = course price (paisa).
- Webhook **idempotent**: replaying same txnId creates exactly one enrollment.
- Failed/cancelled payment → no enrollment; user sees correct state.
- Commission ledger split matches PlatformSettings at order time.
- Duplicate enrollment prevented (unique per user+course).

### Learning

- Progress updates per lesson; 100% unlocks certificate; <100% → certificate `403`/locked.
- Resume returns to `lastLessonId`.

### Repair Hub

- Guide CRUD + submit → review; published guide searchable.
- "Helpful" once per user; success rate recomputes.

### Admin controls

- Settings save & apply (commission/sections/payments/banner) reflect on site.
- Suspend/ban blocks login/actions; verify toggles badge.
- Unpublish removes from browse; feature promotes.
- Orders/payouts show correct totals; process payout marks paid + ledger entry.

---

## D. Non-functional tests

- **Performance:** p95 page < 2.5s on 3G-class; API p95 < 400ms; search < 300ms. Load-test browse/search + review queue.
- **Low-bandwidth:** video adapts; pages usable on slow-3G; text-first guides load fast.
- **Mobile/responsive:** all panels at 360/768/1024/1440; 44px hit targets.
- **Bangla/i18n:** Hind Siliguri renders correctly; no clipping; numerals/৳ formatting; mixed Bangla-English wraps.
- **Security:** RBAC matrix per route; signed-URL expiry; OTP brute-force throttle; input fuzzing; webhook signature verification; no PII in logs.
- **Accessibility:** keyboard nav, focus states, contrast, alt text on slots.

---

## E. Test data & environments

- **Staging** seeded with demo users (one per role), ~20 courses across statuses, repair guides, and orders.
- **Payment sandbox** mandatory before any real-money path; webhook replay harness.
- Reset/reseed script; never test against prod data.

---

## F. Release gates (must be green to ship)

1. All unit + integration suites pass in CI.
2. The 3 critical E2E journeys + gate test pass.
3. No open Sev-1/Sev-2 bugs.
4. Performance + Bangla + mobile checks signed off by QA.
5. Security checklist signed off (RBAC, signed URLs, webhook verify, rate limits).
6. Backup/restore runbook verified on staging.

---

## G. Bug severity & triage

| Sev | Definition                                             | Response                        |
| --- | ------------------------------------------------------ | ------------------------------- |
| S1  | data loss, payment error, security breach, gate bypass | stop-the-line, hotfix           |
| S2  | critical flow broken (can't enroll/publish)            | fix this sprint, before release |
| S3  | non-critical bug, workaround exists                    | backlog, prioritized            |
| S4  | cosmetic / polish                                      | opportunistic                   |

---

## H. Post-launch QA

- Synthetic monitors run the 3 journeys against prod hourly.
- Error budget + Sentry alerting; dashboard watch on payment success %, review-queue age, p95 latency.
- Weekly bug triage; regression suite grows with every fixed S1/S2.
