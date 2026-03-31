import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Cpu, 
  History, 
  Bell, 
  Users, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Droplets
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'devices', label: 'Devices', icon: Cpu },
  { id: 'logs', label: 'Spray Logs', icon: History },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'farms', label: 'Farms / Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "h-screen bg-black/40 backdrop-blur-2xl border-r border-white/5 transition-all duration-300 flex flex-col sticky top-0 z-40",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,148,0.4)] shrink-0">
          <Droplets size={24} strokeWidth={2.5} />
        </div>
        {!isCollapsed && (
          <span className="font-black text-xl tracking-tighter text-white uppercase italic">AgroSpray</span>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
              activeTab === item.id 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,148,0.1)]" 
                : "text-neutral-500 hover:bg-white/5 hover:text-white"
            )}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
              />
            )}
            <item.icon size={20} className={cn("shrink-0 transition-transform group-hover:scale-110", activeTab === item.id ? "text-primary" : "text-neutral-500")} />
            {!isCollapsed && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
            
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-widest rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-white/5 text-neutral-500 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
}
