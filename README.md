# Invoice Processing Dashboard

A comprehensive Next.js dashboard for monitoring invoice processing, tracking emails without PDFs, and analyzing processing failures for Factuurdemo and Woonzorg systems.

![Dashboard](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwindcss)

## 🎯 Features

### ✅ Implemented
- **Real-time dashboard** with key metrics
- **Total invoice tracking** (Factuurdemo + Woonzorg)
- **Emails without PDF detection** (critical alerts)
- **Failed processing monitoring** (extraction & reasoning failures)
- **Meeting statistics tracking**
- **Recipient breakdown** with visual charts
- **Auto-refresh** capability
- **Responsive design** for all devices
- **Error handling** with fallback UI

### 📊 Dashboard Sections

1. **Overview Cards**
   - Total Meetings
   - Total Invoices
   - Emails Without PDF (alerts)
   - Failed Processing count

2. **Invoice Breakdown**
   - Pie chart visualization
   - Percentage distribution
   - Email addresses per recipient

3. **Non-PDF Email Alerts** ⭐
   - Weekly/Monthly statistics
   - Recent emails list (last 10)
   - Direct link to Application Insights

4. **Processing Failures**
   - Extraction failures
   - Reasoning failures
   - Error details and timestamps

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Backend API running (see Backend Integration)

### Installation

```bash
# Install dependencies
npm install

# Configure environment
# Create .env.local file and add:
NEXT_PUBLIC_API_URL=http://localhost:5000

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## ⚙️ Configuration

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend API Endpoints

The dashboard requires these endpoints from your C# backend:

- `GET /api/analytics/dashboard` - Main dashboard data
- `GET /api/analytics/emails-without-pdf?period=week|month` - Non-PDF emails
- `GET /api/analytics/failed-processing?period=week|month` - Processing failures

## 🔌 Backend Integration

### Step 1: Add Analytics Controller

Copy `backend-integration/AnalyticsController.cs` to your Orchestrator project:

```
YourProject/Controllers/AnalyticsController.cs
```

### Step 2: Enable CORS

Add to your `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("DashboardCORS", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("DashboardCORS");
```

### Step 3: Configure Application Insights

See `backend-integration/ApplicationInsightsQueries.md` for detailed Kusto queries and setup.

## 🏗️ Project Structure

```
invoice-dashboard/
├── src/
│   ├── app/
│   │   ├── api/analytics/      # Mock API routes
│   │   ├── page.tsx            # Main dashboard
│   │   └── layout.tsx
│   ├── components/
│   │   ├── DashboardOverview.tsx
│   │   ├── InvoiceBreakdown.tsx
│   │   ├── NoPdfAlerts.tsx
│   │   ├── FailuresList.tsx
│   │   ├── RefreshButton.tsx
│   │   └── StatCard.tsx
│   ├── lib/
│   │   └── api.ts              # API client
│   └── types/
│       └── dashboard.ts        # TypeScript types
├── backend-integration/
│   ├── AnalyticsController.cs
│   ├── Program.cs.snippet
│   └── ApplicationInsightsQueries.md
└── README.md
```

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions:

- **Vercel** (Recommended - easiest)
- **Azure Static Web Apps**
- **Docker + Azure Container Apps**
- **Azure App Service**

Quick deploy with Vercel:

```bash
npm i -g vercel
vercel
```

## 🔧 Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
```

## 📈 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date Utils:** date-fns

## 🐛 Troubleshooting

### "Failed to fetch dashboard data"

- Ensure backend API is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend

### CORS error

- Add your frontend URL to CORS policy in `Program.cs`
- Restart backend server

### No data showing

- Check Application Insights connection
- Verify telemetry is being tracked
- Test Kusto queries in Azure Portal

## 📝 Features Roadmap

- [ ] Authentication (Azure AD B2C)
- [ ] Email notifications for failures
- [ ] Export to Excel/CSV
- [ ] Historical trends charts
- [ ] Search and filter
- [ ] Dark mode
- [ ] Real-time updates via WebSocket

## 📄 License

Proprietary - Internal use only

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
