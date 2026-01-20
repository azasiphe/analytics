import { Suspense } from 'react';
import DashboardTabs from '@/components/DashboardTabs';
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

    return (
      <DashboardTabs 
        dashboardData={dashboardData}
        noPdfData={noPdfData}
        failureData={failureData}
      />
    );
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium mb-2">Failed to load dashboard data</p>
        <p className="text-sm text-red-500">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
        <p className="text-sm text-gray-600 mt-4">
          Make sure your backend API is running at: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Using mock data? Endpoints are available at /api/analytics/*
        </p>
      </div>
    );
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 h-64 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orchestration Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitoring Factuurdemo & Woonzorg invoices
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="/stats" 
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                📊 View All Stats
              </a>
              <RefreshButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()} | Auto-refresh: Every 5 minutes
          </p>
        </div>
      </footer>
    </div>
  );
}

