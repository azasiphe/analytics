import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  red: 'bg-red-50 text-red-600',
  yellow: 'bg-yellow-50 text-yellow-600',
};

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  color = 'blue' 
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
