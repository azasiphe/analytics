'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { InvoiceStats } from '@/types/dashboard';

interface InvoiceBreakdownProps {
  data: InvoiceStats;
}

export default function InvoiceBreakdown({ data }: InvoiceBreakdownProps) {
  const chartData = data.breakdown.map(item => ({
    name: item.name,
    value: item.count,
    color: item.color,
    email: item.email,
  }));

  const total = data.total;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Invoice Breakdown by Recipient
      </h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Chart */}
        <div className="w-full lg:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats List */}
        <div className="w-full lg:w-1/2 space-y-4">
          {data.breakdown.map((item, index) => (
            <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: item.color }}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                  <p className="text-sm text-gray-500">
                    {((item.count / total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
