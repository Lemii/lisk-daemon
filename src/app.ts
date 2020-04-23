import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config';
import { limiter, checkIp, cors, logToConsole, logToFile } from './middlewares';

import systemRoute from './routes/system';
import nodeRoute from './routes/node';
import fallbackRoute from './routes/fallback';
import settingsRoute from './routes/settings';

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(checkIp);
app.use(cors);

config.logging.outputToConsole && app.use(logToConsole);
config.logging.outputToFile && app.use(logToFile);
process.env.NODE_ENV !== 'test' && app.use(limiter);

app.use('/system', systemRoute);
app.use('/node', nodeRoute);
app.use('/settings', settingsRoute);
app.use('/', fallbackRoute);

export default app;
