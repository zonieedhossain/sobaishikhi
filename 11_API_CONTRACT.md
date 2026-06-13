# 11 — API Contract Spec (MVP)

The concrete request/response contract so frontend and backend build in parallel against one source of truth. Covers MVP endpoints (Doc 09). JSON over HTTPS. Amounts in **integer paisa** (৳1 = 100). Times ISO-8601 UTC.

---

## Conventions

- **Base:** `/api/v1`
- **Auth:** `Authorization: Bearer <accessToken>` (JWT, 15-min); refresh via `/auth/refresh` (30-day, rotating).
- **Content-Type:** `application/json`; file uploads use presigned S3 PUT (see Media).
- **Pagination:** cursor — `?limit=20&cursor=<opaque>` → `{ data:[], nextCursor }`.
- **Filtering/sort:** query params; server validates whitelist.
- **Idempotency:** mutating POSTs accept `Idempotency-Key` header (required for checkout/webhooks).
- **Localization:** `Accept-Language: bn|en` (affects messages, not content).

### Standard error shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable",
    "fields": { "email": "invalid" }
  }
}
```

**Codes:** `UNAUTHENTICATED` (401) · `FORBIDDEN` (403) · `NOT_FOUND` (404) · `VALIDATION_ERROR` (422) · `CONFLICT` (409) · `RATE_LIMITED` (429) · `PAYMENT_FAILED` (402) · `SERVER_ERROR` (500).

---

## Auth

**POST `/auth/otp/request`**

```json
req:  { "phone": "01712345678" }
res:  { "requestId": "otp_…", "expiresIn": 120 }      // 200; rate-limited per phone/IP
```

**POST `/auth/otp/verify`**

```json
req:  { "requestId": "otp_…", "code": "123456", "name": "Ria Islam", "intent": "learner|instructor" }
res:  { "accessToken": "…", "refreshToken": "…", "user": { "id","name","roles":["learner"],"verified":false } }
```

**POST `/auth/refresh`** → `{ accessToken, refreshToken }` (old refresh invalidated).
**POST `/auth/logout`** → `204`.

---

## Catalog (public)

**GET `/courses`** — query: `cat, level, q, sort(popular|rating|newest|price), limit, cursor`

```json
res: { "data": [ {
  "id","slug","title","titleBn","cat","instructor": {"id","name","verified"},
  "price": 149900, "oldPrice": 350000, "rating": 4.8, "ratingsCount": 3420,
  "students": 12400, "lessons": 142, "bestseller": true, "thumbUrl"
} ], "nextCursor": null }
```

**GET `/courses/:slug`** → full course + `sections:[{id,title,lessons:[{id,title,type,duration,isPreview}]}]` + `instructor` + `reviews` summary. Lesson `videoUrl` is **omitted unless enrolled** (preview lessons return a short signed clip).

**GET `/categories`** → `[{ id, name, nameBn, icon, hue, courseCount, enabled }]`.

---

## Authoring (instructor; RBAC: instructor)

**POST `/courses`** (create draft)

```json
req: { "title","titleBn","cat","level","price",
       "productionModel": "self|managed|buyout" }
res: { "id","status":"draft", ... }
```

**PATCH `/courses/:id`** — partial update (owner only). `403 FORBIDDEN` if not owner.
**PUT `/courses/:id/sections`** — replace curriculum `{ sections:[{title,lessons:[{title,type}]}] }`.
**POST `/courses/:id/submit`** → `{ status:"under_review", submittedAt }`. Server rejects if model=self and no lessons (`VALIDATION_ERROR`).
**POST `/production-requests`** (managed or buy-out)

```json
req: { "model":"managed|buyout", "topic","canProvide","location","ideaNote" }
res: { "id","status":"pending_admin", "createdAt" }
```

---

## Enrollment & Learning (RBAC: learner)

**POST `/checkout/:courseId`** _(Idempotency-Key required)_

```json
res: { "orderId","amount":149900,"gatewayRedirectUrl":"https://…" }   // hosted payment page
```

**POST `/payments/webhook`** _(gateway → server; verify signature; idempotent by txnId)_ → `200`. On success: create `Enrollment`, split commission, emit notification.
**GET `/me/learning`** → enrolled courses with `progress, lastLessonId`.
**POST `/enrollments/:courseId/progress`** `{ lessonId, completed:true }` → updated `progress`.
**GET `/enrollments/:courseId/certificate`** → `{ url }` (only if `progress=100`).

---

## Repair Hub

**GET `/guides`** — `rcat, q, difficulty, limit, cursor` → guide cards `{slug,title,difficulty,estCost,estTime,views,successRate}`.
**GET `/guides/:slug`** → full body `{ overview, symptoms[], causes[], tools[], safety[], steps[], mistakes[], prevention[] }`.
**POST `/guides`** / **POST `/guides/:id/submit`** — contributor authoring → review queue.
**POST `/guides/:id/helpful`** `{ helpful:true }` → updates success rate (one per user).

---

## Admin (RBAC: admin) — the control plane

**GET `/admin/review`** — `type(course|guide|production|…), status, limit, cursor`

```json
res: { "data":[ { "id","contentType","contentId","title","submittedBy","submittedAt","status" } ] }
```

**POST `/admin/review/:id/approve`** → content → `published`; audit-logged.
**POST `/admin/review/:id/revision`** `{ notes:[{itemRef,note}] }` → content → `revision`; notifies creator.
**POST `/admin/review/:id/reject`** `{ reason }` → `rejected`.
**GET `/admin/orders`** — `from,to,type,status` → `[{ id, buyer, itemType, itemId, amount, commission, status, createdAt }]`.
**GET `/admin/payouts`** / **POST `/admin/payouts/:id/process`** → marks paid; ledger entry.
**PATCH `/admin/settings`**

```json
req: { "commissionRates": {"courseSelf":20,"courseManaged":55,"store":10,"consultation":15,"service":12},
       "paymentMethods": {"bkash":true,"nagad":true,"rocket":false,"card":true},
       "sectionsEnabled": {...}, "homepageBanner": {"on":true,"text":"…","discountPct":60} }
res: { "ok": true }
```

**POST `/admin/users/:id/suspend`** `{ reason }` / **`/ban`** / **`/verify`** → audit-logged.
**POST `/admin/courses/:id/feature`** | **`/unpublish`**.

> **Invariant:** the _only_ path to `status:"published"` is an admin approve transition. No instructor/vendor endpoint can set it. Enforced in the service layer + covered by tests.

---

## Webhooks & async

- **Payment webhook** (inbound): signed, idempotent by gateway txnId; retried by gateway — must be safe to replay.
- **Notifications** (outbound, queued): OTP SMS, review decision, payout status, enrollment receipt.
- **Transcode jobs**: `POST /media/uploads` → presigned PUT → worker transcodes → `lesson.status: ready`; FE polls or subscribes.

---

## Media

**POST `/media/uploads`** `{ kind:"video|image", contentType }` → `{ uploadUrl (presigned PUT), assetId }`.
Client PUTs file to `uploadUrl`. Server transcodes (video) → HLS; playback via short-lived signed URL from `GET /lessons/:id/playback` (enrollment-checked).

---

## Rate limits (defaults)

- OTP request: 5 / phone / hour. Auth verify: 10 / 10 min.
- Write endpoints: 60 / min / user. Public reads: 600 / min / IP (CDN-cached).

---

## Versioning & compatibility

- URI-versioned (`/v1`). Additive changes only within a version; breaking changes → `/v2`.
- Deprecations announced via `Sunset` header. Clients pin a version.

> This contract is the FE/BE handshake for the sprints in Doc 10. Stub these endpoints in Sprint 0–1 so both sides build against the shapes above.
