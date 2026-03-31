import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Cpu, Droplets, FlaskConical, AlertTriangle, Activity, TrendingUp, TrendingDown,
  MapPin, Play, CheckCircle2, Clock, FileText, ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const initialSummaryStats = [
  { label: 'Active Devices', value: 42, trend: 12, icon: Cpu, color: 'bg-primary/20 text-primary', suffix: '' },
  { label: 'Sprays Today', value: 128, trend: 8, icon: Activity, color: 'bg-accent/20 text-accent', suffix: '' },
  { label: 'Chemical Usage', value: 450, trend: -5, icon: FlaskConical, color: 'bg-purple-500/20 text-purple-400', suffix: 'L' },
  { label: 'Water Usage', value: 2.4, trend: 2, icon: Droplets, color: 'bg-blue-500/20 text-blue-400', suffix: 'kL' },
  { label: 'Alerts Count', value: 3, trend: -20, icon: AlertTriangle, color: 'bg-red-500/20 text-red-400', suffix: '' },
  { label: 'Health Score', value: 98, trend: 1, icon: CheckCircle2, color: 'bg-green-500/20 text-green-400', suffix: '%' },
];

const sprayData = [
  { name: '06:00', value: 20 },
  { name: '08:00', value: 45 },
  { name: '10:00', value: 30 },
  { name: '12:00', value: 60 },
  { name: '14:00', value: 85 },
  { name: '16:00', value: 40 },
  { name: '18:00', value: 25 },
];

const chemicalData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 280 },
  { name: 'Fri', value: 590 },
  { name: 'Sat', value: 320 },
  { name: 'Sun', value: 210 },
];

const statusData = [
  { name: 'Active', value: 35, color: '#00FF94' },
  { name: 'Offline', value: 5, color: '#4A4A4A' },
  { name: 'Error', value: 2, color: '#FF4444' },
];

const recentActivity = [
  { id: 'DEV-001', time: '2 mins ago', action: 'Spray Started', status: 'active' },
  { id: 'DEV-042', time: '15 mins ago', action: 'Spray Completed', status: 'completed' },
  { id: 'DEV-012', time: '1 hour ago', action: 'Low Battery', status: 'warning' },
  { id: 'DEV-005', time: '3 hours ago', action: 'Spray Started', status: 'active' },
  { id: 'DEV-022', time: '5 hours ago', action: 'System Error', status: 'error' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(initialSummaryStats);
  const [timeRange, setTimeRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching based on time range
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // In a real app, this would be a Firestore query
      const multiplier = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
      setStats(initialSummaryStats.map(stat => ({
        ...stat,
        value: typeof stat.value === 'number' ? stat.value * multiplier : stat.value,
        trend: stat.trend * (Math.random() > 0.5 ? 1.1 : 0.9)
      })));
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [timeRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === 'Sprays Today') {
          return { ...stat, value: (stat.value as number) + (Math.random() > 0.7 ? 1 : 0) };
        }
        if (stat.label === 'Chemical Usage') {
          return { ...stat, value: (stat.value as number) + (Math.random() * 0.5) };
        }
        return stat;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
            System <span className="text-primary">Overview</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">Real-time telemetry and autonomous control center</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-2xl border border-white/10">
          {['24h', '7d', '30d'].map((range) => (
            <button 
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                timeRange === range ? "bg-primary text-black shadow-[0_0_15px_rgba(0,255,148,0.3)]" : "text-neutral-500 hover:text-white"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 transition-opacity duration-300", isLoading ? "opacity-50" : "opacity-100")}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass-card p-5 rounded-2xl group cursor-pointer overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <h4 className="text-2xl font-black text-white">{typeof stat.value === 'number' && stat.label === 'Chemical Usage' ? stat.value.toFixed(1) : stat.value}{stat.suffix}</h4>
              <span className={cn(
                "text-[10px] font-bold",
                stat.trend > 0 ? "text-primary" : "text-red-400"
              )}>
                {stat.trend > 0 ? '+' : ''}{stat.trend}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className={cn("xl:col-span-2 glass-card p-6 rounded-2xl relative overflow-hidden transition-opacity duration-300", isLoading ? "opacity-50" : "opacity-100")}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-lg uppercase italic tracking-tight">Spray Activity</h3>
              <p className="text-xs text-neutral-500">Volume (L) vs Time (Hours)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,148,0.5)]"></div> VOLUME
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sprayData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF94" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00FF94" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#666'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#666'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#00FF94', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00FF94" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-black text-lg uppercase italic tracking-tight mb-6">Device Status</h3>
          <div className="h-[240px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-white">42</span>
              <span className="text-[10px] font-bold text-neutral-500 uppercase">Total</span>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}></div>
                  <span className="text-xs font-bold text-neutral-300">{item.name}</span>
                </div>
                <span className="text-xs font-black text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Live Map */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg uppercase italic tracking-tight">Live Farm Map</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Feed</span>
            </div>
          </div>
          <div className="aspect-video bg-black/40 rounded-2xl relative overflow-hidden border border-white/5">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* Active Zones */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-primary/5 rounded-full animate-pulse border border-primary/10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/5 rounded-full animate-pulse border border-primary/10" style={{ animationDelay: '1s' }}></div>
            
            {/* Device Markers */}
            {[
              { t: '20%', l: '30%', s: 'active' },
              { t: '45%', l: '60%', s: 'active' },
              { t: '70%', l: '40%', s: 'warning' },
              { t: '30%', l: '75%', s: 'active' },
              { t: '60%', l: '20%', s: 'offline' },
            ].map((m, i) => (
              <motion.div 
                key={i} 
                className="absolute" 
                style={{ top: m.t, left: m.l }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 border-black shadow-xl",
                  m.s === 'active' ? "bg-primary shadow-primary/40" : m.s === 'warning' ? "bg-accent shadow-accent/40" : "bg-neutral-700"
                )}></div>
                {m.s === 'active' && (
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-40"></div>
                )}
              </motion.div>
            ))}

            <div className="absolute bottom-4 left-4 glass-card px-4 py-3 rounded-xl text-[10px] space-y-2">
              <div className="flex items-center gap-3 font-bold text-neutral-300">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,148,0.5)]"></div> ACTIVE SPRAYING
              </div>
              <div className="flex items-center gap-3 font-bold text-neutral-300">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,224,255,0.5)]"></div> WARNING ZONE
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg uppercase italic tracking-tight">Recent Activity</h3>
            <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                    activity.status === 'active' ? "bg-primary/10 text-primary" :
                    activity.status === 'completed' ? "bg-accent/10 text-accent" :
                    activity.status === 'warning' ? "bg-orange-500/10 text-orange-400" : "bg-red-500/10 text-red-400"
                  )}>
                    {activity.status === 'active' ? <Play size={18} /> : 
                     activity.status === 'completed' ? <CheckCircle2 size={18} /> : 
                     activity.status === 'warning' ? <Clock size={18} /> : <AlertTriangle size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{activity.action}</p>
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{activity.id} • {activity.time}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-600 group-hover:text-white transition-colors" />
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-white/5 text-xs font-bold text-neutral-500 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
