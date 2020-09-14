import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Router from 'express-promise-router';

import { VulcanoContext } from 'src/context';

import createAPI from './api';

const VulcanoService = async (vulc: VulcanoContext) => {
  const router = Router();
  router.use(
    cookieParser(),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
    // TODO: auth.initialize()
  );
  router.use('/api', createAPI(vulc));
  return router;
};

export default VulcanoService;
