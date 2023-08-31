import { Proof } from '../crypto/merkle/proof';
import { BitArray } from '../libs/bits/bit-array';
import { HexBytes } from '../libs/bytes/bytes';

// TODO: Implement
export class Part {
  index?: bigint; // `json:"index"`
  bytes?: HexBytes; // `json:"bytes"`
  proof?: Proof; // `json:"proof"`
}

// -------------------------------------

// TODO: Implement
export class PartSet {
  private total?: number;
  private hash?: Buffer;

  // TODO: Mutex required?
  // mtx           cmtsync.Mutex
  private parts?: Part[];
  private partsBitArray?: BitArray;
  private count?: number;
  // a count of the total size (in bytes). Used to ensure that the
  // part set doesn't exceed the maximum block bytes
  private byteSize?:bigint;
}

// -------------------------------------

// TODO: Implement
export class PartSetHeader {
  total?: number; // `json:"total"`
  hash?: HexBytes; // `json:"hash"`
}
