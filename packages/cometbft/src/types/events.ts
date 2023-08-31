// TMEventData implements events.EventData.
export interface TMEventData {
  // empty interface
}

// Most event messages are basic types (a block, a transaction)
// but some (an input to a call tx or a receive) are more exotic

// TODO: Implement
export interface EventDataNewBlock {}

// TODO: Implement
export interface EventDataNewBlockHeader {}

// TODO: Implement
export interface EventDataNewEvidence {}

// All txs fire EventDataTx
// TODO: Implement
export interface EventDataTx {}

// NOTE: This goes into the replay WAL
// TODO: Implement
export interface EventDataRoundState {}

// TODO: Implement
export interface ValidatorInfo {}

// TODO: Implement
export interface EventDataNewRound {}

// TODO: Implement
export interface EventDataCompleteProposal {}

// TODO: Implement
export interface EventDataVote {}

// TODO: Implement
export type EventDataString = string

// TODO: Implement
export interface EventDataValidatorSetUpdates {}
