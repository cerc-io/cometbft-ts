import { ReadChannel } from '@cerc-io/ts-channel';

import * as abcitypes from '../abci/types/types.pb';
import { Tx, TxKey, Txs } from '../types/tx';
import { TxInfo } from './tx';

// PreCheckFunc is an optional filter executed before CheckTx and rejects
// transaction if false is returned. An example would be to ensure that a
// transaction doesn't exceeded the block size.
// TODO: Can throw an error
export type PreCheckFunc = (t: Tx) => void

// PostCheckFunc is an optional filter executed after CheckTx and rejects
// transaction if false is returned. An example would be to ensure a
// transaction doesn't require more gas than available for the block.
// TODO: Can throw an error
export type PostCheckFunc = (t: Tx, r: abcitypes.ResponseCheckTx) => void

// Mempool defines the mempool interface.
//
// Updates to the mempool need to be synchronized with committing a block so
// applications can reset their transient state on Commit.
// TODO: Implement
export interface Mempool {
  // CheckTx executes a new transaction against the application to determine
  // its validity and whether it should be added to the mempool.
  // TODO: Can throw an error
  checkTx(tx: Tx, callback: (r: abcitypes.Response) => void, txInfo: TxInfo): void

  // RemoveTxByKey removes a transaction, identified by its key,
  // from the mempool.
  // TODO: Can throw an error
  removeTxByKey(txKey: TxKey): void

  // ReapMaxBytesMaxGas reaps transactions from the mempool up to maxBytes
  // bytes total with the condition that the total gasWanted must be less than
  // maxGas.
  //
  // If both maxes are negative, there is no cap on the size of all returned
  // transactions (~ all available transactions).
  reapMaxBytesMaxGas(maxBytes: bigint, maxGas: bigint): Txs

  // ReapMaxTxs reaps up to max transactions from the mempool. If max is
  // negative, there is no cap on the size of all returned transactions
  // (~ all available transactions).
  reapMaxTxs(max: number): Txs

  // Lock locks the mempool. The consensus must be able to hold lock to safely
  // update.
  lock(): void

  // Unlock unlocks the mempool.
  unlock(): void

  // Update informs the mempool that the given txs were committed and can be
  // discarded.
  //
  // NOTE:
  // 1. This should be called *after* block is committed by consensus.
  // 2. Lock/Unlock must be managed by the caller.
  // TODO: Can throw an error
  update(
    blockHeight: bigint,
    blockTxs: Txs,
    deliverTxResponses: abcitypes.ResponseDeliverTx[],
    newPreFn: PreCheckFunc,
    newPostFn: PostCheckFunc
  ): void

  // FlushAppConn flushes the mempool connection to ensure async callback calls
  // are done, e.g. from CheckTx.
  //
  // NOTE:
  // 1. Lock/Unlock must be managed by caller.
  // TODO: Can throw an error
  flushAppConn(): void

  // Flush removes all transactions from the mempool and caches.
  flush(): void

  // TxsAvailable returns a channel which fires once for every height, and only
  // when transactions are available in the mempool.
  //
  // NOTE:
  // 1. The returned channel may be nil if EnableTxsAvailable was not called.
  txsAvailable(): ReadChannel<void>;

  // EnableTxsAvailable initializes the TxsAvailable channel, ensuring it will
  // trigger once every height when transactions are available.
  enableTxsAvailable(): void

  // Size returns the number of transactions in the mempool.
  size(): number

  // SizeBytes returns the total size of all txs in the mempool.
  sizeBytes(): bigint
}
