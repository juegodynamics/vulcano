import fs from 'fs';
import unzipper from 'unzipper';

export const transferModData = async (src: string, dst: string) => {
  fs.createReadStream(src).pipe(unzipper.Extract({ path: dst }));
};
