'use client';

import { AlertCircle, ExternalLink, Clock } from 'lucide-react';
import { NonPDFStats } from '@/types/dashboard';
import { format } from 'date-fns';

interface NoPdfAlertsProps {
  data: NonPDFStats;
}

export default function NoPdfAlerts({ data }: NoPdfAlertsProps) {
  const hasAppInsights = data.recentEmails.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
          Emails Without PDF
        </h2>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {data.period === 'week' ? 'Last 7 days' : 'Last 30 days'}
        </span>
      </div>

      {/* Date Range */}
      <p className="text-sm text-gray-600 mb-4">
        Period: {data.from} to {data.to}
      </p>

      {/* Stats Grid */}
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Factuurdemo</p>
            <p className="text-2xl font-bold text-gray-900">{data.stats.factuurdemo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Woonzorg</p>
            <p className="text-2xl font-bold text-gray-900">{data.stats.woonzorg}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-yellow-600">{data.stats.total}</p>
          </div>
        </div>
      </div>

      {/* Recent Emails */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Recent Emails {hasAppInsights && `(${data.recentEmails.length})`}
        </h3>
        
        {!hasAppInsights ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium mb-2">
              📊 Application Insights Required
            </p>
            <p className="text-sm text-blue-700 mb-3">
              {data.note || 'Configure Application Insights to see detailed email list'}
            </p>
            <p className="text-xs text-blue-600">
              Status: Tracking enabled ✅ | Query needed: customEvents | where name == 'InvoiceReceived' and customDimensions.HasPdfAttachment == 'false'
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.recentEmails.map((email, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{email.from}</p>
                  {email.subject && (
                    <p className="text-xs text-gray-600 truncate">{email.subject}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {format(new Date(email.receivedAt), 'MMM dd, yyyy HH:mm')} • 
                    {email.attachmentCount} attachment{email.attachmentCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    email.to.includes('factuurdemo') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {email.to.includes('factuurdemo') ? 'Factuurdemo' : 'Woonzorg'}
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
