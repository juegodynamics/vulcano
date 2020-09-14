import { Logger } from 'tslog';

import { LocalConfig, VulcanoConfig } from './config';

export interface VulcanoContext {
  config: VulcanoConfig;
  log: Logger;
}

const LocalVulcanoContext: VulcanoContext = {
  config: LocalConfig,
  log: new Logger({ name: 'vulcano' }),
};

export const VULC = () => LocalVulcanoContext;
