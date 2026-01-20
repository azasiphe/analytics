import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || 'week';

  // Mock data - replace with actual Application Insights query
  const mockData = {
    thisWeek: {
      extraction: 1,
      reasoning: 1,
      total: 2,
    },
    thisMonth: {
      extraction: 3,
      reasoning: 2,
      total: 5,
    },
    recentFailures: [
      {
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        msgId: 'msg_err_001',
        recipientType: 'Factuurdemo',
        error: 'Failed to extract invoice data: PDF parsing error',
        errorType: 'extraction' as const,
      },
      {
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        msgId: 'msg_err_002',
        recipientType: 'Woonzorg',
        error: 'Reasoning model timeout: Request took too long',
        errorType: 'reasoning' as const,
      },
    ],
  };

  return NextResponse.json(mockData);
}
