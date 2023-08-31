import * as cmtbytes from '../libs/bytes/bytes';
import * as bits from '../libs/bits/bit-array';

// Block defines the atomic unit of a CometBFT blockchain.
// TODO: Implement
export class Block {}

// CommitSig is a part of the Vote included in a Commit.
// TODO: Implement
export class CommitSig {}

// --------------------------------------------------------------------------------

// BlockID
// TODO: Implement
export class BlockID {}

// -------------------------------------

// Commit contains the evidence that a block was committed by a set of validators.
// NOTE: Commit is empty for height 1, but never nil.
// TODO: Implement
export class Commit {
  // NOTE: The signatures are in order of address to preserve the bonded
  // ValidatorSet order.
  // Any peer with a block can gossip signatures by index with a peer without
  // recalculating the active ValidatorSet.
  height?: bigint; // `json:"height"`
  round?: number; // `json:"round"`
  blockID?: BlockID; // `json:"block_id"`
  signatures?: CommitSig[]; // `json:"signatures"`

  // Memoized in first call to corresponding method.
  // NOTE: can't memoize in constructor because constructor isn't used for
  // unmarshaling.
  private hash?: cmtbytes.HexBytes;
  private bitArray?: bits.BitArray;
}
