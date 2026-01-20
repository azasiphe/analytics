import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data - replace with actual Application Insights query
  const mockData = {
    generatedAt: new Date().toISOString(),
    meetings: {
      total: 150,
      thisWeek: 12,
      thisMonth: 45,
    },
    invoices: {
      total: 523,
      allTime: {
        factuurdemo: 312,
        woonzorg: 211,
      },
      breakdown: [
        {
          name: 'Factuurdemo',
          email: 'factuurdemo@databalk.nu',
          count: 312,
          color: '#4CAF50',
        },
        {
          name: 'Woonzorg',
          email: 'woonzorgfactuur@databalk.nu',
          count: 211,
          color: '#2196F3',
        },
      ],
    },
  };

  return NextResponse.json(mockData);
}
