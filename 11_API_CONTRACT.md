# 11 — API Contract Spec (MVP)

The concrete request/response contract so frontend and backend build in parallel against one source of truth. Covers MVP endpoints (Doc 09). JSON over HTTPS. Amounts in **integer paisa** (৳1 = 100). Times ISO-8601 UTC.

---

## Conventions

- **Base URL:** `/api/v1`
- **Auth:** `Authorization: Bearer <accessToken>` (JWT, 15-min expiry); refresh via `/auth/refresh` (30-day, rotating token).
- **Content-Type:** `application/json`; file uploads use presigned S3 PUT (see Media).
- **Pagination:** cursor-based — `?limit=20&cursor=<opaque>` $\rightarrow$ `{ "data": [], "nextCursor": "..." }`.
- **Filtering/Sorting:** Query parameters; server validates against a strict whitelist.
- **Idempotency:** Mutating POST requests accept an `Idempotency-Key` header (required for checkout and webhooks).
- **Localization:** `Accept-Language: bn|en` (affects error and system messages, not database content).

### Standard Error Shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The phone field is required.",
    "fields": {
      "phone": "invalid phone number format"
    }
  }
}
```

**Common Error Codes:**

- `UNAUTHENTICATED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `VALIDATION_ERROR` (422)
- `CONFLICT` (409)
- `RATE_LIMITED` (429)
- `PAYMENT_FAILED` (402)
- `SERVER_ERROR` (500)

---

## Auth

### Request OTP

- **Endpoint:** `POST /auth/otp/request`
- **Request:**
  ```json
  {
    "phone": "01712345678"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "requestId": "otp_request_98374",
    "expiresIn": 120
  }
  ```

### Verify OTP

- **Endpoint:** `POST /auth/otp/verify`
- **Request:**
  ```json
  {
    "requestId": "otp_request_98374",
    "code": "123456",
    "name": "Ria Islam",
    "intent": "learner"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "rfr_837492...",
    "user": {
      "id": "user_7493",
      "name": "Ria Islam",
      "roles": ["learner"],
      "verified": false
    }
  }
  ```

### Token Refresh

- **Endpoint:** `POST /auth/refresh`
- **Request:** (Uses Cookie or Authorization Bearer refresh token)
- **Response (200 OK):**
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "rfr_984729..."
  }
  ```

### Logout

- **Endpoint:** `POST /auth/logout`
- **Response:** `204 No Content`

---

## Catalog (Public)

### List Courses

- **Endpoint:** `GET /courses`
- **Query Params:** `cat`, `level`, `q`, `sort` (`popular` | `rating` | `newest` | `price`), `limit`, `cursor`
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "course_102",
        "slug": "web-dev-bangla",
        "title": "Complete Web Development in Bangla",
        "titleBn": "ওয়েব ডেভেলপমেন্ট কমপ্লিট কোর্স",
        "cat": "web-dev",
        "instructor": {
          "id": "instr_204",
          "name": "Anisul Islam",
          "verified": true
        },
        "price": 149900,
        "oldPrice": 350000,
        "rating": 4.8,
        "ratingsCount": 3420,
        "students": 12400,
        "lessons": 142,
        "bestseller": true,
        "thumbUrl": "https://cdn.sobaishikhi.com/thumbs/web-dev.jpg"
      }
    ],
    "nextCursor": "eyJjdXJzb3IiOjIwfQ=="
  }
  ```

### Course Details

- **Endpoint:** `GET /courses/:slug`
- **Response (200 OK):**
  ```json
  {
    "id": "course_102",
    "slug": "web-dev-bangla",
    "title": "Complete Web Development in Bangla",
    "titleBn": "ওয়েব ডেভেলপমেন্ট কমপ্লিট কোর্স",
    "cat": "web-dev",
    "price": 149900,
    "oldPrice": 350000,
    "instructor": {
      "id": "instr_204",
      "name": "Anisul Islam",
      "verified": true,
      "bio": "10+ years teaching web technologies."
    },
    "sections": [
      {
        "id": "sec_1",
        "title": "Introduction to HTML",
        "lessons": [
          {
            "id": "les_1",
            "title": "What is HTML?",
            "type": "video",
            "duration": 480,
            "isPreview": true
          }
        ]
      }
    ],
    "reviews": {
      "rating": 4.8,
      "count": 3420,
      "recent": [
        {
          "username": "karim_dev",
          "rating": 5,
          "comment": "খুবই সুন্দরভাবে বোঝানো হয়েছে।"
        }
      ]
    }
  }
  ```
  _(Note: Lesson videoUrl is omitted unless the user is enrolled. Preview lessons return a short signed URL clip)._

### List Categories

- **Endpoint:** `GET /categories`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "web-dev",
      "name": "Web Development",
      "nameBn": "ওয়েব ডেভেলপমেন্ট",
      "icon": "code",
      "hue": 205,
      "courseCount": 24,
      "enabled": true
    }
  ]
  ```

---

## Authoring (Instructors)

### Create Draft Course

- **Endpoint:** `POST /courses`
- **Request:**
  ```json
  {
    "title": "Introduction to Robotics",
    "titleBn": "রোবোটিক্স পরিচিতি",
    "cat": "robotics",
    "level": "beginner",
    "price": 250000,
    "productionModel": "self"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "course_105",
    "title": "Introduction to Robotics",
    "status": "draft",
    "productionModel": "self",
    "createdAt": "2026-06-13T09:50:00Z"
  }
  ```

### Update Course

- **Endpoint:** `PATCH /courses/:id`
- **Request:**
  ```json
  {
    "price": 199900
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "course_105",
    "price": 199900,
    "status": "draft"
  }
  ```

### Replace Curriculum Sections

- **Endpoint:** `PUT /courses/:id/sections`
- **Request:**
  ```json
  {
    "sections": [
      {
        "title": "Getting Started",
        "lessons": [
          {
            "title": "Introduction Video",
            "type": "video",
            "duration": 300
          }
        ]
      }
    ]
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Curriculum updated successfully"
  }
  ```

### Submit Course for Review

- **Endpoint:** `POST /courses/:id/submit`
- **Response (200 OK):**
  ```json
  {
    "id": "course_105",
    "status": "under_review",
    "submittedAt": "2026-06-13T09:52:00Z"
  }
  ```
  _(Note: Server rejects model="self" with 0 lessons with 422 VALIDATION_ERROR)._

### Request Managed Production / Buy-Out

- **Endpoint:** `POST /production-requests`
- **Request:**
  ```json
  {
    "model": "managed",
    "topic": "Micro-soldering & logic board diagnostics",
    "canProvide": "I will provide logic boards and testing units. I need video production support.",
    "location": "Dhaka, Bangladesh",
    "ideaNote": "A comprehensive practical guide on repairing smartphone logic boards."
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "prod_req_8392",
    "model": "managed",
    "status": "pending_admin",
    "createdAt": "2026-06-13T09:53:00Z"
  }
  ```

---

## Enrollment & Learning (Learners)

### Course Checkout

- **Endpoint:** `POST /checkout/:courseId`
- **Headers:** `Idempotency-Key: <unique_uuid>`
- **Response (200 OK):**
  ```json
  {
    "orderId": "ord_83920",
    "amount": 149900,
    "gatewayRedirectUrl": "https://sandbox.sslcommerz.com/gwpayment/..."
  }
  ```

### Payment Webhook (Gateway to Server)

- **Endpoint:** `POST /payments/webhook`
- **Headers:** `Idempotency-Key: <transaction_id>`
- **Request:**
  ```json
  {
    "transactionId": "txn_839201",
    "orderId": "ord_83920",
    "amount": 149900,
    "status": "VALIDATED",
    "signature": "ab837f..."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "status": "success",
    "message": "Payment verified and enrollment processed."
  }
  ```

### Get Enrolled Courses

- **Endpoint:** `GET /me/learning`
- **Response (200 OK):**
  ```json
  [
    {
      "courseId": "course_102",
      "title": "Complete Web Development in Bangla",
      "progress": 35.5,
      "lastLessonId": "les_42",
      "enrolledAt": "2026-06-10T12:00:00Z"
    }
  ]
  ```

### Update Lesson Progress

- **Endpoint:** `POST /enrollments/:courseId/progress`
- **Request:**
  ```json
  {
    "lessonId": "les_1",
    "completed": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "courseId": "course_102",
    "progress": 36.2
  }
  ```

### Download Certificate

- **Endpoint:** `GET /enrollments/:courseId/certificate`
- **Response (200 OK):**
  ```json
  {
    "certificateId": "cert_39203",
    "url": "https://cdn.sobaishikhi.com/certificates/cert_39203.pdf"
  }
  ```
  _(Note: Returns 403 Forbidden if progress < 100%)._

---

## Repair Hub

### List Repair Guides

- **Endpoint:** `GET /guides`
- **Query Params:** `rcat`, `q`, `difficulty`, `limit`, `cursor`
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "guide_84",
        "slug": "iphone-13-screen-replacement",
        "title": "iPhone 13 Screen Replacement",
        "difficulty": "medium",
        "estCost": 850000,
        "estTime": "45 mins",
        "views": 12400,
        "successRate": 94
      }
    ],
    "nextCursor": "eyJjdXJzb3IiOjEwfQ=="
  }
  ```

### Get Repair Guide Details

- **Endpoint:** `GET /guides/:slug`
- **Response (200 OK):**
  ```json
  {
    "id": "guide_84",
    "slug": "iphone-13-screen-replacement",
    "title": "iPhone 13 Screen Replacement",
    "difficulty": "medium",
    "estCost": 850000,
    "estTime": "45 mins",
    "body": {
      "overview": "Detailed guide to replacing an iPhone 13 OLED screen.",
      "symptoms": ["Cracked glass", "Unresponsive touch"],
      "causes": ["Accidental drop"],
      "tools": ["Pentalobe screwdriver", "Suction cup", "Spudger"],
      "safety": ["Wear safety glasses", "Disconnect battery first"],
      "steps": [
        {
          "step": 1,
          "instruction": "Unscrew the two pentalobe screws at the bottom edge."
        }
      ],
      "mistakes": ["Prying too hard near the camera cables"],
      "prevention": "Use a screen protector to avoid future cracks."
    }
  }
  ```

### Submit New Repair Guide

- **Endpoint:** `POST /guides`
- **Request:**
  ```json
  {
    "title": "Laptop Thermal Paste Replacement",
    "rcat": "laptop",
    "difficulty": "easy",
    "estCost": 50000,
    "estTime": "20 mins",
    "body": {
      "overview": "Applying fresh thermal paste to CPU/GPU.",
      "steps": []
    }
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "guide_85",
    "status": "draft"
  }
  ```

### Submit Guide for Review

- **Endpoint:** `POST /guides/:id/submit`
- **Response (200 OK):**
  ```json
  {
    "id": "guide_85",
    "status": "under_review"
  }
  ```

### Mark Guide as Helpful

- **Endpoint:** `POST /guides/:id/helpful`
- **Request:**
  ```json
  {
    "helpful": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "guide_85",
    "successRate": 95
  }
  ```
  _(Note: Rate-limited to one vote per user per guide)._

---

## Admin (RBAC: Admin)

### List Review Tasks

- **Endpoint:** `GET /admin/review`
- **Query Params:** `type` (`course` | `guide` | `production`), `status`, `limit`, `cursor`
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "id": "task_839",
        "contentType": "course",
        "contentId": "course_105",
        "title": "Introduction to Robotics",
        "submittedBy": "user_204",
        "submittedAt": "2026-06-13T09:52:00Z",
        "status": "under_review"
      }
    ],
    "nextCursor": null
  }
  ```

### Approve Content

- **Endpoint:** `POST /admin/review/:id/approve`
- **Response (200 OK):**
  ```json
  {
    "taskId": "task_839",
    "status": "approved",
    "contentStatus": "published"
  }
  ```

### Request Content Revision

- **Endpoint:** `POST /admin/review/:id/revision`
- **Request:**
  ```json
  {
    "notes": [
      {
        "itemRef": "lesson_3_video",
        "note": "Audio volume is too low. Please re-upload with amplified audio."
      }
    ]
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "taskId": "task_839",
    "status": "revision_requested",
    "contentStatus": "revision"
  }
  ```

### Reject Content

- **Endpoint:** `POST /admin/review/:id/reject`
- **Request:**
  ```json
  {
    "reason": "Violates content guidelines (copyrighted background music)."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "taskId": "task_839",
    "status": "rejected",
    "contentStatus": "rejected"
  }
  ```

### List Orders

- **Endpoint:** `GET /admin/orders`
- **Query Params:** `from`, `to`, `type`, `status`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "ord_83920",
      "buyerId": "user_7493",
      "itemType": "course",
      "itemId": "course_102",
      "amount": 149900,
      "commission": 29980,
      "status": "paid",
      "createdAt": "2026-06-13T09:47:00Z"
    }
  ]
  ```

### Payout Management

- **Endpoint:** `GET /admin/payouts` → List payout queue.
- **Endpoint:** `POST /admin/payouts/:id/process` $\rightarrow$ marks paid.

### Update Platform Settings

- **Endpoint:** `PATCH /admin/settings`
- **Request:**
  ```json
  {
    "commissionRates": {
      "courseSelf": 20,
      "courseManaged": 55,
      "store": 10,
      "consultation": 15,
      "service": 12
    },
    "paymentMethods": {
      "bkash": true,
      "nagad": true,
      "rocket": false,
      "card": true
    },
    "homepageBanner": {
      "on": true,
      "text": "Ramadan Special Offer!",
      "discountPct": 60
    }
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "ok": true
  }
  ```

### Moderate Users

- **Endpoint:** `POST /admin/users/:id/suspend` `{ "reason": "..." }`
- **Endpoint:** `POST /admin/users/:id/ban` `{ "reason": "..." }`
- **Endpoint:** `POST /admin/users/:id/verify` (Toggles verified badge)

### Modify Course Visibility

- **Endpoint:** `POST /admin/courses/:id/feature`
- **Endpoint:** `POST /admin/courses/:id/unpublish`

---

## Media & Uploads

### Get Presigned Upload URL

- **Endpoint:** `POST /media/uploads`
- **Request:**
  ```json
  {
    "kind": "video",
    "contentType": "video/mp4"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "uploadUrl": "https://s3.amazonaws.com/sobaishikhi-media/raw/...",
    "assetId": "asset_9843a"
  }
  ```
- **Process Flow:**
  1. Client sends PUT request with file binary directly to `uploadUrl`.
  2. Server trigger transcoder worker asynchronously to convert video to HLS.
  3. Lesson status switches to `ready` upon complete conversion.

---

## Rate Limits (Defaults)

- **OTP Request:** 5 requests / phone number / hour.
- **OTP Verification:** 10 attempts / 10 minutes.
- **Write Endpoints (POST/PATCH/PUT):** 60 requests / minute / authenticated user.
- **Public Read Endpoints (GET):** 600 requests / minute / IP (CDN-cached).

---

## Versioning & Compatibility

- URI-versioned (`/v1`). Additive changes only within a version; breaking changes require version bump (e.g., `/v2`).
- Deprecations announced via `Sunset` header.
