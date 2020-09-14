import { VulcanoContext } from 'src/context';
import Router from 'express-promise-router';
import { CookbookDAL_Filesystem } from './dal';
import CookbookHandler from './handler';
import { ICookbookDAL } from './types';

const createNameRoute = <ResponseT>({
  router,
  path,
  getter,
}: {
  router: ReturnType<typeof Router>;
  path: string;
  getter: (req: { name: string }) => Promise<ResponseT>;
}) => {
  router.get(`${path}/:name`, async (req, res) => {
    const { name } = req.params;
    return res.json(await getter({ name }));
  });
};

const createSearchRoute = <BodyT, ResponseT>({
  router,
  path,
  searcher,
}: {
  router: ReturnType<typeof Router>;
  path: string;
  searcher: (req: BodyT) => Promise<ResponseT>;
}) => {
  router.post(`${path}/search`, async (req, res) => {
    return res.json(await searcher(req.body));
  });
};

const CookbookRouter = (vulc: VulcanoContext) => {
  const cookbook = vulc.config.server.components.cookbook;

  let dal: ICookbookDAL;
  switch (cookbook.sourceType) {
    case 'LOCAL_DATA':
      dal = new CookbookDAL_Filesystem({
        recipeFilePath: cookbook.recipeFilePath,
        entityFilePath: cookbook.entityFilePath,
      });
      break;
    default:
      throw new Error(`received unsupported recipe source type: ${cookbook.sourceType}`);
  }

  const handler = new CookbookHandler({ cookbookDAL: dal });
  const router = Router();

  createNameRoute({ router, path: '/recipe', getter: handler.getRecipe });
  createSearchRoute({ router, path: '/recipe', searcher: handler.searchRecipes });

  createNameRoute({ router, path: '/entity', getter: handler.getEntity });
  createSearchRoute({ router, path: '/entity', searcher: handler.searchEntities });

  return router;
};

export default CookbookRouter;
