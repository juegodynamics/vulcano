import { Logger } from 'tslog';
import { VulcanoConfig, LocalConfig } from './config';

export interface VulcanoContext {
  config: VulcanoConfig;
  log: Logger;
}

const LocalVulcanoContext: VulcanoContext = {
  config: LocalConfig,
  log: new Logger({ name: 'vulcano' }),
};

export const VULC = () => LocalVulcanoContext;
