import { Address } from './vote';
import * as crypto from '../crypto/crypto';
import { ConsensusParams } from './params';
import * as cmtbytes from '../libs/bytes/bytes';

// ------------------------------------------------------------
// core types for a genesis definition
// NOTE: any changes to the genesis definition should
// be reflected in the documentation:
// docs/core/using-cometbft.md

// GenesisValidator is an initial validator.
// TODO: Implement
export interface GenesisValidator {
  address: Address; // `json:"address"`
  pubKey: crypto.PubKey; // `json:"pub_key"`
  power: bigint; // `json:"power"`
  name: string; // `json:"name"`
}

// GenesisDoc defines the initial conditions for a CometBFT blockchain, in particular its validator set.
// TODO: Implement
export class GenesisDoc {
  genesisTime?: Date; // `json:"genesis_time"`
  chainID?: string; // `json:"chain_id"`
  initialHeight?: bigint; // `json:"initial_height"`
  consensusParams?: ConsensusParams; // `json:"consensus_params,omitempty"`
  validators?: GenesisValidator[]; // `json:"validators,omitempty"`
  appHash?: cmtbytes.HexBytes; // `json:"app_hash"`
  appState?: Buffer; // `json:"app_state,omitempty"`
}
