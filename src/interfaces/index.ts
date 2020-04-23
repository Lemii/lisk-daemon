import os from 'os';

export interface IConfig {
  api: {
    port: number;
    whitelist: string[];
    maxRequestsPerSecond: number;
  };
  lisk: {
    network: 'mainnet' | 'testnet';
  };
  logging: {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny';
    outputToConsole: boolean;
    outputToFile: boolean;
    logFile: string;
  };
  nodeCommands: {
    allow: boolean;
    key: string;
  };
}

export interface ISystemInfo {
  hostname: string;
  loadAverage: number[];
  uptime: number;
  memory: {
    total: number;
    free: number;
  };
  disk: {
    total: number;
    free: number;
  };
  cpus: os.CpuInfo[];
  type: string;
  release: string;
}
