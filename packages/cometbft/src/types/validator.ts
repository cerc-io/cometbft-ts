import { Address } from './vote';
import * as crypto from '../crypto/crypto';

// Volatile state for each Validator
// NOTE: The ProposerPriority is not included in Validator.Hash();
// make sure to update that method if changes are made here
// TODO: Implement
export class Validator {
  address?: Address; // `json:"address"`
  pubKey?: crypto.PubKey; // `json:"pub_key"`
  votingPower?: bigint; // `json:"voting_power"`

  proposerPriority?: bigint; // `json:"proposer_priority"`
}
