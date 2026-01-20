import { 
  DashboardData, 
  NonPDFStats, 
  FailureStats,
  SummaryStats
} from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper to build absolute URL for server-side rendering
function getAbsoluteUrl(path: string): string {
  // In browser, relative URLs work fine
  if (typeof window !== 'undefined') {
    return path;
  }
  
  // On server, need absolute URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}${path}`;
}

// Helper function to try production API first, fall back to mock data
async function fetchWithFallback<T>(url: string, mockUrl: string): Promise<T> {
  // If no API_URL configured, use mock data
  if (!API_URL) {
    const absoluteMockUrl = getAbsoluteUrl(mockUrl);
    const response = await fetch(absoluteMockUrl);
    return response.json();
  }

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // Fall back to mock data if production API fails (silent fallback)
    const absoluteMockUrl = getAbsoluteUrl(mockUrl);
    const response = await fetch(absoluteMockUrl);
    return response.json();
  }
}

// Fetch main dashboard data
export async function fetchDashboardData(): Promise<DashboardData> {
  return fetchWithFallback<DashboardData>(
    `${API_URL}/api/Analytics/dashboard`,
    '/api/analytics/dashboard'
  );
}

// Fetch emails without PDF attachments
export async function fetchEmailsWithoutPDF(period: 'week' | 'month' = 'week'): Promise<NonPDFStats> {
  return fetchWithFallback<NonPDFStats>(
    `${API_URL}/api/Analytics/emails-without-pdf?period=${period}`,
    `/api/analytics/emails-without-pdf?period=${period}`
  );
}

// Fetch failed processing data
export async function fetchFailedProcessing(period: 'week' | 'month' = 'week'): Promise<FailureStats> {
  return fetchWithFallback<FailureStats>(
    `${API_URL}/api/Analytics/failed-processing?period=${period}`,
    `/api/analytics/failed-processing?period=${period}`
  );
}

// Fetch summary statistics
export async function fetchSummary(period: 'week' | 'month' = 'week'): Promise<SummaryStats> {
  return fetchWithFallback<SummaryStats>(
    `${API_URL}/api/Analytics/summary?period=${period}`,
    `/api/analytics/summary?period=${period}`
  );
}

// Additional API functions for new endpoints

// Fetch meeting count for a date range
export async function fetchMeetingCount(from?: string, to?: string): Promise<{ count: number }> {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  
  return fetchWithFallback<{ count: number }>(
    `${API_URL}/api/Analytics/meetings/count?${params}`,
    `/api/analytics/summary` // Mock endpoint returns meeting stats
  ).then(data => ({ count: (data as any).meetingStats?.total || 0 }));
}

// Fetch invoice count for a date range and recipient
export async function fetchInvoiceCount(
  from?: string, 
  to?: string, 
  recipient: 'factuurdemo@databalk.nu' | 'woonzorgfactuur@databalk.nu' | 'all' = 'all'
): Promise<{ count: number }> {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  params.append('recipient', recipient);
  
  return fetchWithFallback<{ count: number }>(
    `${API_URL}/api/Analytics/invoices/count?${params}`,
    `/api/analytics/summary` // Mock endpoint returns invoice stats
  ).then(data => ({ count: (data as any).invoiceStats?.total || 0 }));
}
