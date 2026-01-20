export interface DashboardData {
  generatedAt: string;
  meetings: MeetingStats;
  invoices: InvoiceStats;
}

export interface MeetingStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
}

export interface InvoiceStats {
  total: number;
  allTime: {
    factuurdemo: number;
    woonzorg: number;
  };
  breakdown: RecipientBreakdown[];
}

export interface RecipientBreakdown {
  name: string;
  email: string;
  count: number;
  color: string;
}

export interface EmailWithoutPDF {
  timestamp: string;
  msgId: string;
  from: string;
  to: string;
  recipientType: string;
}

export interface FailedProcessing {
  timestamp: string;
  msgId: string;
  recipientType: string;
  error: string;
  errorType: 'extraction' | 'reasoning';
}

export interface NonPDFStats {
  thisWeek: {
    factuurdemo: number;
    woonzorg: number;
    total: number;
  };
  thisMonth: {
    factuurdemo: number;
    woonzorg: number;
    total: number;
  };
  recentEmails: EmailWithoutPDF[];
}

export interface FailureStats {
  thisWeek: {
    extraction: number;
    reasoning: number;
    total: number;
  };
  thisMonth: {
    extraction: number;
    reasoning: number;
    total: number;
  };
  recentFailures: FailedProcessing[];
}
