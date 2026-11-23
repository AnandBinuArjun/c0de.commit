# API Specification — CODE.COMMIT

## 1. `POST /api/contact`
Processes a new project or security engagement enquiry (`Initialize Project`).

### Request Headers
- `Content-Type: application/json`

### Request Body
```json
{
  "fullName": "Alex Mercer",
  "workEmail": "alex@example.org",
  "organisation": "Example Systems Ltd",
  "serviceCategory": "penetration-testing",
  "projectDescription": "We need an authorised external and web application penetration test for our SaaS control plane prior to Q2 release.",
  "preferredTimeline": "2-4-weeks",
  "consentAccepted": true,
  "websiteUrl": ""
}
```

### Responses
- **`201 Created`**:
  ```json
  {
    "success": true,
    "referenceCode": "CC-2026-8F4A",
    "message": "Project enquiry initialized and logged securely."
  }
  ```
- **`400 Bad Request`**: Validation failure or prohibited secret pattern detected in description.
- **`429 Too Many Requests`**: Rate limit exceeded for client window.

## 2. `GET /api/health`
Returns service readiness and security header status.
