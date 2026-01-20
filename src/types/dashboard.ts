// Main Dashboard Data Structure
export interface DashboardData {
  generatedAt: string;
  timestamp: string;
  meetings: MeetingStats;
  invoices: InvoiceStats;
  note?: string;
}

// Meeting Statistics
export interface MeetingStats {
  total: number;           // All meetings ever received
  thisWeek: number;        // Meetings in last 7 days
  thisMonth: number;       // Meetings in last 30 days
  transcripts: {
    available: number;     // Meetings with transcripts
    unavailable: number;   // Meetings without transcripts
    percentage: number;    // % of meetings with transcripts
  };
}

// Invoice Statistics
export interface InvoiceStats {
  total: number;           // Total invoices (Factuurdemo + Woonzorg)
  allTime: {
    factuurdemo: number;
    woonzorg: number;
    total: number;
  };
  breakdown: RecipientBreakdown[];
}

export interface RecipientBreakdown {
  name: string;
  email: string;
  count: number;
  color: string;           // Hex color for charts
}

// Emails Without PDF Response
export interface NonPDFStats {
  period: 'week' | 'month';
  from: string;
  to: string;
  generatedAt: string;
  stats: {
    factuurdemo: number;
    woonzorg: number;
    total: number;
  };
  recentEmails: EmailWithoutPDF[];
  note?: string;
}

export interface EmailWithoutPDF {
  msgId: string;
  from: string;
  to: string;
  subject?: string;
  receivedAt: string;
  attachmentCount: number;
  hasPdfAttachment: boolean;
}

// Failed Processing Response
export interface FailureStats {
  period: 'week' | 'month';
  from: string;
  to: string;
  generatedAt: string;
  stats: {
    extraction: number;
    reasoning: number;
    total: number;
  };
  recentFailures: FailedProcessing[];
  note?: string;
}

export interface FailedProcessing {
  msgId: string;
  recipientType: string;
  failedAt: string;
  failureType: 'Extraction' | 'Reasoning';
  error: string;
}

// Summary Response
export interface SummaryStats {
  period: 'week' | 'month';
  from: string;
  to: string;
  generatedAt: string;
  meetings: {
    count: number;
  };
  invoices: {
    total: number;
    breakdown: {
      factuurdemo: {
        name: string;
        count: number;
        email: string;
      };
      woonzorg: {
        name: string;
        count: number;
        email: string;
      };
    };
  };
}
