// -----------------------------------------------------------------------------
// RoundStepType enum type

// RoundStepType enumerates the state of the consensus state machine
// TODO: Implement
export class RoundStepType {
  // These must be numeric, ordered.
  value?: number;
}

// -----------------------------------------------------------------------------

// RoundState defines the internal consensus state.
// NOTE: Not thread safe. Should only be manipulated by functions downstream
// of the cs.receiveRoutine
// TODO: Implement
export class RoundState {}
