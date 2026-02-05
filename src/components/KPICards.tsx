'use client';

import { LucideIcon, TrendingUp, Phone, FileText, AlertTriangle, Mail } from 'lucide-react';
import { DashboardData, NonPDFStats, FailureStats } from '@/types/dashboard';

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  color: 'cyan' | 'pink' | 'yellow' | 'purple';
}

function KPICard({ title, value, icon: Icon, trend, color }: KPICardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  };

  const iconColorClasses = {
    cyan: 'text-cyan-400',
    pink: 'text-pink-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`bg-linear-to-br ${colorClasses[color]} border rounded-xl p-6 backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-purple-300 text-sm font-medium mb-1">{title}</p>
          <p className="text-white text-4xl font-bold">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-lg bg-black/20 ${iconColorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="flex items-center gap-1 text-cyan-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>+{trend} this week</span>
        </div>
      )}
    </div>
  );
}

interface KPICardsProps {
  dashboardData: DashboardData;
  noPdfCount: number;
  failureCount: number;
}

export default function KPICards({ dashboardData, noPdfCount, failureCount }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total Meetings"
        value={dashboardData.meetings.total}
        icon={Phone}
        trend={dashboardData.meetings.thisWeek}
        color="cyan"
      />
      
      <KPICard
        title="Meetings With Transcript"
        value={dashboardData.meetings.transcripts.available}
        icon={FileText}
        color="pink"
      />

      <KPICard
        title="Total Invoices"
        value={dashboardData.invoices.total}
        icon={Mail}
        color="yellow"
      />

      <KPICard
        title="Failed Processing"
        value={failureCount}
        icon={AlertTriangle}
        color="purple"
      />
    </div>
  );
}
