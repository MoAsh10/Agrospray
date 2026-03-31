import React from 'react';
import { 
  BarChart3, TrendingUp, Droplets, FlaskConical, 
  MapPin, Calendar, Download, Filter, Info
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const efficiencyData = [
  { name: 'Week 1', water: 400, chemical: 240, efficiency: 85 },
  { name: 'Week 2', water: 300, chemical: 139, efficiency: 88 },
  { name: 'Week 3', water: 200, chemical: 980, efficiency: 82 },
  { name: 'Week 4', water: 278, chemical: 390, efficiency: 91 },
  { name: 'Week 5', water: 189, chemical: 480, efficiency: 94 },
  { name: 'Week 6', water: 239, chemical: 380, efficiency: 92 },
];

const cropUsageData = [
  { crop: 'Wheat', usage: 45 },
  { crop: 'Corn', usage: 30 },
  { crop: 'Soybeans', usage: 15 },
  { crop: 'Rice', usage: 10 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = React.useState('30d');
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(efficiencyData);

  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Simulate fetching different data for different time ranges
      const multiplier = timeRange === '7d' ? 0.5 : timeRange === '30d' ? 1 : 2.5;
      setData(efficiencyData.map(item => ({
        ...item,
        water: Math.round(item.water * multiplier),
        chemical: Math.round(item.chemical * multiplier),
        efficiency: Math.min(100, Math.round(item.efficiency * (0.95 + Math.random() * 0.1)))
      })));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
            Advanced <span className="text-primary">Analytics</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">Deep insights into your agricultural efficiency</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            {['7d', '30d', '90d'].map((range) => (
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
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(0,255,148,0.3)] hover:bg-primary/90 transition-all">
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Water Efficiency', value: '+12.5%', desc: 'Water usage reduced by 12% compared to last month', icon: Droplets, color: 'text-primary', bg: 'bg-primary/10' },
          { title: 'Spray Frequency', value: 'High', desc: 'High spray frequency detected in Zone A (North Field)', icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
          { title: 'Chemical Savings', value: '$1,240', desc: 'Optimized spray patterns saved $1,240 in chemicals', icon: FlaskConical, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl flex gap-4 group cursor-pointer"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", insight.bg, insight.color)}>
              <insight.icon size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-sm">{insight.title}</h4>
                <span className={cn("text-xs font-black", insight.color)}>{insight.value}</span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-1 leading-relaxed font-medium">{insight.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Efficiency Trend */}
        <div className={cn("glass-card p-6 rounded-2xl relative transition-opacity duration-300", isLoading ? "opacity-50" : "opacity-100")}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg uppercase italic tracking-tight">Efficiency Trends</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,148,0.5)]"></div> WATER
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,224,255,0.5)]"></div> CHEMICAL
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF94" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00FF94" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorChemical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E0FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00E0FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#666'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#666'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Area type="monotone" dataKey="water" stroke="#00FF94" fill="url(#colorWater)" strokeWidth={3} />
                <Area type="monotone" dataKey="chemical" stroke="#00E0FF" fill="url(#colorChemical)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Usage */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-black text-lg uppercase italic tracking-tight mb-8">Usage by Crop Type</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="crop" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#FFF', fontWeight: '900'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0A0A0A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="usage" fill="#00FF94" radius={[0, 8, 8, 0]} barSize={32}>
                  {cropUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00FF94' : '#00E0FF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Matrix */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-black text-lg uppercase italic tracking-tight">Zone Performance Matrix</h3>
          <button className="p-2 hover:bg-white/5 rounded-xl text-neutral-500 transition-colors">
            <Info size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">{zone}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-white">{(90 + i * 2)}%</span>
                <span className="text-[10px] text-primary font-black mb-1">↑ 2.4%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${90 + i * 2}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full bg-primary shadow-[0_0_10px_rgba(0,255,148,0.5)] rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
