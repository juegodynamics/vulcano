import path from 'path';

export interface VulcanoConfig {
  server: {
    port: string;
    components: {
      cookbook: {
        sourceType: 'LOCAL_DATA';
        recipeFilePath: string;
        entityFilePath: string;
      };
    };
  };
}

export const LocalConfig: VulcanoConfig = {
  server: {
    port: '3005',
    components: {
      cookbook: {
        sourceType: 'LOCAL_DATA',
        recipeFilePath: path.resolve('src/server/data/recipes.json'),
        entityFilePath: path.resolve('src/server/data/entities.json'),
      },
    },
  },
};
