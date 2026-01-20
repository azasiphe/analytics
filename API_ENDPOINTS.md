# Production API Endpoints Reference

## Base URL
```
Production: https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net
Development: http://localhost:5000
```

## All Available Endpoints

### 1. Dashboard Overview
**GET** `/api/Analytics/dashboard`

Returns comprehensive dashboard data including total meetings, invoices, transcripts availability, and breakdowns.

**Response:**
```json
{
  "generatedAt": "2026-01-20 14:30:00 UTC",
  "timestamp": "2026-01-20T14:30:00.000Z",
  "meetings": {
    "total": 150,
    "thisWeek": 12,
    "thisMonth": 45,
    "transcripts": {
      "available": 142,
      "unavailable": 8,
      "percentage": 94.7
    }
  },
  "invoices": {
    "total": 523,
    "allTime": {
      "factuurdemo": 312,
      "woonzorg": 211,
      "total": 523
    },
    "breakdown": [
      {
        "name": "Factuurdemo",
        "email": "factuurdemo@databalk.nu",
        "count": 312,
        "color": "#4CAF50"
      },
      {
        "name": "Woonzorg",
        "email": "woonzorgfactuur@databalk.nu",
        "count": 211,
        "color": "#2196F3"
      }
    ]
  }
}
```

---

### 2. Summary Stats
**GET** `/api/Analytics/summary?period={period}`

Returns aggregated meeting and invoice counts for the period.

**Query Parameters:**
- `period` (optional): `week` or `month` (default: `month`)

**Response:**
```json
{
  "period": "week",
  "from": "2026-01-13",
  "to": "2026-01-20",
  "generatedAt": "2026-01-20 14:30:00",
  "meetings": {
    "count": 12
  },
  "invoices": {
    "total": 523,
    "breakdown": {
      "factuurdemo": {
        "name": "Factuurdemo",
        "count": 312,
        "email": "factuurdemo@databalk.nu"
      },
      "woonzorg": {
        "name": "Woonzorg",
        "count": 211,
        "email": "woonzorgfactuur@databalk.nu"
      }
    }
  }
}
```

---

### 3. Meeting Count
**GET** `/api/Analytics/meetings/count?from={date}&to={date}`

Returns the count of meetings within a date range.

**Query Parameters:**
- `from` (optional): Start date in `YYYY-MM-DD` format
- `to` (optional): End date in `YYYY-MM-DD` format

**Example:**
```
GET /api/Analytics/meetings/count?from=2026-01-01&to=2026-01-20
```

**Response:**
```json
{
  "count": 45
}
```

---

### 4. Invoice Count
**GET** `/api/Analytics/invoices/count?from={date}&to={date}&recipient={email}`

Returns the count of invoices for a specific recipient or all recipients.

**Query Parameters:**
- `from` (optional): Start date in `YYYY-MM-DD` format
- `to` (optional): End date in `YYYY-MM-DD` format
- `recipient` (optional): 
  - `factuurdemo@databalk.nu`
  - `woonzorgfactuur@databalk.nu`
  - `all` (default)

**Examples:**
```
GET /api/Analytics/invoices/count?recipient=all
GET /api/Analytics/invoices/count?from=2026-01-01&to=2026-01-20&recipient=factuurdemo@databalk.nu
```

**Response:**
```json
{
  "count": 523
}
```

---

### 5. Emails Without PDF
**GET** `/api/Analytics/emails-without-pdf?period={period}`

Returns count and list of emails received without PDF attachments.

**Query Parameters:**
- `period` (optional): `week` or `month` (default: `week`)

**Response:**
```json
{
  "period": "week",
  "from": "2026-01-13",
  "to": "2026-01-20",
  "generatedAt": "2026-01-20 14:30:00",
  "stats": {
    "factuurdemo": 3,
    "woonzorg": 1,
    "total": 4
  },
  "recentEmails": [
    {
      "msgId": "msg-12345",
      "from": "sender@example.com",
      "to": "factuurdemo@databalk.nu",
      "subject": "Invoice inquiry",
      "receivedAt": "2026-01-19T10:30:00Z",
      "attachmentCount": 1,
      "hasPdfAttachment": false
    }
  ],
  "note": "Configure Application Insights to see detailed email list"
}
```

---

### 6. Failed Processing
**GET** `/api/Analytics/failed-processing?period={period}`

Returns count and details of invoice processing failures.

**Query Parameters:**
- `period` (optional): `week` or `month` (default: `week`)

**Response:**
```json
{
  "period": "week",
  "from": "2026-01-13",
  "to": "2026-01-20",
  "generatedAt": "2026-01-20 14:30:00",
  "stats": {
    "extraction": 1,
    "reasoning": 1,
    "total": 2
  },
  "recentFailures": [
    {
      "msgId": "msg-err-001",
      "recipientType": "Factuurdemo",
      "failedAt": "2026-01-19T11:45:00Z",
      "failureType": "Extraction",
      "error": "Invalid PDF format"
    }
  ],
  "note": "Configure Application Insights to see detailed failure list"
}
```

---

## Usage in Frontend

### TypeScript Client (Already Configured)

```typescript
import { 
  fetchDashboardData, 
  fetchEmailsWithoutPDF,
  fetchFailedProcessing,
  fetchMeetingCount,
  fetchInvoiceCount
} from '@/lib/api';

// Get dashboard data
const dashboard = await fetchDashboardData();

// Get non-PDF emails for last week
const noPdfEmails = await fetchEmailsWithoutPDF('week');

// Get processing failures
const failures = await fetchFailedProcessing('month');

// Get meeting count for date range
const meetingCount = await fetchMeetingCount('2026-01-01', '2026-01-20');

// Get invoice count for specific recipient
const invoiceCount = await fetchInvoiceCount('2026-01-01', '2026-01-20', 'factuurdemo@databalk.nu');
```

---

## Testing Endpoints

### Using Browser
Simply visit these URLs in your browser:

```
https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/dashboard
https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/summary?period=week
https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/meetings/count
```

### Using cURL
```bash
# Dashboard
curl https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/dashboard

# Summary for this week
curl "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/summary?period=week"

# Meeting count with date range
curl "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/meetings/count?from=2026-01-01&to=2026-01-20"

# Invoice count for Factuurdemo
curl "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/invoices/count?recipient=factuurdemo@databalk.nu"
```

### Using PowerShell
```powershell
# Dashboard
Invoke-RestMethod https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/dashboard | ConvertTo-Json

# Meeting count
Invoke-RestMethod "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/meetings/count?from=2026-01-01&to=2026-01-20"

# Invoice count
Invoke-RestMethod "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/invoices/count?recipient=all"
```

---

## Dashboard Test Page

Visit the built-in test page to verify all endpoints:

**Local:** http://localhost:3000/test-api  
**Production:** https://your-dashboard.vercel.app/test-api

This page will:
- ✅ Test connection to backend
- ✅ Display all endpoint responses
- ✅ Show troubleshooting tips
- ✅ Provide quick stats overview

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (development)
- `https://analytics-tau-gules.vercel.app` (production)

If deploying to a different domain, update the CORS policy in your backend `Program.cs`.

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200 OK` - Success
- `400 Bad Request` - Invalid parameters
- `404 Not Found` - Endpoint not found
- `500 Internal Server Error` - Server error

Error response format:
```json
{
  "error": "Error message description",
  "details": "Additional error details"
}
```

---

## Rate Limiting

No rate limiting currently configured. Consider adding rate limiting in production for:
- Public-facing dashboards
- High-traffic scenarios
- API abuse prevention

---

**Last Updated:** January 20, 2026  
**API Version:** 1.0  
**Backend:** Azure App Service  
**Status:** ✅ Production Ready
