import express, { Request, Response } from 'express';

import { responseWrapper } from '../utils';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  responseWrapper(res, 200, 'Lisk Manager Daemon status OK');
});

export default router;
