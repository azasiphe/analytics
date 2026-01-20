# Troubleshooting Guide

## Backend API 502 Error

### Problem
The production API at `https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net` is returning a 502 Gateway Error.

### Likely Causes

1. **Azure App Service Not Running**
   - The app service might be stopped or in a stopped state
   - Check: Azure Portal → App Services → orchestration-* → Overview → Status

2. **Application Startup Failure**
   - The backend application might be crashing on startup
   - Check Application Insights logs for errors
   - Check App Service logs: Azure Portal → App Services → Monitoring → Log Stream

3. **Configuration Issues**
   - Missing environment variables
   - Database connection issues
   - Missing dependencies

4. **CORS Configuration**
   - Backend might not have CORS enabled for your frontend domain
   - Check: Ensure `http://localhost:3000` and your Vercel domain are allowed

### Diagnostic Steps

#### 1. Check App Service Status
```bash
# Using Azure CLI
az webapp show --name orchestration-a2cvdtbfbyc4fage --resource-group <your-resource-group> --query "state"
```

#### 2. Check Application Logs
```bash
# Stream logs in real-time
az webapp log tail --name orchestration-a2cvdtbfbyc4fage --resource-group <your-resource-group>
```

#### 3. Test Backend Directly
```powershell
# Test dashboard endpoint
Invoke-RestMethod -Uri "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/dashboard" -Method GET

# Test with verbose output
Invoke-WebRequest -Uri "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/api/Analytics/dashboard" -Method GET -Verbose
```

#### 4. Check App Service Configuration
In Azure Portal:
- Navigate to App Services → orchestration-*
- Check Configuration → Application Settings
- Verify all required environment variables are set
- Check Connection Strings (if using database)

#### 5. Restart App Service
```bash
# Using Azure CLI
az webapp restart --name orchestration-a2cvdtbfbyc4fage --resource-group <your-resource-group>
```

Or in Azure Portal:
- App Services → orchestration-* → Overview → Restart

### Quick Fixes

#### Option 1: Use Mock Data (Development)
The dashboard automatically falls back to mock data when the backend is unavailable. You can continue development with the mock API routes at `/api/analytics/*`.

#### Option 2: Run Backend Locally
If you have the C# orchestrator source code:
```bash
cd <backend-directory>
dotnet run
```

Then update `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Option 3: Check Backend Health Endpoint
Some Azure App Services have a health check endpoint:
```powershell
Invoke-RestMethod -Uri "https://orchestration-a2cvdtbfbyc4fage.westeurope-01.azurewebsites.net/health"
```

### Common Solutions

#### Application Not Starting
1. Check App Service Plan tier - ensure it's not in Free tier if using certain features
2. Verify deployment was successful
3. Check for missing NuGet packages or dependencies
4. Review Application Insights for startup exceptions

#### CORS Issues
Update backend to include your frontend domains:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://your-vercel-domain.vercel.app"
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
```

#### Database Connection Issues
Check connection string in App Service Configuration:
- Ensure SQL Server firewall allows Azure services
- Verify connection string format is correct
- Check database server is running

### Testing Checklist

- [ ] App Service status is "Running" in Azure Portal
- [ ] Recent deployments show as successful
- [ ] Application Insights shows recent requests (or errors)
- [ ] Health endpoint responds (if available)
- [ ] CORS headers are properly configured
- [ ] All environment variables are set
- [ ] Database connection is working (if applicable)
- [ ] No errors in Application Insights or App Service logs

### Next Steps

1. **Access Azure Portal**
   - Navigate to the App Service
   - Check the Overview page for status
   - Review recent errors in Monitoring section

2. **Check Deployment**
   - Verify latest deployment succeeded
   - Review deployment logs
   - Check if application started after deployment

3. **Review Application Insights**
   - Look for exceptions during startup
   - Check for dependency failures (database, external services)
   - Review request traces for error details

4. **Contact Backend Team**
   If the backend is managed by another team, provide:
   - Exact error message (502 Gateway Error)
   - Timestamp of when error occurred
   - Request details (endpoint, method)
   - Expected behavior vs actual behavior

### Frontend Development Without Backend

While the backend is being fixed, you can:

1. **Use Mock API Routes**
   - Available at `/api/analytics/*`
   - Return realistic test data
   - Allow UI development to continue

2. **Test UI Components**
   - All components work with mock data
   - Test user interactions
   - Refine styling and layout

3. **Deploy Frontend**
   - Deploy to Vercel for stakeholder review
   - Mock data will be used automatically
   - Update API URL once backend is fixed

## Other Common Issues

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Type Errors

```bash
# Regenerate TypeScript types
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
# Then restart
npm run dev
```

### Environment Variables Not Loading

1. Restart dev server after changing `.env.local`
2. Ensure variable names start with `NEXT_PUBLIC_` for client-side access
3. Check for typos in variable names

## Need More Help?

1. Check [Next.js Documentation](https://nextjs.org/docs)
2. Review [Azure App Service Troubleshooting](https://learn.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs)
3. Consult [Application Insights Documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
