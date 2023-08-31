// BlockParams define limits on the block size and gas plus minimum time
// between blocks.
export interface BlockParams {
  maxBytes: bigint // `json:"max_bytes"`
  maxGas: bigint // `json:"max_gas"`
}

// EvidenceParams determine how we handle evidence of malfeasance.
export interface EvidenceParams {
  maxAgeNumBlocks: bigint // `json:"max_age_num_blocks"` // only accept new evidence more recent than this
  maxAgeDuration: number // `json:"max_age_duration"`
  maxBytes: bigint // `json:"max_bytes"`
}

// ValidatorParams restrict the public key types validators can use.
// NOTE: uses ABCI pubkey naming, not Amino names.
export interface ValidatorParams {
  pubKeyTypes: string[] // `json:"pub_key_types"`
}

export interface VersionParams {
  // TODO: Create an Uint64 alias in cometbft-util
  app: bigint // `json:"app"`
}

// ConsensusParams contains consensus critical parameters that determine the
// validity of blocks.
// TODO: Implement
export class ConsensusParams {
  Block?: BlockParams; // `json:"block"`
  Evidence?: EvidenceParams; // `json:"evidence"`
  Validator?: ValidatorParams; // `json:"validator"`
  Version?: VersionParams; // `json:"version"`
}
