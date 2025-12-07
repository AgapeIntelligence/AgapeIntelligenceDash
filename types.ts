export enum View {
  DASHBOARD = 'DASHBOARD',
  REPOSITORY = 'REPOSITORY',
  INTELLIGENCE = 'INTELLIGENCE',
  SETTINGS = 'SETTINGS'
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}
