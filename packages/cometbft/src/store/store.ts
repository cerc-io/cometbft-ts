import { Block, Commit } from '../types/block';
import { BlockMeta } from '../types/block-meta';
import { Part, PartSet } from '../types/part-set';

/*
BlockStore is a simple low level store for blocks.

There are three types of information stored:
  - BlockMeta:   Meta information about each block
  - Block part:  Parts of each block, aggregated w/ PartSet
  - Commit:      The commit part of each block, for gossiping precommit votes

Currently the precommit signatures are duplicated in the Block parts as
well as the Commit.  In the future this may change, perhaps by moving
the Commit data outside the Block. (TODO)

The store can be assumed to contain all contiguous blocks between base and height (inclusive).

// NOTE: BlockStore methods will panic if they encounter errors
// deserializing loaded data, indicating probable corruption on disk.
*/
// TODO: Implement
export class BlockStore {
  // TODO: Implement cometbft-db.DB
  db?: any;

  // mtx guards access to the struct fields listed below it. We rely on the database to enforce
  // fine-grained concurrency control for its data, and thus this mutex does not apply to
  // database contents. The only reason for keeping these fields in the struct is that the data
  // can't efficiently be queried from the database since the key encoding we use is not
  // lexicographically ordered (see https://github.com/tendermint/tendermint/issues/4567).
  // TODO: Mutex required?
  // mtx    cmtsync.RWMutex

  private _base?: bigint;
  private _height?: bigint;

  constructor (params: {
    db?: any,
    _base?: bigint,
    _height?: bigint
  }) {
    Object.assign(this, params);
  }

  // TODO: Implement
  static newBlockStore (db: any): BlockStore {
    return {} as BlockStore;
  }

  // Base returns the first known contiguous block height, or 0 for empty block stores.
  // TODO: Implement
  base (): bigint {
    return BigInt(0);
  }

  // Height returns the last known contiguous block height, or 0 for empty block stores.
  // TODO: Implement
  height (): bigint {
    return BigInt(0);
  }

  // Size returns the number of blocks in the block store.
  // TODO: Implement
  size (): bigint {
    return BigInt(0);
  }

  // LoadBase atomically loads the base block meta, or returns nil if no base is found.
  // TODO: Implement
  loadBaseMeta (): BlockMeta {
    return {};
  }

  // LoadBlock returns the block with the given height.
  // If no block is found for that height, it returns nil.
  // TODO: Implement
  loadBlock (height: bigint): Block {
    return {};
  }

  // LoadBlockByHash returns the block with the given hash.
  // If no block is found for that hash, it returns nil.
  // Panics if it fails to parse height associated with the given hash.
  // TODO: Implement
  loadBlockByHash (hash: Buffer): Block {
    return {};
  }

  // LoadBlockPart returns the Part at the given index
  // from the block at the given height.
  // If no part is found for the given height and index, it returns nil.
  // TODO: Implement
  loadBlockPart (height: bigint, index: number): Part {
    return {};
  }

  // LoadBlockMeta returns the BlockMeta for the given height.
  // If no block is found for the given height, it returns nil.
  // TODO: Implement
  loadBlockMeta (height: bigint): BlockMeta {
    return {};
  }

  // LoadBlockMetaByHash returns the blockmeta who's header corresponds to the given
  // hash. If none is found, returns nil.
  // TODO: Implement
  loadBlockMetaByHash (hash: Buffer): BlockMeta {
    return {};
  }

  // LoadBlockCommit returns the Commit for the given height.
  // This commit consists of the +2/3 and other Precommit-votes for block at `height`,
  // and it comes from the block.LastCommit for `height+1`.
  // If no commit is found for the given height, it returns nil.
  // TODO: Implement
  loadBlockCommit (height: bigint): Commit {
    return {};
  }

  // LoadSeenCommit returns the locally seen Commit for the given height.
  // This is useful when we've seen a commit, but there has not yet been
  // a new block at `height + 1` that includes this commit in its block.LastCommit.
  // TODO: Implement
  loadSeenCommit (height: bigint): Commit {
    return {};
  }

  // PruneBlocks removes block up to (but not including) a height. It returns number of blocks pruned.
  // TODO: Can throw an error
  // TODO: Implement
  pruneBlocks (height: bigint): bigint {
    return BigInt(0);
  }

  // SaveBlock persists the given block, blockParts, and seenCommit to the underlying db.
  // blockParts: Must be parts of the block
  // seenCommit: The +2/3 precommits that were seen which committed at height.
  //
  //  If all the nodes restart after committing a block,
  //  we need this to reload the precommits to catch-up nodes to the
  //  most recent height.  Otherwise they'd stall at H-1.
  // TODO: Implement
  saveBlock (block: Block, blockParts: PartSet, seenCommit: Commit): void {}

  // TODO: Implement
  private saveBlockPart (height: bigint, index: number, part: Part): void {}

  // TODO: Implement
  private saveState (): void {}

  // SaveSeenCommit saves a seen commit, used by e.g. the state sync reactor when bootstrapping node.
  // TODO: Implement
  // TODO: Can throw an error
  saveSeenCommit (height: bigint, seenCommit: Commit): void {}

  // TODO: Implement
  // TODO: Can throw an error
  close (): void {}
}
