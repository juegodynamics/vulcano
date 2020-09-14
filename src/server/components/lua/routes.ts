import { VulcanoContext } from 'src/context';
import Router from 'express-promise-router';
import LuaHandler from './handler';

const LuaRouter = (_vulc: VulcanoContext) => {
  const handler = new LuaHandler();
  const router = Router();

  router.post('/table', async (req, res) => {
    const { data } = req.body;
    return res.json(await handler.convertLuaTable(data));
  });

  return router;
};

export default LuaRouter;
