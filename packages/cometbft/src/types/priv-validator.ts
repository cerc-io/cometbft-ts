import * as crypto from '../crypto/crypto';
import * as cmtprototypes from '../proto/tendermint/types/types.pb';

// PrivValidator defines the functionality of a local CometBFT validator
// that signs votes and proposals, and never double signs.
// TODO: Implement
export interface PrivValidator {
  // TODO: Can throw an error
  getPubKey (): crypto.PubKey;

  // TODO: Can throw an error
  signVote (chainID: string, vote: cmtprototypes.Vote): void
  // TODO: Can throw an error
  signProposal (chainID: string, proposal: cmtprototypes.Proposal): void
}

// TODO: Implement
export class PrivValidatorsByAddress {
  value: PrivValidator[] = [];
}
