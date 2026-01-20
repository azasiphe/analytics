'use client';

import { AlertCircle, ExternalLink } from 'lucide-react';
import { NonPDFStats } from '@/types/dashboard';
import { format } from 'date-fns';

interface NoPdfAlertsProps {
  data: NonPDFStats;
}

export default function NoPdfAlerts({ data }: NoPdfAlertsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
          Emails Without PDF Attachments
        </h2>
        <span className="text-sm text-gray-500">Need Attention</span>
      </div>

      {/* This Week Stats */}
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">This Week</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Factuurdemo</p>
            <p className="text-2xl font-bold text-gray-900">{data.thisWeek.factuurdemo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Woonzorg</p>
            <p className="text-2xl font-bold text-gray-900">{data.thisWeek.woonzorg}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-yellow-600">{data.thisWeek.total}</p>
          </div>
        </div>
      </div>

      {/* Recent Emails */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Recent Emails (Last 10)</h3>
        {data.recentEmails.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No emails without PDF attachments</p>
        ) : (
          <div className="space-y-2">
            {data.recentEmails.slice(0, 10).map((email, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{email.from}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(email.timestamp), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    email.recipientType === 'Factuurdemo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {email.recipientType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Link to App Insights */}
      <div className="mt-4 pt-4 border-t">
        <a
          href="#"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={(e) => {
            e.preventDefault();
            alert('Configure Application Insights URL in the component');
          }}
        >
          View in Application Insights
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
