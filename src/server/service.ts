import bodyParser from 'body-parser';
import { VulcanoContext } from 'src/context';
import cookieParser from 'cookie-parser';
import Router from 'express-promise-router';
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
