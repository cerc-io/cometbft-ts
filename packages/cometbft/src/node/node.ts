import debug from 'debug';

import * as cfg from '../config/config';
import * as service from '../libs/service/service';
import { GenesisDoc } from '../types/genesis';
import { PrivValidator } from '../types/priv-validator';
import { Switch } from '../p2p/switch';
import { EventBus } from '../types/event-bus';
import { Store } from '../state/store';
import { BlockStore } from '../store/store';
import { Reactor } from '../p2p/base-reactor';
import { Mempool } from '../mempool/mempool';

const log = debug('cometbft:node');

// Node is the highest level interface to a full CometBFT node.
// It includes all configuration information and running services.
// TODO: Implement
export class Node extends service.BaseService {
  // config
  private config?: cfg.Config;
  private genesisDoc?: GenesisDoc; // initial validator set
  privValidator?: PrivValidator; // local node's validator key

  // network
  // TODO: Implement using libp2p
  // transport   *p2p.MultiplexTransport
  sw?: Switch; // p2p connections
  // addrBook    pex.AddrBook // known peers
  // nodeInfo    p2p.NodeInfo
  // nodeKey     *p2p.NodeKey // our node privkey
  // isListening bool

  // services
  eventBus?: EventBus; // pub/sub for services
  stateStore?: Store;
  blockStore?: BlockStore; // store the blockchain to disk
  bcReactor?: Reactor; // for block-syncing
  mempoolReactor?: Reactor; // for gossipping transactions
  mempool?: Mempool;
}

// DefaultNewNode returns a CometBFT node with default settings for the
// PrivValidator, ClientCreator, GenesisDoc, and DBProvider.
// It implements NodeProvider.
// TODO: Implement
// TODO: Can throw an error
export const defaultNewNode = (config: cfg.Config, logger: debug.Debugger): Node => {
  return {} as Node;
};
