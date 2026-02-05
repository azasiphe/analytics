'use client';

import { 
  BarChart3, 
  Mail, 
  AlertCircle, 
  Settings, 
  Home, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: Home },
    { id: 'chart', label: 'CHART', icon: BarChart3 },
    { id: 'email', label: 'EMAIL', icon: Mail },
    { id: 'alerts', label: 'ALERTS', icon: AlertCircle },
    { id: 'settings', label: 'SETTING', icon: Settings },
  ];

  return (
    <div className="w-64 bg-linear-to-b from-purple-900 to-purple-950 text-white h-screen overflow-y-auto fixed left-0 top-0 shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-purple-800">
        <h1 className="text-2xl font-bold text-cyan-400">Dashboard</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative ${
                isActive
                  ? 'bg-purple-700 text-white'
                  : 'text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
          );
        })}
      </nav>

      {/* Projects Section */}
      <div className="mt-8 px-4">
        <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">Projects</h3>
        <div className="space-y-2">
          {['Option', 'Case', 'Local'].map((project) => (
            <button
              key={project}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-purple-200 hover:bg-purple-800/50 transition-colors text-sm"
            >
              <div className="w-3 h-3 rounded-full bg-purple-400"></div>
              {project}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-purple-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
