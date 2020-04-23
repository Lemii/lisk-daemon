import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import os from 'os';

import config from '../configs';
import { responseWrapper } from '../utils';
import { accessLogStream } from '../constants';

export const limiter = rateLimit({
  windowMs: 1000,
  max: config.api.maxRequestsPerSecond,
  message: { status: 429, message: 'Too many requests, please try again later.' }
});

export const checkIp = (req: Request, res: Response, next: NextFunction): void => {
  let ip = req.connection.remoteAddress!.replace('::ffff:', '');

  if (!config.api.whitelist.includes(ip)) {
    responseWrapper(res, 401, 'Unauthorized');
    return;
  }

  next();
};

export const checkOs = (req: Request, res: Response, next: NextFunction): void => {
  const platform = os.platform();

  if (platform.toLocaleLowerCase() !== 'linux') {
    responseWrapper(res, 500, `Platform '${platform}' not supported`);
    return;
  }

  next();
};

export const bashAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!config.nodeCommands.allow) {
    responseWrapper(res, 403, 'Bash commands are disabled');
    return;
  }

  if (config.nodeCommands.key) {
    if (config.nodeCommands.key !== req.body.key) {
      responseWrapper(res, 401, 'Unauthorized');
      return;
    }
  }

  next();
};

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

export const logToFile = morgan(config.logging.format, { stream: accessLogStream });

export const logToConsole = morgan(config.logging.format);
