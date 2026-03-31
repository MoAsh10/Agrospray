import React from 'react';
import { 
  History, Search, Filter, Download, 
  Calendar, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SprayLog } from '../types';

const mockLogs: SprayLog[] = [
  { id: 'LOG-001', date: '2026-03-31', duration: '45 mins', areaCovered: '12.5 acres', chemicalUsed: '45L Alpha-Mix', status: 'completed' },
  { id: 'LOG-002', date: '2026-03-31', duration: '12 mins', areaCovered: '2.1 acres', chemicalUsed: '8L Beta-Shield', status: 'interrupted' },
  { id: 'LOG-003', date: '2026-03-30', duration: '60 mins', areaCovered: '18.0 acres', chemicalUsed: '60L Alpha-Mix', status: 'completed' },
  { id: 'LOG-004', date: '2026-03-30', duration: '30 mins', areaCovered: '8.4 acres', chemicalUsed: '25L Gamma-Grow', status: 'completed' },
  { id: 'LOG-005', date: '2026-03-29', duration: '40 mins', areaCovered: '11.2 acres', chemicalUsed: '40L Alpha-Mix', status: 'completed' },
  { id: 'LOG-006', date: '2026-03-29', duration: '15 mins', areaCovered: '3.5 acres', chemicalUsed: '12L Beta-Shield', status: 'completed' },
  { id: 'LOG-007', date: '2026-03-28', duration: '55 mins', areaCovered: '16.8 acres', chemicalUsed: '55L Alpha-Mix', status: 'completed' },
];

export default function SprayLogs() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [logs, setLogs] = React.useState(mockLogs);

  const filteredLogs = logs.filter(log => 
    log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.chemicalUsed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
            Spray <span className="text-primary">History</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">Detailed logs of all spraying activities</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-neutral-400 hover:text-white transition-all">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(0,255,148,0.3)] hover:bg-primary/90 transition-all">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-neutral-500 font-black">
              <th className="px-6 py-4">Log ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Area Covered</th>
              <th className="px-6 py-4">Chemical Used</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-all group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-500 group-hover:text-primary transition-colors">
                      <History size={18} />
                    </div>
                    <span className="text-sm font-black text-white italic tracking-tight">{log.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">{log.date}</td>
                <td className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">{log.duration}</td>
                <td className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">{log.areaCovered}</td>
                <td className="px-6 py-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">{log.chemicalUsed}</td>
                <td className="px-6 py-4">
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    log.status === 'completed' ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,255,148,0.2)]" :
                    log.status === 'interrupted' ? "bg-accent/20 text-accent shadow-[0_0_10px_rgba(0,224,255,0.2)]" : "bg-white/10 text-neutral-500"
                  )}>
                    {log.status === 'completed' ? <CheckCircle2 size={12} /> :
                     log.status === 'interrupted' ? <XCircle size={12} /> : <Clock size={12} />}
                    {log.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-6 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Showing 1 to 7 of 42 entries</p>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl border border-white/10 text-neutral-500 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30" disabled>
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, '...', 6].map((p, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "w-9 h-9 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest",
                    p === 1 ? "bg-primary text-black shadow-[0_0_15px_rgba(0,255,148,0.3)]" : "text-neutral-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-xl border border-white/10 text-neutral-500 hover:text-white hover:bg-white/5 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
