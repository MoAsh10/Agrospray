import React from 'react';
import { Search, Bell, User, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  return (
    <header className="h-20 bg-black/20 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
          <input 
            type="text" 
            placeholder="Search devices, logs, or farms..." 
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none text-white placeholder:text-neutral-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-xl hover:bg-white/5 text-neutral-400 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button className="p-2 rounded-xl hover:bg-white/5 text-neutral-400 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-black shadow-[0_0_10px_rgba(0,255,148,0.5)]"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Mohamed Ashwath</p>
            <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">System Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-white/10 overflow-hidden shadow-lg group-hover:border-primary/50 transition-all">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
