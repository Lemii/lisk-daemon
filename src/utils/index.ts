import { Response } from 'express';
import os, { release } from 'os';
import crypto from 'crypto';
import * as disk from 'diskusage';
import util from 'util';

import { liskPath, snapshotServer } from '../constants';
import { ISystemInfo } from '../interfaces';

export const getSystemInfo = async (): Promise<ISystemInfo> => {
  const path = os.platform() === 'win32' ? 'c:' : '/';

  const { total, free } = await disk.check(path);

  return {
    hostname: os.hostname(),
    loadAverage: os.loadavg(),
    uptime: os.uptime(),
    memory: { total: os.totalmem(), free: os.freemem() },
    disk: { total, free },
    cpus: os.cpus(),
    type: os.type(),
    release: release()
  };
};

export const bash = async (command: string): Promise<string> => {
  let sh = `bash ${liskPath}/lisk.sh ${command}`;

  if (command === 'rebuild') {
    sh = `bash ${liskPath}/lisk.sh ${command} -u ${snapshotServer}`;
  }

  const exec = util.promisify(require('child_process').exec);
  const { stdout } = await exec(sh);

  return stdout;
};

export const responseWrapper = (res: Response, status: number, message: string, data?: any): void => {
  res.status(status).send({ status, message, ...(data && { data }) });
};

export const hash = (data: string): string =>
  crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
