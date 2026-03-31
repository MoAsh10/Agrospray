/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Devices from './components/Devices';
import SprayLogs from './components/SprayLogs';
import Alerts from './components/Alerts';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'analytics': return <Analytics />;
      case 'devices': return <Devices />;
      case 'logs': return <SprayLogs />;
      case 'alerts': return <Alerts />;
      default: return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="text-xl font-bold text-dark">Page Under Construction</h2>
          <p className="text-gray-400 mt-2">We're working hard to bring this feature to you.</p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="mt-6 text-primary font-bold hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#050505]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,255,148,0.5)]"></div>
          </div>
        </div>
        <p className="text-primary font-black mt-8 uppercase tracking-[0.3em] italic animate-pulse">Initializing <span className="text-white">AgroSpray</span> System...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-black">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Background Glows */}
        <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 p-8 overflow-y-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="px-8 py-6 bg-black/20 backdrop-blur-xl border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-black uppercase tracking-[0.2em] relative z-20">
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">© 2026 <span className="text-primary italic">AgroSpray</span></span>
            <span className="w-1 h-1 bg-white/10 rounded-full"></span>
            <span className="hover:text-white transition-colors cursor-pointer">v2.4.0-stable</span>
            <span className="w-1 h-1 bg-white/10 rounded-full"></span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Protocol Active</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2.5 group cursor-pointer">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,148,0.5)] group-hover:scale-125 transition-transform"></div>
              <span className="group-hover:text-primary transition-colors">All Systems Operational</span>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

