'use client';

import { XCircle, ExternalLink, AlertTriangle, Clock } from 'lucide-react';
import { FailureStats } from '@/types/dashboard';
import { format } from 'date-fns';

interface FailuresListProps {
  data: FailureStats;
}

export default function FailuresList({ data }: FailuresListProps) {
  const hasAppInsights = data.recentFailures.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <XCircle className="w-6 h-6 text-red-500" />
          Processing Failures
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
      <div className="mb-6 p-4 bg-red-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Extraction Failed</p>
            <p className="text-2xl font-bold text-gray-900">{data.stats.extraction}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Reasoning Failed</p>
            <p className="text-2xl font-bold text-gray-900">{data.stats.reasoning}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Failures</p>
            <p className="text-2xl font-bold text-red-600">{data.stats.total}</p>
          </div>
        </div>
      </div>

      {/* Recent Failures */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Recent Failures {hasAppInsights && `(${data.recentFailures.length})`}
        </h3>
        
        {!hasAppInsights ? (
          <>
            {data.stats.total === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-gray-500">No processing failures! 🎉</p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">
                  📊 Application Insights Required
                </p>
                <p className="text-sm text-blue-700 mb-3">
                  {data.note || 'Configure Application Insights to see detailed failure list'}
                </p>
                <p className="text-xs text-blue-600">
                  Status: Tracking enabled ✅ | Query needed: customEvents | where name == InvoiceProcessingFailed
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-2">
            {data.recentFailures.map((failure, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="shrink-0 mt-1">
                  <XCircle className={`w-5 h-5 ${
                    failure.failureType === 'Extraction' ? 'text-orange-500' : 'text-red-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Message ID: {failure.msgId}
                    </p>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ml-2 ${
                      failure.recipientType === 'Factuurdemo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {failure.recipientType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {format(new Date(failure.failedAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                  <p className="text-sm text-red-600 mb-2" title={failure.error}>
                    {failure.error}
                  </p>
                  <span className={`inline-flex items-center text-xs font-medium ${
                    failure.failureType === 'Extraction' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    Type: {failure.failureType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Link to Error Log */}
      <div className="mt-4 pt-4 border-t">
        <a
          href="#"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          onClick={(e) => {
            e.preventDefault();
            alert('Configure Application Insights URL in the component');
          }}
        >
          View Error Log in Application Insights
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
