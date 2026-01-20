import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get('period') || 'week';

  // Mock data - replace with actual Application Insights query
  const mockData = {
    thisWeek: {
      factuurdemo: 3,
      woonzorg: 1,
      total: 4,
    },
    thisMonth: {
      factuurdemo: 8,
      woonzorg: 3,
      total: 11,
    },
    recentEmails: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        msgId: 'msg_12345',
        from: 'sender@example.com',
        to: 'factuurdemo@databalk.nu',
        recipientType: 'Factuurdemo',
      },
      {
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        msgId: 'msg_12346',
        from: 'another@example.com',
        to: 'woonzorgfactuur@databalk.nu',
        recipientType: 'Woonzorg',
      },
      {
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        msgId: 'msg_12347',
        from: 'test@example.com',
        to: 'factuurdemo@databalk.nu',
        recipientType: 'Factuurdemo',
      },
    ],
  };

  return NextResponse.json(mockData);
}
