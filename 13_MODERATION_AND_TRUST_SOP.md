# 13 — Moderation & Trust SOP

The review team's playbook. Trust is the product (Doc 02), so the **review gate** must be consistent, fast, and fair. This is the operating procedure for everyone with admin/moderation access. Every action here is **audit-logged** (Doc 09 §6).

---

## A. Why this exists

Nothing public goes live without approval. The SOP keeps that gate consistent across reviewers, protects learners from harmful/low-quality content, and protects the platform's reputation and payments.

---

## B. What gets reviewed (all content types)

Courses · Repair guides · Managed-production & buy-out requests · Vendor products (P1) · Blog/Vlogs · Expert & technician verifications · Forum answers (reported). Each enters the **Review Center** queue as a `ReviewTask`.

---

## C. Review checklist (apply to every submission)

1. **Identity & eligibility** — is the creator verified for this category? (e.g., religious content → verified scholar; medical/repair safety → competent technician.)
2. **Accuracy** — does content match its title, category, level, and price? No misleading claims.
3. **Quality** — audio/video intelligible (courses); guide steps clear, ordered, complete (repair).
4. **Safety** — repair guides include required **safety warnings**; no dangerous/illegal instructions.
5. **Policy** — no copyright violation, hate speech, harassment, scams, adult content, or off-platform payment solicitation.
6. **Completeness** — curriculum/sections present; not an empty or placeholder shell.
7. **Pricing fairness** — within sane bounds; discounts honest.

> Course self-produced and managed both pass the **same** bar. Buy-out adds a commercial check (sell-through potential, originality).

---

## D. Decisions

| Decision             | When                                      | Action                                                               |
| -------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| **Approve**          | meets all checklist items                 | content → `published`; creator notified                              |
| **Request revision** | fixable issues                            | flag specific items + notes; content → `revision`; creator resubmits |
| **Reject**           | policy violation / unfixable / fraudulent | reason logged; creator notified; repeat → account review             |

**Revision notes must be specific** — reference the lesson/step/field and what to change. No vague "improve quality."

---

## E. SLAs (turnaround targets)

- First review of a submission: **≤ 2 business days** (curated phase), ≤ 24h at scale with more staff.
- Re-review after resubmission: **≤ 1 business day**.
- Verification (instructor/expert/technician): ≤ 3 business days.
- Reported live content (forum/abuse): **≤ 4 hours** triage.

Queue age is monitored on the admin dashboard; aging items escalate to the lead.

---

## F. Content lifecycle controls (post-publish)

Admins can act on already-live content:

- **Pause / Unpublish** — temporarily hide (e.g., quality complaint under investigation).
- **Take down** — remove for confirmed violation.
- **Feature** — promote vetted high-quality content.
- **Re-review** — trigger on spike in refunds, low ratings, or reports.

User-level: **suspend** (temporary), **ban** (permanent, with reason), **verify/unverify**.

---

## G. Reputation & trust tiers

- New contributors: every item full-reviewed.
- **Trusted tier** (consistent approvals, high ratings, low complaints): lighter/faster review (spot-check) — reduces moderation cost without lowering the bar.
- Strikes: violations accrue; thresholds trigger re-verification, suspension, or ban.

---

## H. Escalation

- Ambiguous policy calls → review lead → (if needed) founder/legal.
- Safety-critical (dangerous repair, medical/financial harm) → immediate hold + lead review.
- Legal (copyright/DMCA, defamation) → documented takedown + counter-notice process.

---

## I. Fairness & appeals

- Creators can **appeal** a rejection once; a different reviewer (or lead) re-evaluates.
- Decisions cite the specific checklist item + policy clause.
- Consistency audits: lead samples X% of decisions weekly to calibrate reviewers.

---

## J. Tooling (in the admin panel)

- Review Center queue with filters by type/status and **bulk actions**.
- Inline content inspection (lesson-by-lesson, guide step-by-step), per-item **flagging + notes**.
- One-click approve / request-revision / reject; templates for common notes.
- Full **audit log**: who decided what, when, and why.

---

## K. Content policy (summary — expand into public ToS)

**Prohibited:** illegal content, copyright infringement, hate/harassment, scams & MLM, sexual content, dangerous instructions without safeguards, off-platform payment solicitation, impersonation, misleading credentials.
**Required for repair guides:** accurate symptoms/causes, explicit safety warnings, realistic local cost, honest difficulty rating.
**Required for instructors:** truthful bio/credentials, original or licensed material, working contact for support.

> Publish a learner-facing version of K as the Trust & Safety / Community Guidelines page; keep this SOP internal.
