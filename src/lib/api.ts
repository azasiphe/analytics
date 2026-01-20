import { 
  DashboardData, 
  NonPDFStats, 
  FailureStats,
  SummaryStats
} from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fetch main dashboard data
export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${API_URL}/api/Analytics/dashboard`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch emails without PDF attachments
export async function fetchEmailsWithoutPDF(period: 'week' | 'month' = 'week'): Promise<NonPDFStats> {
  const response = await fetch(`${API_URL}/api/Analytics/emails-without-pdf?period=${period}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch non-PDF emails: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch failed processing data
export async function fetchFailedProcessing(period: 'week' | 'month' = 'week'): Promise<FailureStats> {
  const response = await fetch(`${API_URL}/api/Analytics/failed-processing?period=${period}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch failures: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch summary statistics
export async function fetchSummary(period: 'week' | 'month' = 'week'): Promise<SummaryStats> {
  const response = await fetch(`${API_URL}/api/Analytics/summary?period=${period}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch summary: ${response.statusText}`);
  }
  
  return response.json();
}

// Additional API functions for new endpoints

// Fetch meeting count for a date range
export async function fetchMeetingCount(from?: string, to?: string): Promise<{ count: number }> {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  
  const response = await fetch(`${API_URL}/api/Analytics/meetings/count?${params}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch meeting count: ${response.statusText}`);
  }
  
  return response.json();
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
  
  const response = await fetch(`${API_URL}/api/Analytics/invoices/count?${params}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch invoice count: ${response.statusText}`);
  }
  
  return response.json();
}
