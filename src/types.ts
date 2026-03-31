export type DeviceStatus = 'online' | 'offline' | 'error';
export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  battery: number;
  lastActive: string;
  flowRate: number;
  pumpStatus: boolean;
  location: { lat: number; lng: number };
}

export interface SprayLog {
  id: string;
  date: string;
  duration: string;
  areaCovered: string;
  chemicalUsed: string;
  status: 'completed' | 'interrupted' | 'scheduled';
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  time: string;
  isRead: boolean;
}

export interface SummaryStat {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}
