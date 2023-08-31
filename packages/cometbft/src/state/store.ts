import { ABCIResponses } from '../proto/tendermint/state/types.pb';
import { GenesisDoc } from '../types/genesis';
import { ConsensusParams } from '../types/params';
import { ValidatorSet } from '../types/validator-set';
import { State } from './state';

// Store defines the state store interface
//
// It is used to retrieve current state and save and load ABCI responses,
// validators and consensus parameters
// TODO: Implement
export interface Store {
  // LoadFromDBOrGenesisFile loads the most recent state.
  // If the chain is new it will use the genesis file from the provided genesis file path as the current state.
  // TODO: Can throw an error
  loadFromDBOrGenesisFile(f: string): State
  // LoadFromDBOrGenesisDoc loads the most recent state.
  // If the chain is new it will use the genesis doc as the current state.
  // TODO: Can throw an error
  loadFromDBOrGenesisDoc(g: GenesisDoc): State
  // Load loads the current state of the blockchain
  // TODO: Can throw an error
  load(): State
  // LoadValidators loads the validator set at a given height
  // TODO: Can throw an error
  loadValidators(h: bigint): ValidatorSet
  // LoadABCIResponses loads the abciResponse for a given height
  // TODO: Can throw an error
  loadABCIResponses(h: bigint): ABCIResponses
  // LoadLastABCIResponse loads the last abciResponse for a given height
  // TODO: Can throw an error
  loadLastABCIResponse(h: bigint): ABCIResponses
  // LoadConsensusParams loads the consensus params for a given height
  // TODO: Can throw an error
  loadConsensusParams(h: bigint): ConsensusParams
  // Save overwrites the previous state with the updated one
  // TODO: Can throw an error
  save(s: State): void
  // SaveABCIResponses saves ABCIResponses for a given height
  // TODO: Can throw an error
  saveABCIResponses(h: bigint, r: ABCIResponses): void
  // Bootstrap is used for bootstrapping state when not starting from a initial height.
  // TODO: Can throw an error
  bootstrap(s: State): void
  // PruneStates takes the height from which to start prning and which height stop at
  // TODO: Can throw an error
  pruneStates(start: bigint, stop: bigint): void
  // Close closes the connection with the database
  // TODO: Can throw an error
  close(): void
}
