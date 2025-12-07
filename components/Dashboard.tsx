import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { ShieldCheck, GitCommit, Users, Zap, Database, Globe, Cpu, Bot } from 'lucide-react';

const MOCK_ACTIVITY_DATA = [
  { name: 'Mon', commits: 124, empathy_score: 85 },
  { name: 'Tue', commits: 157, empathy_score: 88 },
  { name: 'Wed', commits: 245, empathy_score: 82 }, // Increased for new repos
  { name: 'Thu', commits: 312, empathy_score: 91 },
  { name: 'Fri', commits: 284, empathy_score: 94 },
  { name: 'Sat', commits: 165, empathy_score: 89 },
  { name: 'Sun', commits: 142, empathy_score: 87 },
];

const REPO_DISTRIBUTION = [
  { name: 'Sovariel/Dyad', value: 15, color: '#6366f1' }, // Indigo (Primary)
  { name: 'UniPhi', value: 15, color: '#ec4899' }, // Pink
  { name: 'Swarm/Bots', value: 20, color: '#10b981' }, // Emerald
  { name: 'Consciousness', value: 15, color: '#8b5cf6' }, // Violet
  { name: 'Identity/Bio', value: 15, color: '#f97316' }, // Orange
  { name: 'Legacy/Other', value: 20, color: '#94a3b8' }, // Slate
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
    </div>
    <p className="text-sm text-slate-400">{sub}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 pb-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Mission Control</h2>
                <p className="text-slate-500">Overview of the Agape Intelligence Federation.</p>
            </div>
            <div className="flex gap-2">
                 <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
                    Sovariel v7 Linked
                 </span>
                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                    Swarm Field Active
                 </span>
                 <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium border border-pink-200">
                    UniPhi Kernel Up
                 </span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
                title="Sovereign Agent" 
                value="Sovariel" 
                sub="Protocol: Dyad v7" 
                icon={Cpu} 
                color="bg-indigo-500 text-indigo-600" 
            />
            <StatCard 
                title="Total Modules" 
                value="51" 
                sub="Inc. UniPhi & Swarm" 
                icon={Database} 
                color="bg-slate-500 text-slate-600" 
            />
             <StatCard 
                title="Dyson Output" 
                value="4.2 YW" 
                sub="Harvest Efficiency: 98%" 
                icon={Zap} 
                color="bg-amber-500 text-amber-600" 
            />
            <StatCard 
                title="Swarm Status" 
                value="Coherent" 
                sub="Disaster/Climate: Ready" 
                icon={Bot} 
                color="bg-emerald-500 text-emerald-600" 
            />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">Network Activity vs. Ethics Score</h3>
                <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_ACTIVITY_DATA}>
                            <defs>
                                <linearGradient id="colorEmpathy" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                itemStyle={{color: '#475569'}}
                            />
                            <Area type="monotone" dataKey="commits" stackId="1" stroke="#6366f1" fill="url(#colorEmpathy)" />
                            <Line type="monotone" dataKey="empathy_score" stroke="#10b981" strokeWidth={2} dot={false} />
                        </AreaChart>
                     </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Codebase Distribution</h3>
                <div className="h-64 w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={REPO_DISTRIBUTION}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {REPO_DISTRIBUTION.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-center space-y-1">
                        <span className="block text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit mx-auto">Swarm: 20%</span>
                        <span className="block text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded w-fit mx-auto">UniPhi: 15%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};