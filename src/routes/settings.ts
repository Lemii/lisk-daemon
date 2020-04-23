import express, { Request, Response } from 'express';

import config from '../configs';
import { responseWrapper } from '../utils';

const router = express.Router();

router.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const data = {
      systemInfo: true,
      nodeCommands: config.nodeCommands.allow,
      key: config.nodeCommands.key.length > 0
    };

    responseWrapper(res, 200, 'Daemon settings retrieved successfully', data);
  }
);

export default router;
