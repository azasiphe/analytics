import { 
  DashboardData, 
  NonPDFStats, 
  FailureStats 
} from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${API_URL}/api/analytics/dashboard`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchEmailsWithoutPDF(period: 'week' | 'month' = 'week'): Promise<NonPDFStats> {
  const response = await fetch(`${API_URL}/api/analytics/emails-without-pdf?period=${period}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch non-PDF emails: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchFailedProcessing(period: 'week' | 'month' = 'week'): Promise<FailureStats> {
  const response = await fetch(`${API_URL}/api/analytics/failed-processing?period=${period}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch failures: ${response.statusText}`);
  }
  
  return response.json();
}
