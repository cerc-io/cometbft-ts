// Proof represents a Merkle proof.
// NOTE: The convention for proofs is to include leaf hashes but to
// exclude the root hash.
// This convention is implemented across IAVL range proofs as well.
// Keep this consistent unless there's a very good reason to change
// everything.  This also affects the generalized proof system as
// well.
// TODO: Implement
export class Proof {
  total?: bigint; // `json:"total"`     // Total number of items.
  index?: bigint; // `json:"index"`     // Index of item to prove.
  leafHash?: Buffer; // `json:"leaf_hash"` // Hash of item value.
  aunts?: Buffer[]; // `json:"aunts"`     // Hashes from leaf's sibling to a root's child.
}
