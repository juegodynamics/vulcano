import { VulcanoContext } from 'src/context';
import Router from 'express-promise-router';
import EquatorHandler from './handler';

const EquatorRouter = (_vulc: VulcanoContext) => {
  const handler = new EquatorHandler();
  const router = Router();

  router.post(`/reduce`, async (req, res) => {
    const { numerator, denominator } = req.body;
    return res.json(await handler.calculateReduction({ numerator, denominator }));
  });

  return router;
};

export default EquatorRouter;
