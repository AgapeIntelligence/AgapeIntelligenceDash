import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { RepoViewer } from './components/RepoViewer';
import { ChatInterface } from './components/ChatInterface';
import { View } from './types';
import { Bell, Search, UserCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard />;
      case View.REPOSITORY:
        return <RepoViewer />;
      case View.INTELLIGENCE:
        return <ChatInterface />;
      case View.SETTINGS:
        return (
           <div className="flex items-center justify-center h-full bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-center p-8 max-w-md">
                 <h2 className="text-2xl font-bold text-slate-800 mb-2">Settings</h2>
                 <p className="text-slate-500 mb-6">Configuration for Agape Intelligence Unit</p>
                 <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Environment</p>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-700">API Key Status</span>
                        <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-3">
                        <span className="text-slate-700">Repository Link</span>
                        <span className="text-indigo-600 font-medium">Connected</span>
                    </div>
                 </div>
              </div>
           </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shadow-sm z-10">
           <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search repository, metrics, or chat logs..." 
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-slate-700 placeholder-slate-400"
              />
           </div>

           <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200"></div>
              <button className="flex items-center gap-2 hover:bg-slate-50 py-1 px-2 rounded-lg transition-colors">
                 <UserCircle size={24} className="text-slate-600" />
                 <div className="text-left hidden md:block">
                    <p className="text-sm font-medium text-slate-800">Administrator</p>
                    <p className="text-[10px] text-slate-500">Access Level: Root</p>
                 </div>
              </button>
           </div>
        </header>

        {/* Main View Area */}
        <div className="flex-1 p-6 overflow-hidden">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
