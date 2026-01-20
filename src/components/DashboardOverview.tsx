'use client';

import { Calendar, FileText, AlertTriangle, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import { DashboardData } from '@/types/dashboard';

interface DashboardOverviewProps {
  data: DashboardData;
  noPdfCount?: number;
  failureCount?: number;
}

export default function DashboardOverview({ 
  data, 
  noPdfCount = 0, 
  failureCount = 0 
}: DashboardOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Meetings"
        value={data.meetings.total}
        icon={Calendar}
        color="blue"
      />
      <StatCard
        title="Total Invoices"
        value={data.invoices.total}
        icon={FileText}
        color="green"
      />
      <StatCard
        title="Emails Without PDF"
        value={noPdfCount}
        icon={AlertTriangle}
        color="yellow"
      />
      <StatCard
        title="Failed Processing"
        value={failureCount}
        icon={TrendingUp}
        color="red"
      />
    </div>
  );
}
