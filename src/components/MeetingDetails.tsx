'use client';

import { Calendar, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { MeetingStats } from '@/types/dashboard';

interface MeetingDetailsProps {
  data: MeetingStats;
}

export default function MeetingDetails({ data }: MeetingDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-600" />
        Meeting Overview
      </h2>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">This Week</p>
          <p className="text-3xl font-bold text-blue-600">{data.thisWeek}</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">This Month</p>
          <p className="text-3xl font-bold text-purple-600">{data.thisMonth}</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">All Time</p>
          <p className="text-3xl font-bold text-gray-900">{data.total}</p>
        </div>
      </div>

      {/* Transcript Statistics */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Transcript Availability
        </h3>
        
        <div className="space-y-4">
          {/* Available Transcripts */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">With Transcripts</p>
                <p className="text-sm text-gray-600">Successfully processed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {data.transcripts.available}
              </p>
              <p className="text-sm text-green-700">
                {data.transcripts.percentage.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Unavailable Transcripts */}
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-semibold text-gray-900">Without Transcripts</p>
                <p className="text-sm text-gray-600">Need attention</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-600">
                {data.transcripts.unavailable}
              </p>
              <p className="text-sm text-yellow-700">
                {(100 - data.transcripts.percentage).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Transcript Coverage</span>
            <span className="font-semibold">{data.transcripts.percentage.toFixed(1)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-green-500 to-green-600 transition-all duration-500"
              style={{ width: `${data.transcripts.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
