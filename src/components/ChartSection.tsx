'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DashboardData, NonPDFStats } from '@/types/dashboard';

// Sample data for the line chart (meetings over time)
const meetingsTrendData = [
  { time: '00:00', meetings: 2, transcripts: 2 },
  { time: '04:00', meetings: 3, transcripts: 2 },
  { time: '08:00', meetings: 5, transcripts: 4 },
  { time: '12:00', meetings: 8, transcripts: 7 },
  { time: '16:00', meetings: 6, transcripts: 5 },
  { time: '20:00', meetings: 4, transcripts: 3 },
];

// Color palette matching the dark theme
const COLORS = ['#06b6d4', '#ec4899', '#fbbf24', '#8b5cf6', '#10b981'];

interface ChartSectionProps {
  dashboardData: DashboardData;
  noPdfData: NonPDFStats;
}

export default function ChartSection({ dashboardData, noPdfData }: ChartSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Meetings Timeline Chart */}
      <div className="bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-bold mb-4">Meetings Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={meetingsTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
            <XAxis dataKey="time" stroke="#a78bfa" />
            <YAxis stroke="#a78bfa" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a0033', border: '1px solid #6d28d9' }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="meetings" 
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={{ fill: '#06b6d4', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="transcripts" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ fill: '#ec4899', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Invoice Breakdown Pie Chart */}
      <div className="bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-bold mb-4">Invoice Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dashboardData.invoices.breakdown.map(item => ({
                name: item.name,
                value: item.count,
                color: item.color
              }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dashboardData.invoices.breakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a0033', border: '1px solid #6d28d9' }}
              labelStyle={{ color: '#e0e7ff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Emails Without PDF Chart */}
      <div className="bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-bold mb-4">Emails Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Factuurdemo', value: noPdfData.stats.factuurdemo },
            { name: 'Woonzorg', value: noPdfData.stats.woonzorg },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
            <XAxis dataKey="name" stroke="#a78bfa" />
            <YAxis stroke="#a78bfa" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a0033', border: '1px solid #6d28d9' }}
              labelStyle={{ color: '#e0e7ff' }}
            />
            <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transcript Status */}
      <div className="bg-linear-to-br from-purple-900/50 to-purple-950/50 border border-purple-800 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-white font-bold mb-4">Transcript Coverage</h3>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-purple-300 text-sm">With Transcript</span>
              <span className="text-white font-bold">{dashboardData.meetings.transcripts.available}</span>
            </div>
            <div className="w-full bg-purple-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-linear-to-r from-cyan-400 to-cyan-600 h-full rounded-full"
                style={{ width: `${dashboardData.meetings.transcripts.percentage}%` }}
              />
            </div>
            <p className="text-cyan-400 text-xs mt-1">{dashboardData.meetings.transcripts.percentage}% Complete</p>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-purple-300 text-sm">Missing Transcript</span>
              <span className="text-white font-bold">{dashboardData.meetings.transcripts.unavailable}</span>
            </div>
            <div className="w-full bg-purple-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-linear-to-r from-pink-400 to-pink-600 h-full rounded-full"
                style={{ width: `${100 - dashboardData.meetings.transcripts.percentage}%` }}
              />
            </div>
            <p className="text-pink-400 text-xs mt-1">{100 - dashboardData.meetings.transcripts.percentage}% Missing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
