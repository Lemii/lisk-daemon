import { IConfig } from './interfaces';

const config: IConfig = {
  api: {
    port: 8765,
    whitelist: ['127.0.0.1', '::1', '::ffff:127.0.0.1'],
    maxRequestsPerSecond: 3
  },
  lisk: {
    network: 'testnet' // 'mainnet' | 'testnet'
  },
  logging: {
    format: 'common', // 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    outputToConsole: false,
    outputToFile: true,
    logFile: '../logs/access.log'
  },
  nodeCommands: {
    allow: false,
    key: '' // use empty string for no authentication
  }
};

export default config;
