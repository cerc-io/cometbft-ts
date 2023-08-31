// -----------------------------------------------------------------------------

// State is a short description of the latest committed block of the consensus protocol.
// It keeps all information necessary to validate new blocks,
// including the last validator set and the consensus params.
// All fields are exposed so the struct can be easily serialized,
// but none of them should be mutated directly.
// Instead, use state.Copy() or state.NextState(...).
// NOTE: not goroutine-safe.
// TODO: Implement
export class State {}
