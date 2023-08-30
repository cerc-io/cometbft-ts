// PrivValidator defines the functionality of a local CometBFT validator
// that signs votes and proposals, and never double signs.
// TODO: Implement
export interface PrivValidator {}

// TODO: Implement
export class PrivValidatorsByAddress {
  value: PrivValidator[] = [];
}
