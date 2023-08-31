export const DefaultTendermintDir = '.cometbft';

// -----------------------------------------------------------------------------
// BaseConfig

// BaseConfig defines the base configuration for a CometBFT node
// TODO: Implement
export class BaseConfig {
  // chainID is unexposed and immutable but here for convenience
  private chainID?: string;

  // The root directory for all data.
  // This should be set in viper so it can unmarshal into this struct
  rootDir?: string; // `mapstructure:"home"`

  // TCP or UNIX socket address of the ABCI application,
  // or the name of an ABCI application compiled in with the CometBFT binary
  proxyApp?: string; // `mapstructure:"proxy_app"`

  // A custom human readable name for this node
  moniker?: string; // `mapstructure:"moniker"`

  // If this node is many blocks behind the tip of the chain, Blocksync
  // allows them to catchup quickly by downloading blocks in parallel
  // and verifying their commits
  // Deprecated: BlockSync will be enabled unconditionally in the next major release.
  BlockSyncMode?: boolean; // `mapstructure:"block_sync"`

  // TODO(williambanfield): remove this field once v0.37 is released.
  // https://github.com/tendermint/tendermint/issues/9279
  deprecatedFastSyncMode?: any; // `mapstructure:"fast_sync"`

  // Database backend: goleveldb | cleveldb | boltdb | rocksdb
  // * goleveldb (github.com/syndtr/goleveldb - most popular implementation)
  //   - pure go
  //   - stable
  // * cleveldb (uses levigo wrapper)
  //   - fast
  //   - requires gcc
  //   - use cleveldb build tag (go build -tags cleveldb)
  // * boltdb (uses etcd's fork of bolt - github.com/etcd-io/bbolt)
  //   - EXPERIMENTAL
  //   - may be faster is some use-cases (random reads - indexer)
  //   - use boltdb build tag (go build -tags boltdb)
  // * rocksdb (uses github.com/tecbot/gorocksdb)
  //   - EXPERIMENTAL
  //   - requires gcc
  //   - use rocksdb build tag (go build -tags rocksdb)
  // * badgerdb (uses github.com/dgraph-io/badger)
  //   - EXPERIMENTAL
  //   - use badgerdb build tag (go build -tags badgerdb)
  dBBackend?: string; // `mapstructure:"db_backend"`

  // Database directory
  dBPath?: string; // `mapstructure:"db_dir"`

  // Output level for logging
  logLevel?: string; // `mapstructure:"log_level"`

  // Output format: 'plain' (colored text) or 'json'
  logFormat?: string; // `mapstructure:"log_format"`

  // Path to the JSON file containing the initial validator set and other meta data
  genesis?: string; // `mapstructure:"genesis_file"`

  // Path to the JSON file containing the private key to use as a validator in the consensus protocol
  privValidatorKey?: string; // `mapstructure:"priv_validator_key_file"`

  // Path to the JSON file containing the last sign state of a validator
  privValidatorState?: string; // `mapstructure:"priv_validator_state_file"`

  // TCP or UNIX socket address for CometBFT to listen on for
  // connections from an external PrivValidator process
  privValidatorListenAddr?: string; // `mapstructure:"priv_validator_laddr"`

  // A JSON file containing the private key to use for p2p authenticated encryption
  nodeKey?: string; // `mapstructure:"node_key_file"`

  // Mechanism to connect to the ABCI application: socket | grpc
  aBCI?: string; // `mapstructure:"abci"`

  // If true, query the ABCI app on connecting to a new peer
  // so the app can decide if we should keep the connection or not
  filterPeers?: boolean; // `mapstructure:"filter_peers"` // false
}

// -----------------------------------------------------------------------------
// P2PConfig

// P2PConfig defines the configuration options for the CometBFT peer-to-peer networking layer
// TODO: Implement
// TODO: Use @cerc-io/peer
export class P2PConfig {}

// -----------------------------------------------------------------------------
// MempoolConfig

// MempoolConfig defines the configuration options for the CometBFT mempool
// TODO: Implement
export class MempoolConfig {
  // Mempool version to use:
  //  1) "v0" - (default) FIFO mempool.
  //  2) "v1" - prioritized mempool (deprecated; will be removed in the next release).
  version?: string; // `mapstructure:"version"`
  // RootDir is the root directory for all data. This should be configured via
  // the $CMTHOME env variable or --home cmd flag rather than overriding this
  // struct field.
  rootDir?: string; // `mapstructure:"home"`
  // Recheck (default: true) defines whether CometBFT should recheck the
  // validity for all remaining transaction in the mempool after a block.
  // Since a block affects the application state, some transactions in the
  // mempool may become invalid. If this does not apply to your application,
  // you can disable rechecking.
  recheck?: boolean; // `mapstructure:"recheck"`
  // Broadcast (default: true) defines whether the mempool should relay
  // transactions to other peers. Setting this to false will stop the mempool
  // from relaying transactions to other peers until they are included in a
  // block. In other words, if Broadcast is disabled, only the peer you send
  // the tx to will see it until it is included in a block.
  broadcast?: boolean; // `mapstructure:"broadcast"`
  // WalPath (default: "") configures the location of the Write Ahead Log
  // (WAL) for the mempool. The WAL is disabled by default. To enable, set
  // WalPath to where you want the WAL to be written (e.g.
  // "data/mempool.wal").
  walPath?: string; // `mapstructure:"wal_dir"`
  // Maximum number of transactions in the mempool
  size?: number; // `mapstructure:"size"`
  // Limit the total size of all txs in the mempool.
  // This only accounts for raw transactions (e.g. given 1MB transactions and
  // max_txs_bytes=5MB, mempool will only accept 5 transactions).
  maxTxsBytes?: bigint; // `mapstructure:"max_txs_bytes"`
  // Size of the cache (used to filter transactions we saw earlier) in transactions
  cacheSize?: number; // `mapstructure:"cache_size"`
  // Do not remove invalid transactions from the cache (default: false)
  // Set to true if it's not possible for any invalid transaction to become
  // valid again in the future.
  keepInvalidTxsInCache?: boolean; // `mapstructure:"keep-invalid-txs-in-cache"`
  // Maximum size of a single transaction
  // NOTE: the max size of a tx transmitted over the network is {max_tx_bytes}.
  maxTxBytes?: number; // `mapstructure:"max_tx_bytes"`
  // Maximum size of a batch of transactions to send to a peer
  // Including space needed by encoding (one varint per transaction).
  // XXX: Unused due to https://github.com/tendermint/tendermint/issues/5796
  maxBatchBytes?: number; // `mapstructure:"max_batch_bytes"`

  // TTLDuration, if non-zero, defines the maximum amount of time a transaction
  // can exist for in the mempool.
  //
  // Note, if TTLNumBlocks is also defined, a transaction will be removed if it
  // has existed in the mempool at least TTLNumBlocks number of blocks or if it's
  // insertion time into the mempool is beyond TTLDuration.
  //
  // Deprecated: Only used by priority mempool, which will be removed in the
  // next major release.
  // TODO: time.Duration
  tTLDuration?: number; // `mapstructure:"ttl-duration"`

  // TTLNumBlocks, if non-zero, defines the maximum number of blocks a transaction
  // can exist for in the mempool.
  //
  // Note, if TTLDuration is also defined, a transaction will be removed if it
  // has existed in the mempool at least TTLNumBlocks number of blocks or if
  // it's insertion time into the mempool is beyond TTLDuration.
  //
  // Deprecated: Only used by priority mempool, which will be removed in the
  // next major release.
  tTLNumBlocks?: bigint; // `mapstructure:"ttl-num-blocks"`
}

// -----------------------------------------------------------------------------
// BlockSyncConfig

// BlockSyncConfig (formerly known as FastSync) defines the configuration for the CometBFT block sync service
// TODO: Implement
export class BlockSyncConfig {
  version?: string; // `mapstructure:"version"`
}

// -----------------------------------------------------------------------------
// ConsensusConfig

// ConsensusConfig defines the configuration for the Tendermint consensus algorithm, adopted by CometBFT,
// including timeouts and details about the WAL and the block structure.
// TODO: Implement
export class ConsensusConfig {
  // TODO: time.Duration

  rootDir?: string; // `mapstructure:"home"`
  walPath?: string; // `mapstructure:"wal_file"`
  private walFile?: string; // overrides WalPath if set

  // How long we wait for a proposal block before prevoting nil
  timeoutPropose?: number; // `mapstructure:"timeout_propose"`
  // How much timeout_propose increases with each round
  timeoutProposeDelta?: number; // `mapstructure:"timeout_propose_delta"`
  // How long we wait after receiving +2/3 prevotes for “anything” (ie. not a single block or nil)
  timeoutPrevote?: number; // `mapstructure:"timeout_prevote"`
  // How much the timeout_prevote increases with each round
  timeoutPrevoteDelta?: number; // `mapstructure:"timeout_prevote_delta"`
  // How long we wait after receiving +2/3 precommits for “anything” (ie. not a single block or nil)
  timeoutPrecommit?: number; // `mapstructure:"timeout_precommit"`
  // How much the timeout_precommit increases with each round
  timeoutPrecommitDelta?: number; // `mapstructure:"timeout_precommit_delta"`
  // How long we wait after committing a block, before starting on the new
  // height (this gives us a chance to receive some more precommits, even
  // though we already have +2/3).
  // NOTE: when modifying, make sure to update time_iota_ms genesis parameter
  timeoutCommit?: number; // `mapstructure:"timeout_commit"`

  // Make progress as soon as we have all the precommits (as if TimeoutCommit = 0)
  skipTimeoutCommit?: boolean; // `mapstructure:"skip_timeout_commit"`

  // EmptyBlocks mode and possible interval between empty blocks
  createEmptyBlocks?: boolean; // `mapstructure:"create_empty_blocks"`
  createEmptyBlocksInterval?: number; // `mapstructure:"create_empty_blocks_interval"`

  // Reactor sleep duration parameters
  peerGossipSleepDuration?: number; // `mapstructure:"peer_gossip_sleep_duration"`
  peerQueryMaj23SleepDuration?: number; // `mapstructure:"peer_query_maj23_sleep_duration"`

  doubleSignCheckHeight?: bigint; // `mapstructure:"double_sign_check_height"`
}

// -----------------------------------------------------------------------------
// StorageConfig

// StorageConfig allows more fine-grained control over certain storage-related
// behavior.
export interface StorageConfig {
  // Set to false to ensure ABCI responses are persisted. ABCI responses are
  // required for `/block_results` RPC queries, and to reindex events in the
  // command-line tool.
  discardABCIResponses: boolean // `mapstructure:"discard_abci_responses"`
}

// -----------------------------------------------------------------------------
// TxIndexConfig
// Remember that Event has the following structure:
// type: [
//
//  key: value,
//  ...
//
// ]
//
// CompositeKeys are constructed by `type.key`
// TxIndexConfig defines the configuration for the transaction indexer,
// including composite keys to index.
export interface TxIndexConfig {
  // What indexer to use for transactions
  //
  // Options:
  //   1) "null"
  //   2) "kv" (default) - the simplest possible indexer,
  //      backed by key-value storage (defaults to levelDB; see DBBackend).
  //   3) "psql" - the indexer services backed by PostgreSQL.
  indexer: string // `mapstructure:"indexer"`

  // The PostgreSQL connection configuration, the connection format:
  // postgresql://<user>:<password>@<host>:<port>/<db>?<opts>
  psqlConn: string // `mapstructure:"psql-conn"`
}

// -----------------------------------------------------------------------------
// InstrumentationConfig

// InstrumentationConfig defines the configuration for metrics reporting.
// TODO: Implement
export class InstrumentationConfig {
  // When true, Prometheus metrics are served under /metrics on
  // PrometheusListenAddr.
  // Check out the documentation for the list of available metrics.
  prometheus?: boolean; // `mapstructure:"prometheus"`

  // Address to listen for Prometheus collector(s) connections.
  prometheusListenAddr?: string; // `mapstructure:"prometheus_listen_addr"`

  // Maximum number of simultaneous connections.
  // If you want to accept a larger number than the default, make sure
  // you increase your OS limits.
  // 0 - unlimited.
  maxOpenConnections?: number; // `mapstructure:"max_open_connections"`

  // Instrumentation namespace.
  namespace?: string; // `mapstructure:"namespace"`
}

// Config defines the top level configuration for a CometBFT node
// TODO: Implement
export class Config extends BaseConfig {
  // Top level options use an anonymous struct
  // BaseConfig `mapstructure:",squash"`

  // Options for services

  // TODO: Skip RPC?
  // RPC       *RPCConfig       `mapstructure:"rpc"`

  p2P?: P2PConfig; // `mapstructure:"p2p"`
  mempool?: MempoolConfig; // `mapstructure:"mempool"`

  // TODO: Skip statesync?
  // StateSync?: *StateSyncConfig `mapstructure:"statesync"`

  blockSync?: BlockSyncConfig; // `mapstructure:"blocksync"`
  // TODO(williambanfield): remove this field once v0.37 is released.
  // https://github.com/tendermint/tendermint/issues/9279
  deprecatedFastSyncConfig?: Map<any, any>; // `mapstructure:"fastsync"`
  Consensus?: ConsensusConfig; // `mapstructure:"consensus"`
  Storage?: StorageConfig; // `mapstructure:"storage"`
  TxIndex?: TxIndexConfig; // `mapstructure:"tx_index"`
  Instrumentation?: InstrumentationConfig; // `mapstructure:"instrumentation"`
}

// DefaultConfig returns a default configuration for a CometBFT node
// TODO: Implement
export const defaultConfig = (): Config => {
  return {};
};
