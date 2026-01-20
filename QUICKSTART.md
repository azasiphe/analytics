# Quick Start Guide

## Getting Started (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Backend URL

```bash
# Copy example environment file
copy .env.example .env.local

# Edit .env.local and set your backend URL:
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## Using Mock Data (No Backend Required)

The dashboard includes mock API routes for testing without a backend.

**Mock endpoints are automatically used when:**
- `NEXT_PUBLIC_API_URL` is not set, OR
- Backend is not accessible

**Location:** `src/app/api/analytics/`

---

## Connecting to Real Backend

### Prerequisites

1. **Backend API running** (C# Orchestrator)
2. **Application Insights configured**
3. **CORS enabled** for http://localhost:3000

### Steps

1. **Update `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. **Enable CORS in backend** (Program.cs):
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

3. **Add Analytics Controller:**
   - Copy `backend-integration/AnalyticsController.cs`
   - Add to your Controllers folder
   - Restart backend

4. **Test connection:**
   ```bash
   curl http://localhost:5000/api/analytics/dashboard
   ```

5. **Refresh dashboard** in browser

---

## First Time Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Run `npm install`
- [ ] Create `.env.local` file
- [ ] Set `NEXT_PUBLIC_API_URL`
- [ ] Backend API running (optional for testing)
- [ ] CORS configured in backend
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production Build
npm run build            # Build for production
npm start                # Start production server

# Testing
npm run lint             # Check code quality

# Deployment
vercel                   # Deploy to Vercel
```

---

## Testing Without Backend

The dashboard works standalone with mock data:

1. Don't set `NEXT_PUBLIC_API_URL` (or set to invalid URL)
2. Mock API routes in `src/app/api/analytics/` serve data
3. Useful for:
   - Frontend development
   - UI/UX testing
   - Demos and presentations

---

## Verifying Setup

### Check Frontend is Running

```bash
# Should show dashboard
curl http://localhost:3000
```

### Check Backend Connection

Open browser console (F12) and look for:
- ✅ No CORS errors
- ✅ Successful API calls
- ❌ "Failed to fetch" = backend not accessible

---

## Next Steps

1. **Customize colors** - Edit recipient colors in mock API
2. **Add real data** - Connect to Application Insights
3. **Deploy** - See DEPLOYMENT.md
4. **Authentication** - Add Azure AD B2C (optional)

---

## Need Help?

- **CORS errors?** → Check backend CORS policy
- **Connection refused?** → Ensure backend is running on correct port
- **No data showing?** → Verify Application Insights queries
- **Build errors?** → Try `rm -rf node_modules .next && npm install`

---

## File Structure Overview

```
📁 src/
  📁 app/
    📁 api/analytics/         ← Mock API endpoints
    📄 page.tsx               ← Main dashboard page
  📁 components/              ← UI components
  📁 lib/
    📄 api.ts                 ← API client functions
  📁 types/
    📄 dashboard.ts           ← TypeScript types

📁 backend-integration/       ← C# backend code
📄 .env.local                 ← Your config (create this!)
📄 README.md                  ← Full documentation
📄 DEPLOYMENT.md              ← Deployment guide
```

---

**Estimated setup time:** 5-10 minutes  
**Difficulty:** Beginner-friendly 🟢
