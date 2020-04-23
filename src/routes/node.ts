import express, { Request, Response } from 'express';
import fs from 'fs';

import config from '../configs';
import { bashAuth, checkOs } from '../middlewares';
import { bash, responseWrapper } from '../utils';
import { liskPath, supportedCommands } from '../constants';

const router = express.Router();

router.use(checkOs);
router.use(bashAuth);

router.post('/logs', (req: Request, res: Response): void => {
  const file = `${liskPath}/logs/${config.lisk.network}/lisk.log`;

  try {
    if (!fs.existsSync(file)) {
      responseWrapper(res, 500, 'Could not find log file.');
      return;
    }

    res.download(file);
  } catch (error) {
    responseWrapper(res, 500, error.message);
  }
});

router.post(
  '/:command',
  async (req: Request, res: Response): Promise<void> => {
    const command = req.params.command;

    if (!supportedCommands.includes(command)) {
      responseWrapper(res, 400, `Command '${command}' not recognized`);
      return;
    }

    try {
      const data = await bash(command);
      responseWrapper(res, 200, 'Bash command executed successfully', data);
    } catch (error) {
      responseWrapper(res, 500, error.message);
    }
  }
);

export default router;
