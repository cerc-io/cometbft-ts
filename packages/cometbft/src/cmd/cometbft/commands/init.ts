import * as cfg from '../../../config/config';
import { config } from '../cometbft';

const initFiles = async (argv: any): Promise<void> => {
  await initFilesWithConfig(config);
};

// TODO: Implement
const initFilesWithConfig = async (config: cfg.Config): Promise<void> => {};

// InitFilesCmd initializes a fresh CometBFT instance.
export const command = 'init';
export const desc = 'Initialize CometBFT';
export const builder = {};
export const handler = initFiles;
