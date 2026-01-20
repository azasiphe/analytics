import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || 'week';

  const now = new Date();
  const fromDate = new Date(now);
  fromDate.setDate(fromDate.getDate() - (period === 'week' ? 7 : 30));

  // Mock data matching backend API structure
  const mockData = {
    period: period as 'week' | 'month',
    from: fromDate.toISOString().split('T')[0],
    to: now.toISOString().split('T')[0],
    generatedAt: now.toISOString().replace('T', ' ').substring(0, 19),
    stats: {
      extraction: period === 'week' ? 1 : 3,
      reasoning: period === 'week' ? 1 : 2,
      total: period === 'week' ? 2 : 5,
    },
    recentFailures: [],
    note: 'Configure Application Insights to see real data. Query: customEvents | where name == \'InvoiceProcessingFailed\''
  };

  return NextResponse.json(mockData);
}
