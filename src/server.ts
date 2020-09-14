import express from 'express';
import VulcanoService from './server/service';
import { VULC } from './context';

const vulc = VULC();

const start = async () => {
  const startTime = new Date();
  vulc.log.info(`vulcano starting at ${startTime.toTimeString()}...`);

  const app = express();
  app.disable('x-powered-by');
  app.use(await VulcanoService(vulc));

  const PORT = vulc.config.server.port;
  app.listen(PORT, () => vulc.log.info(`Listening on port ${PORT}`));
};

start().catch(e => {
  vulc.log.error('vulcano shutting down', e);
  process.exit(1);
});
