import React from 'react';
import { LayoutDashboard, FolderTree, BrainCircuit, Settings, Activity } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: View.REPOSITORY, label: 'Repository', icon: FolderTree },
    { id: View.INTELLIGENCE, label: 'Agape AI', icon: BrainCircuit },
    { id: View.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl border-r border-slate-700">
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <Activity size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">Agape</h1>
          <p className="text-xs text-slate-400 font-medium">Intelligence Unit</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-slate-300 font-medium">System Operational</span>
          </div>
          <p className="text-[10px] text-slate-500">v2.4.0-alpha • Stable</p>
        </div>
      </div>
    </div>
  );
};