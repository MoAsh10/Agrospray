import React, { useState } from 'react';
import { 
  Cpu, Battery, Signal, Clock, Play, Square, 
  Settings, ChevronRight, Search, Filter, MoreVertical,
  Droplets, Thermometer, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Device } from '../types';

const mockDevices: Device[] = [
  { id: 'DEV-001', name: 'Sprayer Alpha 1', status: 'online', battery: 85, lastActive: 'Just now', flowRate: 2.4, pumpStatus: true, location: { lat: 0, lng: 0 } },
  { id: 'DEV-002', name: 'Sprayer Alpha 2', status: 'online', battery: 42, lastActive: '5 mins ago', flowRate: 0, pumpStatus: false, location: { lat: 0, lng: 0 } },
  { id: 'DEV-003', name: 'Sprayer Beta 1', status: 'offline', battery: 0, lastActive: '2 hours ago', flowRate: 0, pumpStatus: false, location: { lat: 0, lng: 0 } },
  { id: 'DEV-004', name: 'Sprayer Beta 2', status: 'error', battery: 12, lastActive: '10 mins ago', flowRate: 1.2, pumpStatus: true, location: { lat: 0, lng: 0 } },
  { id: 'DEV-005', name: 'Sprayer Gamma 1', status: 'online', battery: 98, lastActive: 'Just now', flowRate: 2.8, pumpStatus: true, location: { lat: 0, lng: 0 } },
];

export default function Devices() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [devices, setDevices] = useState(mockDevices);

  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTogglePump = (deviceId: string, status: boolean) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, pumpStatus: status, status: status ? 'online' : 'online' } : device
    ));
    if (selectedDevice?.id === deviceId) {
      setSelectedDevice(prev => prev ? { ...prev, pumpStatus: status } : null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
            Device <span className="text-primary">Management</span>
          </h1>
          <p className="text-neutral-500 text-sm font-medium">Monitor and control your IoT spray units</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search devices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all w-64"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-neutral-500 hover:text-white hover:bg-white/10 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase tracking-widest text-neutral-500 font-black">
                  <th className="px-6 py-4">Device Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Battery</th>
                  <th className="px-6 py-4">Last Active</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDevices.map((device) => (
                  <tr 
                    key={device.id}
                    onClick={() => setSelectedDevice(device)}
                    className={cn(
                      "group cursor-pointer transition-all hover:bg-white/5",
                      selectedDevice?.id === device.id ? "bg-primary/5" : ""
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                          selectedDevice?.id === device.id ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(0,255,148,0.2)]" : "bg-white/5 text-neutral-500"
                        )}>
                          <Cpu size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white">{device.name}</p>
                          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{device.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          device.status === 'online' ? "bg-primary shadow-[0_0_8px_rgba(0,255,148,0.5)]" : device.status === 'offline' ? "bg-neutral-600" : "bg-accent shadow-[0_0_8px_rgba(0,224,255,0.5)]"
                        )}></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{device.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              device.battery > 50 ? "bg-primary" : device.battery > 20 ? "bg-accent" : "bg-red-500"
                            )}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-black text-neutral-400">{device.battery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{device.lastActive}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-white/10 rounded-xl text-neutral-500 hover:text-white transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Detail / Control */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedDevice ? (
              <motion.div
                key={selectedDevice.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-card p-6 space-y-8 sticky top-24 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,255,148,0.1)]">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-white italic tracking-tight">{selectedDevice.name}</h3>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{selectedDevice.id}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-xl text-neutral-500 hover:text-white transition-colors">
                    <Settings size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-500 mb-2">
                      <Droplets size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Flow Rate</span>
                    </div>
                    <p className="text-2xl font-black text-white">{selectedDevice.flowRate} <span className="text-xs font-bold text-neutral-500">L/min</span></p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-neutral-500 mb-2">
                      <Zap size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Pump Status</span>
                    </div>
                    <p className={cn(
                      "text-2xl font-black italic tracking-tight",
                      selectedDevice.pumpStatus ? "text-primary glow-text" : "text-neutral-600"
                    )}>{selectedDevice.pumpStatus ? 'ACTIVE' : 'IDLE'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Quick Controls</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleTogglePump(selectedDevice.id, true)}
                      className={cn(
                        "flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                        selectedDevice.pumpStatus ? "bg-primary/20 text-primary cursor-default" : "bg-primary text-black shadow-[0_0_20px_rgba(0,255,148,0.3)] hover:bg-primary/90"
                      )}
                    >
                      <Play size={18} fill="currentColor" />
                      Start Spray
                    </button>
                    <button 
                      onClick={() => handleTogglePump(selectedDevice.id, false)}
                      className={cn(
                        "flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                        !selectedDevice.pumpStatus ? "bg-white/10 text-neutral-500 cursor-default" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      )}
                    >
                      <Square size={18} fill="currentColor" />
                      Stop
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Recent Logs</h4>
                  <div className="space-y-2">
                    {[
                      { time: '10:42 AM', event: 'Spray cycle completed', type: 'success' },
                      { time: '10:15 AM', event: 'Pump started', type: 'info' },
                      { time: '09:30 AM', event: 'Low pressure detected', type: 'warning' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold">
                        <span className="text-neutral-500 font-mono">{log.time}</span>
                        <span className="text-neutral-300 uppercase tracking-widest">{log.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white/5 border-2 border-dashed border-white/10 rounded-3xl text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-neutral-700 mb-6 border border-white/5">
                  <Cpu size={40} />
                </div>
                <h3 className="font-black text-white uppercase italic tracking-tight">No Device Selected</h3>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2 max-w-[200px]">Select a device from the list to view telemetry and command it.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
