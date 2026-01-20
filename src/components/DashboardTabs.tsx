'use client';

import { useState } from 'react';
import { Mail, Calendar } from 'lucide-react';
import InvoiceBreakdown from './InvoiceBreakdown';
import MeetingDetails from './MeetingDetails';
import NoPdfAlerts from './NoPdfAlerts';
import { DashboardData, NonPDFStats, FailureStats } from '@/types/dashboard';

interface DashboardTabsProps {
  dashboardData: DashboardData;
  noPdfData: NonPDFStats;
  failureData: FailureStats;
}

export default function DashboardTabs({ dashboardData, noPdfData, failureData }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<'emails' | 'meetings'>('emails');

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('emails')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'emails'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Mail className="w-5 h-5" />
          Emails
        </button>
        <button
          onClick={() => setActiveTab('meetings')}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'meetings'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5" />
          Meetings
        </button>
      </div>

      {/* Emails Tab Content */}
      {activeTab === 'emails' && (
        <div className="space-y-6">
          {/* Email Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Invoices</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.invoices.total}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Factuurdemo</p>
                  <p className="text-3xl font-bold text-green-600">{dashboardData.invoices.allTime.factuurdemo}</p>
                  <p className="text-xs text-gray-500 mt-1">factuurdemo@databalk.nu</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📨</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Woonzorg</p>
                  <p className="text-3xl font-bold text-blue-600">{dashboardData.invoices.allTime.woonzorg}</p>
                  <p className="text-xs text-gray-500 mt-1">woonzorgfactuur@databalk.nu</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📬</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Chart */}
          <InvoiceBreakdown data={dashboardData.invoices} />

          {/* Emails Without PDF */}
          <NoPdfAlerts data={noPdfData} />
        </div>
      )}

      {/* Meetings Tab Content */}
      {activeTab === 'meetings' && (
        <div className="space-y-6">
          {/* Meeting Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Meetings</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.meetings.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Week</p>
                  <p className="text-3xl font-bold text-blue-600">{dashboardData.meetings.thisWeek}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-3xl font-bold text-blue-600">{dashboardData.meetings.thisMonth}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📆</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Transcripts</p>
                  <p className="text-3xl font-bold text-purple-600">{dashboardData.meetings.transcripts.percentage}%</p>
                  <p className="text-xs text-gray-500 mt-1">Available</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <MeetingDetails data={dashboardData.meetings} />

          {/* Additional Meeting Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Transcript Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">With Transcripts</span>
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-3xl font-bold text-green-600">{dashboardData.meetings.transcripts.available}</p>
                <p className="text-sm text-green-700 mt-1">
                  {((dashboardData.meetings.transcripts.available / dashboardData.meetings.total) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-400">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Without Transcripts</span>
                  <span className="text-2xl">❌</span>
                </div>
                <p className="text-3xl font-bold text-gray-600">{dashboardData.meetings.transcripts.unavailable}</p>
                <p className="text-sm text-gray-700 mt-1">
                  {((dashboardData.meetings.transcripts.unavailable / dashboardData.meetings.total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
