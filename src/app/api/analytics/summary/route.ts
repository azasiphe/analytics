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
    meetings: {
      count: period === 'week' ? 12 : 45
    },
    invoices: {
      total: 523,
      breakdown: {
        factuurdemo: {
          name: 'Factuurdemo',
          count: 312,
          email: 'factuurdemo@databalk.nu'
        },
        woonzorg: {
          name: 'Woonzorg',
          count: 211,
          email: 'woonzorgfactuur@databalk.nu'
        }
      }
    }
  };

  return NextResponse.json(mockData);
}
