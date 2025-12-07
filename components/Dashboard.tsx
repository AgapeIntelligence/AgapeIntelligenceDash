import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { ShieldCheck, GitCommit, Users, Zap } from 'lucide-react';

const MOCK_ACTIVITY_DATA = [
  { name: 'Mon', commits: 4, empathy_score: 85 },
  { name: 'Tue', commits: 7, empathy_score: 88 },
  { name: 'Wed', commits: 3, empathy_score: 82 },
  { name: 'Thu', commits: 12, empathy_score: 91 },
  { name: 'Fri', commits: 8, empathy_score: 94 },
  { name: 'Sat', commits: 5, empathy_score: 89 },
  { name: 'Sun', commits: 2, empathy_score: 87 },
];

const LANGUAGE_DATA = [
  { name: 'TypeScript', value: 45, color: '#6366f1' }, // Indigo-500
  { name: 'Python', value: 30, color: '#eab308' }, // Yellow-500
  { name: 'Rust', value: 15, color: '#f97316' }, // Orange-500
  { name: 'C++', value: 10, color: '#64748b' }, // Slate-500
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
                <p className="text-slate-500">System overview and intelligence metrics.</p>
            </div>
            <div className="flex gap-2">
                 <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                    System Optimal
                 </span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
                title="Ethical Alignment" 
                value="98.2%" 
                sub="+2.4% this week" 
                icon={ShieldCheck} 
                color="bg-emerald-500 text-emerald-600" 
            />
            <StatCard 
                title="Compute Load" 
                value="42 TFLOPS" 
                sub="Running at 60% capacity" 
                icon={Zap} 
                color="bg-blue-500 text-blue-600" 
            />
            <StatCard 
                title="Active Modules" 
                value="14/15" 
                sub="1 module in maintenance" 
                icon={GitCommit} 
                color="bg-indigo-500 text-indigo-600" 
            />
             <StatCard 
                title="Collaborators" 
                value="24" 
                sub="3 active now" 
                icon={Users} 
                color="bg-purple-500 text-purple-600" 
            />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">Empathy vs. Logic Output</h3>
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
                            <Area type="monotone" dataKey="empathy_score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEmpathy)" />
                        </AreaChart>
                     </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Code Composition</h3>
                <div className="h-64 w-full flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={LANGUAGE_DATA}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {LANGUAGE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {LANGUAGE_DATA.map((lang) => (
                            <div key={lang.name} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: lang.color}}></div>
                                <span className="text-xs text-slate-500 font-medium">{lang.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
