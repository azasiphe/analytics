# 🚀 Quick Start - Testing Your Setup

## ✅ What's Already Done

Your Next.js dashboard is **fully built and ready**! Here's what you have:

- ✅ Next.js 14 with TypeScript
- ✅ All dashboard components (Meetings, Invoices, Alerts, Failures)
- ✅ Mock API routes for testing without backend
- ✅ Responsive design with Tailwind CSS
- ✅ Charts and visualizations
- ✅ Complete TypeScript types matching backend API

---

## 🧪 Step 1: Test with Mock Data (No Backend Required)

```bash
# Start the Next.js dev server
npm run dev
```

Visit: **http://localhost:3000**

You'll see the dashboard with **mock data** (works without your C# backend running).

---

## 🔌 Step 2: Connect to Your Backend API

### 1. Create Environment File

Your `.env.local` already exists! Just verify it has:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Start Your Backend

In your Orchestrator API project:

```bash
# Terminal 1
cd path/to/orchestrator-api
dotnet run
```

Your backend should start on: `http://localhost:5000`

### 3. Start Next.js Frontend

```bash
# Terminal 2 (in invoice-dashboard folder)
npm run dev
```

### 4. Test the Connection

Visit: **http://localhost:3000/test-api**

You should see:
- ✅ Connection status (success or error)
- ✅ Meeting counts with transcript stats
- ✅ Invoice breakdown (Factuurdemo + Woonzorg)
- ✅ Raw JSON response from backend

---

## 🛠️ Troubleshooting

### ❌ CORS Error?

**Already Fixed!** Your backend allows:
- `http://localhost:3000`
- `https://analytics-tau-gules.vercel.app`

If still getting CORS errors, verify in your `Program.cs`:

```csharp
app.UseCors("DashboardCORS");
```

### ❌ Connection Refused?

1. **Check backend is running:**
   ```bash
   curl http://localhost:5000/api/analytics/dashboard
   ```

2. **Check .env.local:**
   ```bash
   cat .env.local
   # Should show: NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Restart both servers**

### ❌ Data is Null?

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Check the API request:
   - Status code should be 200
   - Response should contain JSON data

---

## 📊 What You'll See

### Main Dashboard (http://localhost:3000)

**Overview Cards:**
- Total Meetings: 150
- Total Invoices: 523
- Emails Without PDF: 4
- Failed Processing: 2

**Invoice Breakdown Pie Chart:**
- Factuurdemo: 312 (59.7%) - Green
- Woonzorg: 211 (40.3%) - Blue

**Meeting Details:**
- This Week: 12
- This Month: 45
- Transcripts Available: 142 (94.7%)
- Transcripts Unavailable: 8

**Alerts:**
- Non-PDF emails count by recipient
- Recent failures with error details

---

## 🎯 Testing Checklist

- [ ] ✅ Mock data works (visit http://localhost:3000)
- [ ] ✅ Backend is running (curl http://localhost:5000/api/analytics/dashboard)
- [ ] ✅ .env.local is configured
- [ ] ✅ Test API page shows connection (http://localhost:3000/test-api)
- [ ] ✅ Main dashboard loads real data
- [ ] ✅ No CORS errors in browser console

---

## 🚀 Next Steps

### Immediate:
1. Test with mock data ✅
2. Connect to backend ✅
3. Verify all endpoints work ✅

### This Week:
4. Configure Application Insights (to see detailed emails/failures)
5. Deploy frontend to Vercel
6. Share dashboard URL with manager

### Later:
7. Add authentication (Azure AD B2C)
8. Set up auto-refresh
9. Add email alerts

---

## 📡 Available API Endpoints

All endpoints work with both **mock data** (built-in) and **real backend**:

1. **Dashboard:** `/api/analytics/dashboard`
2. **Summary:** `/api/analytics/summary?period=week`
3. **Non-PDF Emails:** `/api/analytics/emails-without-pdf?period=week`
4. **Failures:** `/api/analytics/failed-processing?period=week`

---

## 🎨 How It Works

### Using Mock Data (Default)
If backend is not accessible, Next.js uses built-in mock routes:
- `src/app/api/analytics/*` - Mock API routes
- Perfect for development and testing UI

### Using Real Backend
When `NEXT_PUBLIC_API_URL` is set and backend is running:
- Fetches data from your C# API
- Live meeting and invoice counts
- Real-time alerts and failures

---

## 💡 Pro Tips

### Quick Backend Test
```bash
# Test all endpoints at once
curl http://localhost:5000/api/analytics/dashboard | jq .
curl http://localhost:5000/api/analytics/summary?period=week | jq .
curl http://localhost:5000/api/analytics/emails-without-pdf?period=week | jq .
```

### View in Browser
Just open these URLs directly:
- http://localhost:5000/api/analytics/dashboard
- http://localhost:5000/api/analytics/summary?period=week

### Check Environment Variables
```bash
# In Next.js terminal
echo $NEXT_PUBLIC_API_URL   # Linux/Mac
echo %NEXT_PUBLIC_API_URL%  # Windows CMD
$env:NEXT_PUBLIC_API_URL    # Windows PowerShell
```

---

## 🎉 You're Ready!

Your dashboard is **production-ready**:
- ✅ Full TypeScript support
- ✅ Responsive design
- ✅ Error handling
- ✅ Mock + Real data support
- ✅ All components built
- ✅ Charts and visualizations
- ✅ Application Insights ready

**Just run `npm run dev` and visit http://localhost:3000** to see it in action!

---

**Need help?** Check:
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment options
- [backend-integration/](backend-integration/) - Backend setup
