import userConfig from '../config';
import { IConfig } from '../interfaces';

declare const process: {
  env: {
    NODE_ENV: 'production' | 'development' | 'test';
  };
};

const env = process.env.NODE_ENV;

const template: IConfig = {
  api: {
    port: userConfig.api.port || 8765,
    whitelist: userConfig.api.whitelist || ['127.0.0.1', '::1', '::ffff:127.0.0.1'],
    maxRequestsPerSecond: userConfig.api.maxRequestsPerSecond || 3
  },
  lisk: {
    network: userConfig.lisk.network || 'testnet'
  },
  logging: {
    format: userConfig.logging.format || 'common',
    outputToConsole: userConfig.logging.outputToConsole || false,
    outputToFile: userConfig.logging.outputToFile || true,
    logFile: userConfig.logging.logFile || '../logs/access.log'
  },
  nodeCommands: {
    allow: userConfig.nodeCommands.allow || false,
    key: userConfig.nodeCommands.key || ''
  }
};

const production: IConfig = {
  ...template
};

const development: IConfig = {
  ...template
};

const test: IConfig = {
  ...template,
  nodeCommands: {
    allow: true,
    key: 'eb8d24e4-8e3a-4c22-89e2-649fa3a222b4'
  }
};

const config = {
  production,
  development,
  test
};

export default config[env];
