import app from './app';
import config from './config';

app.listen(config.api.port, (): void => {
  console.log(
    `LISK MANAGER DAEMON (v${process.env.npm_package_version})\nRunning in ${process.env.NODE_ENV} mode on port ${config.api.port} ✔️\n`
  );
});
