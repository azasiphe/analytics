import { fetchDashboardData, fetchEmailsWithoutPDF, fetchFailedProcessing, fetchSummary } from '@/lib/api';

export default async function StatsPage() {
  try {
    // Fetch all available data
    const [dashboard, summary, noPdfWeek, noPdfMonth, failuresWeek, failuresMonth] = await Promise.all([
      fetchDashboardData(),
      fetchSummary('week'),
      fetchEmailsWithoutPDF('week'),
      fetchEmailsWithoutPDF('month'),
      fetchFailedProcessing('week'),
      fetchFailedProcessing('month'),
    ]);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Statistics</h1>
          <p className="text-gray-600 mb-8">Detailed view of all available data</p>

          {/* Meeting Counts */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📅 Meeting Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{dashboard.meetings.total}</div>
                <div className="text-sm text-gray-600">Total Meetings</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{dashboard.meetings.thisWeek}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{dashboard.meetings.thisMonth}</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{dashboard.meetings.transcripts.percentage}%</div>
                <div className="text-sm text-gray-600">Transcripts Available</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{dashboard.meetings.transcripts.available}</div>
                <div className="text-sm text-gray-600">With Transcripts</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{dashboard.meetings.transcripts.unavailable}</div>
                <div className="text-sm text-gray-600">Without Transcripts</div>
              </div>
            </div>
          </section>

          {/* Invoice Counts */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📄 Invoice Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{dashboard.invoices.total}</div>
                <div className="text-sm text-gray-600">Total Invoices</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{dashboard.invoices.allTime.factuurdemo}</div>
                <div className="text-sm text-gray-600">Factuurdemo</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{dashboard.invoices.allTime.woonzorg}</div>
                <div className="text-sm text-gray-600">Woonzorg</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-gray-600">{dashboard.invoices.allTime.total}</div>
                <div className="text-sm text-gray-600">All Time Total</div>
              </div>
            </div>
          </section>

          {/* Summary Stats */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📊 Summary (This Week)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{summary.meetings.count}</div>
                <div className="text-sm text-gray-600">Meetings</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{summary.invoices.total}</div>
                <div className="text-sm text-gray-600">Invoices</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">{noPdfWeek.stats.total}</div>
                <div className="text-sm text-gray-600">Emails w/o PDF</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{failuresWeek.stats.total}</div>
                <div className="text-sm text-gray-600">Failed Processing</div>
              </div>
            </div>
          </section>

          {/* Emails Without PDF */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚠️ Emails Without PDF</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Week */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">This Week</h3>
                <div className="bg-yellow-50 p-4 rounded-lg mb-3">
                  <div className="text-3xl font-bold text-yellow-600">{noPdfWeek.stats.total}</div>
                  <div className="text-sm text-gray-600">Total Count</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(noPdfWeek.from).toLocaleDateString()} - {new Date(noPdfWeek.to).toLocaleDateString()}
                  </div>
                </div>
                {noPdfWeek.recentEmails.length > 0 ? (
                  <div className="space-y-2">
                    {noPdfWeek.recentEmails.slice(0, 3).map((email, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded text-sm">
                        <div className="font-medium text-gray-900">{email.subject || 'No subject'}</div>
                        <div className="text-gray-600">{email.from}</div>
                        <div className="text-xs text-gray-500">{new Date(email.receivedAt).toLocaleString()}</div>
                      </div>
                    ))}
                    {noPdfWeek.recentEmails.length > 3 && (
                      <div className="text-sm text-gray-500 text-center">
                        +{noPdfWeek.recentEmails.length - 3} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">No emails without PDF this week</div>
                )}
              </div>

              {/* Month */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">This Month</h3>
                <div className="bg-yellow-50 p-4 rounded-lg mb-3">
                  <div className="text-3xl font-bold text-yellow-600">{noPdfMonth.stats.total}</div>
                  <div className="text-sm text-gray-600">Total Count</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(noPdfMonth.from).toLocaleDateString()} - {new Date(noPdfMonth.to).toLocaleDateString()}
                  </div>
                </div>
                {noPdfMonth.recentEmails.length > 0 ? (
                  <div className="space-y-2">
                    {noPdfMonth.recentEmails.slice(0, 3).map((email, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded text-sm">
                        <div className="font-medium text-gray-900">{email.subject || 'No subject'}</div>
                        <div className="text-gray-600">{email.from}</div>
                        <div className="text-xs text-gray-500">{new Date(email.receivedAt).toLocaleString()}</div>
                      </div>
                    ))}
                    {noPdfMonth.recentEmails.length > 3 && (
                      <div className="text-sm text-gray-500 text-center">
                        +{noPdfMonth.recentEmails.length - 3} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">No emails without PDF this month</div>
                )}
              </div>
            </div>
          </section>

          {/* Failed Processing */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">❌ Failed Processing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Week */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">This Week</h3>
                <div className="bg-red-50 p-4 rounded-lg mb-3">
                  <div className="text-3xl font-bold text-red-600">{failuresWeek.stats.total}</div>
                  <div className="text-sm text-gray-600">Total Failures</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(failuresWeek.from).toLocaleDateString()} - {new Date(failuresWeek.to).toLocaleDateString()}
                  </div>
                </div>
                {failuresWeek.recentFailures.length > 0 ? (
                  <div className="space-y-2">
                    {failuresWeek.recentFailures.slice(0, 3).map((failure, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded text-sm border-l-4 border-red-500">
                        <div className="font-medium text-gray-900">{failure.recipientType} - {failure.failureType}</div>
                        <div className="text-red-600 text-xs">{failure.error}</div>
                        <div className="text-xs text-gray-500">{new Date(failure.failedAt).toLocaleString()}</div>
                      </div>
                    ))}
                    {failuresWeek.recentFailures.length > 3 && (
                      <div className="text-sm text-gray-500 text-center">
                        +{failuresWeek.recentFailures.length - 3} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">No failures this week ✅</div>
                )}
              </div>

              {/* Month */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">This Month</h3>
                <div className="bg-red-50 p-4 rounded-lg mb-3">
                  <div className="text-3xl font-bold text-red-600">{failuresMonth.stats.total}</div>
                  <div className="text-sm text-gray-600">Total Failures</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(failuresMonth.from).toLocaleDateString()} - {new Date(failuresMonth.to).toLocaleDateString()}
                  </div>
                </div>
                {failuresMonth.recentFailures.length > 0 ? (
                  <div className="space-y-2">
                    {failuresMonth.recentFailures.slice(0, 3).map((failure, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded text-sm border-l-4 border-red-500">
                        <div className="font-medium text-gray-900">{failure.recipientType} - {failure.failureType}</div>
                        <div className="text-red-600 text-xs">{failure.error}</div>
                        <div className="text-xs text-gray-500">{new Date(failure.failedAt).toLocaleString()}</div>
                      </div>
                    ))}
                    {failuresMonth.recentFailures.length > 3 && (
                      <div className="text-sm text-gray-500 text-center">
                        +{failuresMonth.recentFailures.length - 3} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">No failures this month ✅</div>
                )}
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-center">
            <a 
              href="/" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-900 mb-2">Failed to load statistics</h1>
          <p className="text-red-700">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
          <div className="mt-4">
            <a 
              href="/" 
              className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }
}
