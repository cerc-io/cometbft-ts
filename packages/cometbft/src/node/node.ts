import debug from 'debug';

import * as cfg from '../config/config';
import * as service from '../libs/service/service';

const log = debug('cometbft:node');

// Node is the highest level interface to a full CometBFT node.
// It includes all configuration information and running services.
// TODO: Implement
export class Node extends service.BaseService {}

// DefaultNewNode returns a CometBFT node with default settings for the
// PrivValidator, ClientCreator, GenesisDoc, and DBProvider.
// It implements NodeProvider.
// TODO: Implement
// TODO: Can throw an error
export const defaultNewNode = (config: cfg.Config, logger: debug.Debugger): Node => {
  return {} as Node;
};
