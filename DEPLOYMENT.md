# Deployment Guide

## Overview

This guide covers multiple deployment strategies for the Invoice Processing Dashboard.

## Prerequisites

- Node.js 18+ installed
- Backend API deployed and accessible
- Application Insights configured
- (Optional) Domain name for production

---

## 🚀 Option 1: Vercel (RECOMMENDED - Easiest)

### Why Vercel?
- ✅ Built for Next.js (zero-config)
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Free tier available
- ✅ Auto-deploy from Git

### Steps:

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: invoice-dashboard
# - Directory: ./
# - Override settings: No
```

#### 4. Set Environment Variables

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-api.azurewebsites.net`

#### 5. Redeploy
```bash
vercel --prod
```

#### 6. Custom Domain (Optional)
```bash
vercel domains add yourdomain.com
```

### Automatic Deployments

Connect to GitHub:
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Every push to `main` = automatic deployment

---

## ☁️ Option 2: Azure Static Web Apps

### Why Azure Static Web Apps?
- ✅ Native Azure integration
- ✅ Free tier with custom domains
- ✅ Built-in authentication
- ✅ Global CDN
- ✅ CI/CD from GitHub

### Steps:

#### 1. Install Azure CLI
```bash
# Windows
winget install Microsoft.AzureCLI

# Or download from: https://aka.ms/installazurecliwindows
```

#### 2. Login to Azure
```bash
az login
```

#### 3. Create Static Web App
```bash
az staticwebapp create \
  --name invoice-dashboard \
  --resource-group your-resource-group \
  --location westeurope \
  --sku Free \
  --app-location "/" \
  --output-location ".next"
```

#### 4. Configure Build

Create `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Build And Deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: ".next"
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
```

#### 5. Set Environment Variables

```bash
az staticwebapp appsettings set \
  --name invoice-dashboard \
  --setting-names NEXT_PUBLIC_API_URL="https://your-backend-api.azurewebsites.net"
```

#### 6. Configure Custom Domain

```bash
az staticwebapp hostname set \
  --name invoice-dashboard \
  --hostname dashboard.yourdomain.com
```

---

## 🐳 Option 3: Docker + Azure Container Apps

### Why Docker?
- ✅ Full control over environment
- ✅ Portable across platforms
- ✅ Easy scaling
- ✅ Works with any cloud provider

### Steps:

#### 1. Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### 2. Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

#### 3. Build Docker Image

```bash
docker build -t invoice-dashboard:latest .
```

#### 4. Test Locally

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000 \
  invoice-dashboard:latest
```

#### 5. Deploy to Azure Container Apps

```bash
# Create Azure Container Registry
az acr create \
  --name youracr \
  --resource-group your-rg \
  --sku Basic \
  --admin-enabled true

# Login to ACR
az acr login --name youracr

# Tag image
docker tag invoice-dashboard:latest youracr.azurecr.io/invoice-dashboard:latest

# Push image
docker push youracr.azurecr.io/invoice-dashboard:latest

# Create Container App
az containerapp create \
  --name invoice-dashboard \
  --resource-group your-rg \
  --environment your-env \
  --image youracr.azurecr.io/invoice-dashboard:latest \
  --target-port 3000 \
  --ingress external \
  --registry-server youracr.azurecr.io \
  --env-vars NEXT_PUBLIC_API_URL=https://your-backend-api.azurewebsites.net
```

---

## 🖥️ Option 4: Azure App Service

### Why App Service?
- ✅ Managed platform
- ✅ Auto-scaling
- ✅ Easy SSL setup
- ✅ Deployment slots

### Steps:

#### 1. Create App Service

```bash
# Create App Service Plan
az appservice plan create \
  --name invoice-dashboard-plan \
  --resource-group your-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --name invoice-dashboard \
  --resource-group your-rg \
  --plan invoice-dashboard-plan \
  --runtime "NODE|18-lts"
```

#### 2. Configure Deployment

```bash
# Set up deployment from GitHub
az webapp deployment source config \
  --name invoice-dashboard \
  --resource-group your-rg \
  --repo-url https://github.com/yourusername/invoice-dashboard \
  --branch main \
  --manual-integration
```

#### 3. Set Environment Variables

```bash
az webapp config appsettings set \
  --name invoice-dashboard \
  --resource-group your-rg \
  --settings \
    NEXT_PUBLIC_API_URL="https://your-backend-api.azurewebsites.net" \
    WEBSITE_NODE_DEFAULT_VERSION="18-lts"
```

#### 4. Configure Build

Create `package.json` script:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

---

## 🌐 Option 5: Traditional Web Hosting (Netlify, GitHub Pages, etc.)

### Static Export Only (Limited functionality)

#### 1. Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

#### 2. Build Static Files

```bash
npm run build
```

#### 3. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

#### 4. Deploy to GitHub Pages

```bash
# Add to package.json
"scripts": {
  "deploy": "next build && next export && gh-pages -d out"
}

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

---

## 🔧 Post-Deployment Configuration

### 1. Update Backend CORS

Add your deployed URL to CORS policy:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("DashboardCORS", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://invoice-dashboard.vercel.app",  // Add this
            "https://yourdomain.com"  // Add this
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
```

### 2. Configure SSL/HTTPS

Most platforms (Vercel, Azure) auto-configure SSL. For custom domains:

```bash
# Azure App Service
az webapp config ssl bind \
  --name invoice-dashboard \
  --resource-group your-rg \
  --certificate-thumbprint YOUR_CERT_THUMBPRINT \
  --ssl-type SNI
```

### 3. Set Up Custom Domain

#### Vercel:
```bash
vercel domains add dashboard.yourdomain.com
```

#### Azure:
```bash
az webapp config hostname add \
  --webapp-name invoice-dashboard \
  --resource-group your-rg \
  --hostname dashboard.yourdomain.com
```

### 4. Enable Application Insights (Optional)

Add to your deployment:

```bash
# Azure
az webapp config appsettings set \
  --name invoice-dashboard \
  --resource-group your-rg \
  --settings \
    NEXT_PUBLIC_APP_INSIGHTS_CONNECTION_STRING="InstrumentationKey=..."
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Dashboard

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📊 Monitoring

### Health Check Endpoint

Add to `src/app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}
```

### Uptime Monitoring

Use Azure Monitor, Pingdom, or UptimeRobot to monitor:
- `https://yourdomain.com/api/health`

---

## 🔐 Security Checklist

- [ ] Enable HTTPS only
- [ ] Configure CSP headers
- [ ] Add authentication
- [ ] Set up rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for specific domains
- [ ] Regular security updates
- [ ] Monitor access logs

---

## 📈 Performance Optimization

### 1. Enable Caching

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=120' }
        ],
      },
    ]
  },
}
```

### 2. Use CDN

All recommended platforms (Vercel, Azure Static Web Apps) include CDN by default.

### 3. Image Optimization

Next.js automatically optimizes images. Ensure you're using the `<Image>` component.

---

## 🎯 Recommended Setup

**For Your Use Case:**

1. **Frontend:** Vercel (easiest, free tier)
2. **Backend:** Azure App Service (already running)
3. **Database:** Azure Cosmos DB / SQL (existing)
4. **Monitoring:** Application Insights (existing)

**Total Setup Time:** ~15 minutes

---

## 🆘 Troubleshooting

### Build fails on deployment

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try build locally first
npm run build
```

### Environment variables not working

- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Redeploy after changing environment variables
- Check variable names match exactly

### API calls failing

- Verify CORS is configured correctly
- Check API URL is accessible from deployment
- Test API endpoints directly with curl

---

**Recommendation:** Start with **Vercel** for quick setup, then migrate to **Azure Static Web Apps** for full Azure integration if needed.
