import fs from 'fs';

import { transferModData } from '../../server/utils/io/zip';

const MOD_SRC_DIR = '~/Library/Application Support/factorio/mods/';
const MOD_DST_DIR = './export/factorio/mods';

const unzip = () => {
  console.log('starting!');
  fs.readdir(MOD_SRC_DIR, (err, files) => {
    if (err) throw err;
    console.log(`will try reading ${files.length} files`);
    files.forEach(file => {
      const fullFilePath = `${MOD_SRC_DIR}${file}`;
      console.log(`will try reading '${fullFilePath}'`);
      transferModData(fullFilePath, MOD_DST_DIR)
        .then(() => {
          console.log('done');
        })
        .catch(e => console.log(`failed! :( ${e}`));
    });
  });
  console.log('all finished!');
};

unzip();
