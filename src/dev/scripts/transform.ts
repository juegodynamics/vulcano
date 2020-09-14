import fs from 'fs';
import path from 'path';

import { Logger } from 'tslog';

import { asyncForEach } from '../../utils/arr';
import { TableParser } from '../../utils/lua/table';

const log = new Logger({ name: 'vulcli.transform' });

const SRC_DIR = 'src/dev/data';
const DST_DIR = 'src/server/data';

type IndexField = {
  fieldName: string;
  fieldIndexerType: 'array' | 'value';
  indexNamer: (fieldValue) => { indexKey: string | string[] };
};

const bulkTransformLuaStream = async ({
  bulkInputPath,
  bulkOutputPath,
  indexFields,
}: {
  bulkInputPath: string;
  bulkOutputPath: string;
  indexFields?: Array<IndexField>;
}) => {
  log.info(`Reading tables from ${bulkInputPath}`);
  const bulkInput = await fs.promises.readFile(bulkInputPath);

  let nameMasterIndex: Record<string, Record<string, string[]>> = {};
  if (indexFields) {
    indexFields.forEach(f => {
      log.info(`Will create index for field ${f.fieldName}`);
      nameMasterIndex = {
        ...nameMasterIndex,
        [f.fieldName]: {},
      };
    });
  }

  const nameMaster: Record<string, any> = bulkInput
    .toString('utf-8')
    .split('\n')
    .map(line => {
      const parsedObject = new TableParser().parseRawTable(line) as Record<string, any> & {
        name: string;
      };

      if (indexFields) {
        indexFields.forEach(f => {
          if (parsedObject[f.fieldName]) {
            nameMasterIndex = {
              ...nameMasterIndex,
              [f.fieldName]:
                f.fieldIndexerType === 'array'
                  ? {
                      ...nameMasterIndex[f.fieldName],
                      ...parsedObject[f.fieldName].reduce((subIndex, entry) => {
                        const { indexKey } = f.indexNamer(entry);
                        if (typeof indexKey === 'string') {
                          const partialMasterValue = nameMasterIndex[f.fieldName][indexKey];
                          return {
                            ...subIndex,
                            [indexKey]: partialMasterValue
                              ? [...partialMasterValue, parsedObject.name]
                              : [parsedObject.name],
                          };
                        }
                        return {
                          ...subIndex,
                          ...indexKey.reduce((subsubIndex, key) => {
                            const partialMasterValue = nameMasterIndex[f.fieldName][key];
                            return {
                              ...subsubIndex,
                              [key]: partialMasterValue
                                ? [...partialMasterValue, parsedObject.name]
                                : [parsedObject.name],
                            };
                          }, {}),
                        };
                      }, {}),
                    }
                  : (() => {
                      const { indexKey } = f.indexNamer(parsedObject[f.fieldName]);
                      if (typeof indexKey === 'string') {
                        const partialMasterValue = nameMasterIndex[f.fieldName][indexKey];
                        return {
                          ...nameMasterIndex[f.fieldName],
                          [indexKey]: partialMasterValue
                            ? [...partialMasterValue, parsedObject.name]
                            : [parsedObject.name],
                        };
                      }
                      return {
                        ...nameMasterIndex[f.fieldName],
                        ...indexKey.reduce((subindex, key) => {
                          const partialMasterValue = nameMasterIndex[f.fieldName][key];
                          return {
                            ...subindex,
                            [key]: partialMasterValue
                              ? [...partialMasterValue, parsedObject.name]
                              : [parsedObject.name],
                          };
                        }, {}),
                      };
                    })(),
            };
          }
        });
      }

      return parsedObject;
    })
    .reduce(
      (partial, nameObject) => ({
        ...partial,
        [nameObject.name]: nameObject,
      }),
      {}
    );

  log.info(`Writing to ${bulkOutputPath}`);
  await fs.promises.writeFile(bulkOutputPath, JSON.stringify(nameMaster, null, 2));

  if (indexFields) {
    asyncForEach(Object.entries(nameMasterIndex), async ([fieldName, fieldIndex]) => {
      const indexFilePath = bulkOutputPath.replace('.json', `.${fieldName}-index.json`);
      log.info(`Writing to ${indexFilePath}`);
      await fs.promises.writeFile(indexFilePath, JSON.stringify(fieldIndex, null, 2));
    });
  }
};

const bulkTransformDirectoryLuaStreams = ({ src, dst }: { src: string; dst: string }) => {
  fs.readdir(src, (err, files) => {
    if (err) throw err;
    asyncForEach(files, async file => {
      if (file.endsWith('.lua.stream')) {
        await bulkTransformLuaStream({
          bulkInputPath: path.resolve(src, file),
          bulkOutputPath: path.resolve(dst, file.replace('.lua.stream', '.json')),
          indexFields: ((): Array<IndexField> | null => {
            switch (path.basename(file, '.lua.stream')) {
              case 'recipes':
                return [
                  {
                    fieldName: 'ingredients',
                    fieldIndexerType: 'array',
                    indexNamer: v => ({ indexKey: v.name }),
                  },
                  {
                    fieldName: 'products',
                    fieldIndexerType: 'array',
                    indexNamer: v => ({ indexKey: v.name }),
                  },
                  {
                    fieldName: 'category',
                    fieldIndexerType: 'value',
                    indexNamer: v => ({ indexKey: v }),
                  },
                ];
              case 'entities':
                return [
                  {
                    fieldName: 'crafting_categories',
                    fieldIndexerType: 'value',
                    indexNamer: v => ({ indexKey: Object.keys(v).filter(k => !!v[k]) }),
                  },
                ];
            }
            return null;
          })(),
        });
      }
    });
  });
};

bulkTransformDirectoryLuaStreams({ src: SRC_DIR, dst: DST_DIR });
