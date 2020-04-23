import express, { Request, Response } from 'express';

import { getSystemInfo, responseWrapper } from '../utils';

const router = express.Router();

router.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await getSystemInfo();
      responseWrapper(res, 200, 'System info retrieved successfully', data);
    } catch (error) {
      responseWrapper(res, 500, error.message);
    }
  }
);

export default router;
