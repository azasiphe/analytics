'use client';

import { Search, Bell, Settings, User } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  date?: string;
}

export default function TopBar({ date = new Date().toISOString().split('T')[0] }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed top-0 left-64 right-0 bg-linear-to-b from-purple-950 to-purple-900 border-b border-purple-800 h-20 flex items-center px-8 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-purple-800/40 border border-purple-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-purple-400 focus:outline-none focus:bg-purple-800/60 focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex-1 flex justify-center text-white text-sm">
        <span className="text-purple-300">DASHBOARD</span>
        <span className="mx-2 text-purple-600">/</span>
        <span className="text-cyan-400">HOME</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-purple-800/40 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-purple-300 hover:text-cyan-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2 hover:bg-purple-800/40 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-purple-300 hover:text-cyan-400" />
        </button>

        <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-cyan-400/50 transition-all">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
