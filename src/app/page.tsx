import { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import KPICards from '@/components/KPICards';
import NavBar from '@/components/NavBar';
import ChartSection from '@/components/ChartSection';
import RefreshButton from '@/components/RefreshButton';
import { fetchDashboardData, fetchEmailsWithoutPDF, fetchFailedProcessing } from '@/lib/api';

async function DashboardContent() {
  try {
    // Fetch all data in parallel
    const [dashboardData, noPdfData, failureData] = await Promise.all([
      fetchDashboardData(),
      fetchEmailsWithoutPDF('week'),
      fetchFailedProcessing('week'),
    ]);

    const noPdfCount = noPdfData.recentEmails.length;
    const failureCount = failureData.recentFailures.length;

    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <KPICards 
          dashboardData={dashboardData}
          noPdfCount={noPdfCount}
          failureCount={failureCount}
        />

        {/* Navigation Bar - Meetings & Invoices */}
        <NavBar 
          dashboardData={dashboardData}
          noPdfData={noPdfData}
          failureData={failureData}
        />

        {/* Charts Section */}
        <ChartSection 
          dashboardData={dashboardData}
          noPdfData={noPdfData}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-red-950/50 border border-red-800 rounded-lg p-6 text-center backdrop-blur-sm">
        <p className="text-red-300 font-medium mb-2">Failed to load dashboard data</p>
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
        <p className="text-sm text-purple-300 mt-4">
          Make sure your backend API is running at: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}
        </p>
        <p className="text-xs text-purple-400 mt-2">
          Using mock data? Endpoints are available at /api/analytics/*
        </p>
      </div>
    );
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-purple-900/50 border border-purple-800 rounded-lg p-6 animate-pulse backdrop-blur-sm">
            <div className="h-4 bg-purple-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-purple-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-purple-900/50 border border-purple-800 rounded-lg h-48 animate-pulse backdrop-blur-sm"></div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-950 via-purple-900 to-purple-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="ml-64 mt-20 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-purple-300 text-sm mt-1">
              Real-time monitoring of meetings and invoices
            </p>
          </div>
          <div className="flex gap-3">
            <a 
              href="/stats" 
              className="px-4 py-2 bg-purple-800/50 hover:bg-purple-700 border border-purple-700 text-purple-200 rounded-lg transition-colors text-sm font-medium"
            >
              📊 View All Stats
            </a>
            <RefreshButton />
          </div>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>
    </div>
  );
}

