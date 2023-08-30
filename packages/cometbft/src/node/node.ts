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
import { State } from '../consensus/state';
import { Reactor as csReactor } from '../consensus/reactor';
import { Pool } from '../evidence/pool';
import { AppConns } from '../proxy/multi-app-conn';
import { TxIndexer } from '../state/txindex/indexer';
import { BlockIndexer } from '../state/indexer/block';
import { IndexerService } from '../state/txindex/indexer-service';

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

  // TODO: Skip stateSync?
  // stateSync         bool                    // whether the node should state sync on startup
  // stateSyncReactor  *statesync.Reactor      // for hosting and restoring state sync snapshots
  // stateSyncProvider statesync.StateProvider // provides state data for bootstrapping a node
  // stateSyncGenesis  sm.State                // provides the genesis state for state sync

  consensusState?: State; // latest consensus state
  consensusReactor?: csReactor; // for participating in the consensus

  // TODO: Implement using libp2p
  // pexReactor        *pex.Reactor            // for exchanging peer addresses

  evidencePool?: Pool; // tracking evidence
  proxyApp?: AppConns; // connection to the application

  // rpcListeners      []net.Listener          // rpc servers

  txIndexer?: TxIndexer;
  blockIndexer?: BlockIndexer;
  indexerService?: IndexerService;

  // TODO: Implement metrics
  // prometheusSrv     *http.Server
}

// DefaultNewNode returns a CometBFT node with default settings for the
// PrivValidator, ClientCreator, GenesisDoc, and DBProvider.
// It implements NodeProvider.
// TODO: Implement
// TODO: Can throw an error
export const defaultNewNode = (config: cfg.Config, logger: debug.Debugger): Node => {
  return {} as Node;
};
