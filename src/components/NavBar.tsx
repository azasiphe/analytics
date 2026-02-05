'use client';

import { useState } from 'react';
import { ChevronRight, Phone, Mail } from 'lucide-react';
import { DashboardData, NonPDFStats, FailureStats } from '@/types/dashboard';

interface NavBarProps {
  dashboardData: DashboardData;
  noPdfData: NonPDFStats;
  failureData: FailureStats;
}

export default function NavBar({ dashboardData, noPdfData, failureData }: NavBarProps) {
  const [expandedSection, setExpandedSection] = useState<'meetings' | 'invoices' | null>('meetings');

  return (
    <div className="flex gap-6">
      {/* Meetings Section */}
      <div className="flex-1 bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm cursor-pointer hover:border-cyan-500/50 transition-all"
        onClick={() => setExpandedSection(expandedSection === 'meetings' ? null : 'meetings')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-cyan-500/20">
              <Phone className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Meetings</h4>
              <p className="text-purple-300 text-sm">This Week Activity</p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform ${expandedSection === 'meetings' ? 'rotate-90' : ''}`} />
        </div>

        {expandedSection === 'meetings' && (
          <div className="space-y-3 mt-4 border-t border-purple-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Total Meetings</span>
              <span className="text-cyan-400 font-bold text-lg">{dashboardData.meetings.thisWeek}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">With Transcript</span>
              <span className="text-pink-400 font-bold">{dashboardData.meetings.transcripts.available}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Without Transcript</span>
              <span className="text-yellow-400 font-bold">{dashboardData.meetings.transcripts.unavailable}</span>
            </div>
            <div className="pt-3 border-t border-purple-700">
              <button className="w-full text-center py-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        )}

        {!expandedSection && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-purple-300 text-xs mb-1">Total</p>
              <p className="text-white text-2xl font-bold">{dashboardData.meetings.thisWeek}</p>
            </div>
            <div>
              <p className="text-purple-300 text-xs mb-1">Available</p>
              <p className="text-cyan-400 text-2xl font-bold">{dashboardData.meetings.transcripts.available}</p>
            </div>
            <div>
              <p className="text-purple-300 text-xs mb-1">Missing</p>
              <p className="text-yellow-400 text-2xl font-bold">{dashboardData.meetings.transcripts.unavailable}</p>
            </div>
          </div>
        )}
      </div>

      {/* Invoices Section */}
      <div className="flex-1 bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm cursor-pointer hover:border-pink-500/50 transition-all"
        onClick={() => setExpandedSection(expandedSection === 'invoices' ? null : 'invoices')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-pink-500/20">
              <Mail className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Invoices</h4>
              <p className="text-purple-300 text-sm">Email Distribution</p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform ${expandedSection === 'invoices' ? 'rotate-90' : ''}`} />
        </div>

        {expandedSection === 'invoices' && (
          <div className="space-y-3 mt-4 border-t border-purple-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Total Invoices</span>
              <span className="text-pink-400 font-bold text-lg">{dashboardData.invoices.total}</span>
            </div>
            {dashboardData.invoices.breakdown.map((recipient) => (
              <div key={recipient.email} className="flex justify-between items-center">
                <span className="text-purple-300">{recipient.name}</span>
                <span className="text-white font-bold">{recipient.count}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-purple-700">
              <button className="w-full text-center py-2 text-pink-400 hover:text-pink-300 text-sm font-medium">
                View Distribution
              </button>
            </div>
          </div>
        )}

        {!expandedSection && (
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-purple-300 text-xs mb-1">Total Count</p>
              <p className="text-white text-2xl font-bold">{dashboardData.invoices.total}</p>
            </div>
            <div className="space-y-2">
              {dashboardData.invoices.breakdown.slice(0, 2).map((recipient) => (
                <div key={recipient.email} className="flex justify-between items-center">
                  <span className="text-purple-300 text-xs">{recipient.name}</span>
                  <span className="text-pink-400 font-bold text-sm">{recipient.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
