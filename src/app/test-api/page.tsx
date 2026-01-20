'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, Server } from 'lucide-react';

export default function TestAPI() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
    setApiUrl(envUrl);

    if (!envUrl) {
      setError('NEXT_PUBLIC_API_URL is not set');
      setLoading(false);
      return;
    }

    fetch(`${envUrl}/api/Analytics/dashboard`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">API Connection Test</h1>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Testing connection to:</span>
            <code className="bg-gray-100 px-2 py-1 rounded">{apiUrl}</code>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {loading && (
            <div className="flex items-center gap-3 text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg font-semibold">Connecting to backend...</span>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-600">
                <XCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Connection Failed</span>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-800 font-mono text-sm">{error}</p>
              </div>
              
              {/* Troubleshooting */}
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Troubleshooting:</h3>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>Is the backend running on port 5000?</li>
                  <li>Check if CORS is enabled in Program.cs</li>
                  <li>Verify .env.local has NEXT_PUBLIC_API_URL set</li>
                  <li>Try opening {apiUrl}/api/analytics/dashboard directly in browser</li>
                </ul>
              </div>
            </div>
          )}

          {!loading && !error && data && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-lg font-semibold">Connected Successfully! 🎉</span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded p-4">
                  <p className="text-sm text-blue-600 mb-1">Total Meetings</p>
                  <p className="text-2xl font-bold text-blue-900">{data.meetings?.total || 0}</p>
                </div>
                <div className="bg-green-50 rounded p-4">
                  <p className="text-sm text-green-600 mb-1">Total Invoices</p>
                  <p className="text-2xl font-bold text-green-900">{data.invoices?.total || 0}</p>
                </div>
                <div className="bg-purple-50 rounded p-4">
                  <p className="text-sm text-purple-600 mb-1">Factuurdemo</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {data.invoices?.allTime?.factuurdemo || 0}
                  </p>
                </div>
                <div className="bg-pink-50 rounded p-4">
                  <p className="text-sm text-pink-600 mb-1">Woonzorg</p>
                  <p className="text-2xl font-bold text-pink-900">
                    {data.invoices?.allTime?.woonzorg || 0}
                  </p>
                </div>
              </div>

              {/* Transcript Stats */}
              {data.meetings?.transcripts && (
                <div className="bg-gray-50 rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Meeting Transcripts</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Available: </span>
                      <span className="font-semibold">{data.meetings.transcripts.available}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Unavailable: </span>
                      <span className="font-semibold">{data.meetings.transcripts.unavailable}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Coverage: </span>
                      <span className="font-semibold">{data.meetings.transcripts.percentage}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Ready to proceed!</h3>
                <p className="text-sm text-green-800">
                  Your frontend is successfully connected to the backend. Visit{' '}
                  <a href="/" className="underline font-semibold">the main dashboard</a> to see all components.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Raw JSON Response */}
        {data && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Raw API Response</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-96">
              <pre className="text-xs font-mono">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Test All Endpoints */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Available Endpoints</h2>
          <div className="space-y-2">
            <EndpointLink url={`${apiUrl}/api/Analytics/dashboard`} label="Dashboard Data" />
            <EndpointLink url={`${apiUrl}/api/Analytics/summary?period=week`} label="Summary (Week)" />
            <EndpointLink url={`${apiUrl}/api/Analytics/emails-without-pdf?period=week`} label="Emails Without PDF" />
            <EndpointLink url={`${apiUrl}/api/Analytics/failed-processing?period=week`} label="Failed Processing" />
            <EndpointLink url={`${apiUrl}/api/Analytics/meetings/count`} label="Meeting Count" />
            <EndpointLink url={`${apiUrl}/api/Analytics/invoices/count?recipient=all`} label="Invoice Count (All)" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EndpointLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{label}</span>
        <code className="text-xs text-gray-600 bg-white px-2 py-1 rounded">{url}</code>
      </div>
    </a>
  );
}
