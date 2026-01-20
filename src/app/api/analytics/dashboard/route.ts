import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data matching backend API structure
  const now = new Date();
  const mockData = {
    generatedAt: now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    timestamp: now.toISOString(),
    meetings: {
      total: 150,
      thisWeek: 12,
      thisMonth: 45,
      transcripts: {
        available: 142,
        unavailable: 8,
        percentage: 94.7
      }
    },
    invoices: {
      total: 523,
      allTime: {
        factuurdemo: 312,
        woonzorg: 211,
        total: 523
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
    note: 'Using mock data. Connect to backend API for real data.'
  };

  return NextResponse.json(mockData);
}
