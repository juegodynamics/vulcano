import { VulcanoContext } from 'src/context';
import Router from 'express-promise-router';
import Cookbook from './components/cookbook';
import Equator from './components/equator';
import Lua from './components/lua';

const createAPI = (vulc: VulcanoContext) => {
  const router = Router();

  [Cookbook, Equator, Lua].forEach(module => {
    router.use(`/${module.__namespace__()}`, module.Router(vulc));
  });

  return router;
};

export default createAPI;
