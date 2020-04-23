import fs from 'fs';
import path from 'path';
import config from './config';

export const liskPath: string = config.lisk.network === 'mainnet' ? '/home/lisk/lisk-main' : '/home/lisk/lisk-test';

export const snapshotServer: string =
  config.lisk.network === 'mainnet' ? 'https://snapshot.liskapi.io/' : 'https://testnet-snapshot.liskapi.io/';

export const supportedCommands: string[] = ['start', 'stop', 'reload', 'status'];

export const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(__dirname, config.logging.logFile), {
  flags: 'a'
});
