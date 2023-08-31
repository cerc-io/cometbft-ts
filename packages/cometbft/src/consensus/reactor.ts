import { BaseReactor } from '../p2p/base-reactor';

// -----------------------------------------------------------------------------

// Reactor defines a reactor for the consensus service.
// TODO: Implement
export class Reactor extends BaseReactor {}

// -----------------------------------------------------------------------------
// Messages

// Message is a message that can be sent and received on the Reactor
export interface Message {
// TODO: Can throw an error
  validateBasic (): void
}
