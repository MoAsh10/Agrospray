import React from 'react';
import { 
  AlertTriangle, Info, AlertCircle, Bell, 
  MoreVertical, CheckCircle2, Trash2, Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Alert } from '../types';

const mockAlerts: Alert[] = [
  { id: '1', title: 'Pump Failure', message: 'Pump on DEV-004 has stopped unexpectedly. Immediate inspection required.', severity: 'critical', time: '2 mins ago', isRead: false },
  { id: '2', title: 'Low Chemical Level', message: 'Chemical tank on DEV-012 is below 10%. Refill scheduled.', severity: 'warning', time: '15 mins ago', isRead: false },
  { id: '3', title: 'Nozzle Blockage', message: 'Potential blockage detected in Nozzle 3 of DEV-008.', severity: 'warning', time: '1 hour ago', isRead: true },
  { id: '4', title: 'System Update', message: 'New firmware version 2.4.0 is available for all Alpha series devices.', severity: 'info', time: '3 hours ago', isRead: true },
  { id: '5', title: 'Battery Low', message: 'DEV-022 battery level is at 15%. Returning to base.', severity: 'warning', time: '5 hours ago', isRead: true },
];

export default function Alerts() {
  const [alerts, setAlerts] = React.useState(mockAlerts);

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => alert.id === id ? { ...alert, isRead: true } : alert));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
            System <span className="text-primary">Alerts</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">Manage notifications and critical system events</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-neutral-400 hover:text-white transition-all flex items-center gap-2 uppercase tracking-widest"
          >
            <CheckCircle2 size={16} />
            Mark all as read
          </button>
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => markAsRead(alert.id)}
            className={cn(
              "glass-card p-6 rounded-2xl border transition-all hover:bg-white/5 flex gap-6 group relative cursor-pointer",
              alert.isRead ? "border-white/5" : "border-primary/30 shadow-[0_0_20px_rgba(0,255,148,0.1)]"
            )}
          >
            {!alert.isRead && (
              <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(0,255,148,0.5)]"></div>
            )}
            
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
              alert.severity === 'critical' ? "bg-accent/20 text-accent" :
              alert.severity === 'warning' ? "bg-primary/20 text-primary" : "bg-white/10 text-neutral-400"
            )}>
              {alert.severity === 'critical' ? <AlertCircle size={28} /> :
               alert.severity === 'warning' ? <AlertTriangle size={28} /> : <Info size={28} />}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h4 className="font-black text-white italic tracking-tight text-lg">{alert.title}</h4>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                  alert.severity === 'critical' ? "bg-accent/20 text-accent" :
                  alert.severity === 'warning' ? "bg-primary/20 text-primary" : "bg-white/10 text-neutral-500"
                )}>
                  {alert.severity}
                </span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-auto">{alert.time}</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed font-medium">{alert.message}</p>
              
              <div className="flex items-center gap-6 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Take Action</button>
                <button className="text-[10px] font-black text-neutral-500 uppercase tracking-widest hover:text-white transition-colors">Dismiss</button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAlert(alert.id);
                  }}
                  className="text-[10px] font-black text-accent/60 hover:text-accent transition-colors flex items-center gap-1.5 ml-auto uppercase tracking-widest"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button className="text-[10px] font-black text-neutral-500 hover:text-primary transition-all uppercase tracking-widest border-b border-transparent hover:border-primary pb-1">
          Load older notifications
        </button>
      </div>
    </div>
  );
}
